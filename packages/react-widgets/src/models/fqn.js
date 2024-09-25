import { Provider } from '@carto/react-core';

export const ParsingMode = Object.freeze({
  LeftToRight: 'leftToRight',
  RightToLeft: 'rightToLeft'
});

const bqProjectId = /^[a-z][a-z0-9-]{4,28}[a-z0-9]$/;
const bqIdentifierRegex = '((?:[^`.]*?)|`(?:(?:[^`.])*?)`)';
const identifierRegex = '((?:[^".]*?)|"(?:(?:[^"]|"")*?)")';
const databricksIdentifierRegex = '((?:[^`.]*?)|`(?:(?:[^`]|``)*?)`)';
const databricksFqnParseRegex = new RegExp(
  `^${databricksIdentifierRegex}(?:\\.${databricksIdentifierRegex})?(?:\\.${databricksIdentifierRegex})?$`
);
const fqnParseRegex = {
  [Provider.BigQuery]: new RegExp(
    `^\`?${bqIdentifierRegex}(?:\\.${bqIdentifierRegex})?(?:\\.${bqIdentifierRegex})?\`?$`
  ),
  [Provider.Postgres]: new RegExp(
    `^${identifierRegex}(?:\\.${identifierRegex})?(?:\\.${identifierRegex})?$`
  ),
  [Provider.Snowflake]: new RegExp(
    `^${identifierRegex}(?:\\.${identifierRegex})?(?:\\.${identifierRegex})?$`
  ),
  [Provider.Redshift]: new RegExp(
    `^${identifierRegex}(?:\\.${identifierRegex})?(?:\\.${identifierRegex})?$`
  ),
  [Provider.Databricks]: databricksFqnParseRegex,
  [Provider.DatabricksRest]: databricksFqnParseRegex
};

const escapeCharacter = {
  [Provider.BigQuery]: '`',
  [Provider.Postgres]: '"',
  [Provider.Snowflake]: '"',
  [Provider.Redshift]: '"',
  [Provider.Databricks]: '`',
  [Provider.DatabricksRest]: '`'
};

const nameNeedsQuotesChecker = {
  [Provider.BigQuery]: /^[^a-z_]|[^a-z_\d]/i,
  [Provider.Postgres]: /^[^a-z_]|[^a-z_\d$]/i,
  [Provider.Snowflake]: /^[^a-z_]|[^a-z_\d$]/i,
  [Provider.Redshift]: /^[^a-z_]|[^a-z_\d$]/i,
  [Provider.Databricks]: /[^a-z_\d]/i,
  [Provider.DatabricksRest]: /[^a-z_\d]/i
};
const caseSensitivenessChecker = {
  [Provider.BigQuery]: null,
  [Provider.Postgres]: /[A-Z]/,
  [Provider.Snowflake]: /[a-z]/,
  [Provider.Redshift]: null,
  [Provider.Databricks]: null,
  [Provider.DatabricksRest]: null
};

export class FullyQualifiedName {
  databaseFragment = null;
  schemaFragment = null;
  objectFragment = null;

  provider;
  originalFQN;
  parsingMode;

  static empty(provider, mode = ParsingMode.RightToLeft) {
    return new FullyQualifiedName('', provider, mode);
  }

  constructor(fqn, provider, mode = ParsingMode.RightToLeft) {
    this.originalFQN = fqn;
    this.provider = provider;
    this.parsingMode = mode;

    const fqnFragments = this.parseFQN(this.originalFQN).filter(
      (fragment) => fragment !== null
    );

    if (mode === ParsingMode.LeftToRight) {
      this.databaseFragment = fqnFragments[0];
      this.schemaFragment = fqnFragments[1];
      this.objectFragment = fqnFragments[2];
    }

    if (mode === ParsingMode.RightToLeft) {
      if (fqnFragments[2]) {
        this.databaseFragment = fqnFragments[0];
        this.schemaFragment = fqnFragments[1];
        this.objectFragment = fqnFragments[2];
      } else if (fqnFragments[1]) {
        this.schemaFragment = fqnFragments[0];
        this.objectFragment = fqnFragments[1];
      } else {
        this.objectFragment = fqnFragments[0];
      }
    }

    // @ts-ignore
    if (
      this.provider === Provider.BigQuery &&
      this.databaseFragment &&
      /[A-Z]/.test(this.databaseFragment.name)
    ) {
      throw new Error('BigQuery does not support project ids with uppercase letters');
    }
  }

  toString() {
    let fullFQN = null;
    if (this.parsingMode === ParsingMode.LeftToRight) {
      if (this.objectFragment) {
        if (!this.schemaFragment || !this.databaseFragment) {
          throw new Error(this.originalFQN);
        }
        fullFQN = `${this.getFragmentName(this.databaseFragment)}.${this.getFragmentName(
          this.schemaFragment
        )}.${this.getFragmentName(this.objectFragment)}`;
      } else if (this.schemaFragment) {
        if (!this.databaseFragment) {
          throw new Error(this.originalFQN);
        }
        fullFQN = `${this.getFragmentName(this.databaseFragment)}.${this.getFragmentName(
          this.schemaFragment
        )}`;
      } else if (this.databaseFragment) {
        fullFQN = this.getFragmentName(this.databaseFragment);
      }
    } else {
      if (this.databaseFragment) {
        if (!this.schemaFragment || !this.objectFragment) {
          throw new Error(this.originalFQN);
        }
        fullFQN = `${this.getFragmentName(this.databaseFragment)}.${this.getFragmentName(
          this.schemaFragment
        )}.${this.getFragmentName(this.objectFragment)}`;
      } else if (this.schemaFragment) {
        if (!this.objectFragment) {
          throw new Error(this.originalFQN);
        }
        fullFQN = `${this.getFragmentName(this.schemaFragment)}.${this.getFragmentName(
          this.objectFragment
        )}`;
      } else if (this.objectFragment) {
        fullFQN = this.getFragmentName(this.objectFragment);
      }
    }

    if (!fullFQN) {
      throw new Error(this.originalFQN);
    }

    if (this.provider === Provider.BigQuery) {
      return `\`${fullFQN}\``;
    }
    return fullFQN;
  }

  getDatabaseName(options) {
    if (!this.databaseFragment) {
      if (options?.safe) {
        return null;
      }
      throw new Error('Database name is not defined');
    }
    return options?.quoted
      ? this.quoteFragmentName(this.databaseFragment)
      : this.unquoteFragmentName(this.databaseFragment);
  }

  getSchemaName(options) {
    if (!this.schemaFragment) {
      if (options?.safe) {
        return null;
      }
      throw new Error('Schema name is not defined');
    }
    return options?.quoted
      ? this.quoteFragmentName(this.schemaFragment)
      : this.unquoteFragmentName(this.schemaFragment);
  }

  getObjectName(options) {
    if (!this.objectFragment) {
      if (options?.safe) {
        return null;
      }
      throw new Error('Object name is not defined');
    }

    return options?.quoted
      ? this.quoteFragmentName(this.objectFragment, options?.suffix)
      : this.unquoteFragmentName(this.objectFragment, options?.suffix);
  }

  setDatabaseName(databaseName) {
    if (this.provider === Provider.BigQuery && /[A-Z]/.test(databaseName)) {
      throw new Error('BigQuery does not support project ids with uppercase letters');
    }
    const databaseFqnFragment = this.parseFQN(this.quoteExternalIdentifier(databaseName));
    this.databaseFragment = databaseFqnFragment[0];
  }

  setSchemaName(schemaName) {
    const schemaFqnFragment = this.parseFQN(this.quoteExternalIdentifier(schemaName));
    this.schemaFragment = schemaFqnFragment[0];
  }

  setObjectName(objectName) {
    const objectFqnFragment = this.parseFQN(this.quoteExternalIdentifier(objectName));
    this.objectFragment = objectFqnFragment[0];
  }

  static isValid(fqn, provider, options) {
    try {
      const parsingMode = options?.parsingMode || ParsingMode.RightToLeft;
      const quoted = options?.quoted || false;
      const fqnObject = new FullyQualifiedName(fqn, provider, parsingMode);
      return fqnObject._isValid(quoted);
    } catch (err) {
      return false;
      // if (err instanceof InvalidFQNError) {
      //   return false
      // }
      // throw err
    }
  }

  _isValid(quoted) {
    let checkDatabase = false;
    let checkSchema = false;
    let checkObject = false;
    let namePresent = false;
    // @ts-ignore
    if (this.parsingMode === ParsingMode.LeftToRight) {
      if (this.objectFragment) {
        if (!this.schemaFragment || !this.databaseFragment) {
          return false;
        }
        if (!quoted) {
          checkDatabase = checkSchema = checkObject = true;
        }
        namePresent = true;
      } else if (this.schemaFragment) {
        if (!this.databaseFragment) {
          return false;
        }
        if (!quoted) {
          checkDatabase = checkSchema = true;
        }
        namePresent = true;
      } else if (this.databaseFragment) {
        if (!quoted) {
          checkDatabase = true;
        }
        namePresent = true;
      }
    } else {
      if (this.databaseFragment) {
        if (!this.schemaFragment || !this.objectFragment) {
          return false;
        }
        if (!quoted) {
          checkDatabase = checkSchema = checkObject = true;
        }
        namePresent = true;
      } else if (this.schemaFragment) {
        if (!this.objectFragment) {
          return false;
        }
        if (!quoted) {
          checkSchema = checkObject = true;
        }
        namePresent = true;
      } else if (this.objectFragment) {
        if (!quoted) {
          checkObject = true;
        }
        namePresent = true;
      }
    }

    if (!namePresent) {
      return false;
    }

    const fullyQuoted =
      this.provider === Provider.BigQuery &&
      this.originalFQN.startsWith(escapeCharacter[Provider.BigQuery]) &&
      this.originalFQN.endsWith(escapeCharacter[Provider.BigQuery]) &&
      !this.originalFQN.slice(1, -1).includes(escapeCharacter[Provider.BigQuery]);
    if (
      checkDatabase &&
      !(fullyQuoted || this.databaseFragment?.quoted) &&
      nameNeedsQuotesChecker[this.provider].test(this.databaseFragment?.name || '')
    ) {
      // make exception for valid bigquery project ids (which can contain dashes)
      if (
        this.provider !== Provider.BigQuery ||
        !bqProjectId.test(this.databaseFragment?.name || '')
      ) {
        return false;
      }
    }
    if (
      checkSchema &&
      !(fullyQuoted || this.schemaFragment?.quoted) &&
      nameNeedsQuotesChecker[this.provider].test(this.schemaFragment?.name || '')
    ) {
      return false;
    }
    if (
      checkObject &&
      !(fullyQuoted || this.objectFragment?.quoted) &&
      nameNeedsQuotesChecker[this.provider].test(this.objectFragment?.name || '')
    ) {
      return false;
    }

    return true;
  }

  parseFQN(fqn) {
    const matchResult = fqn.match(fqnParseRegex[this.provider]);
    if (!matchResult) {
      throw new Error(this.originalFQN);
    }

    const identifiers = matchResult.slice(1, 4);

    const fragments = identifiers.map((name) => {
      if (name === '' && this.originalFQN !== '') {
        throw new Error(this.originalFQN);
      }

      if (!name) {
        return null;
      }

      return {
        name: name,
        quoted: this.isQuotedName(name)
      };
    });

    return fragments;
  }

  getFragmentName(fragment) {
    if (this.provider === Provider.BigQuery) {
      return this.unquoteFragmentName(fragment);
    }

    return this.quoteFragmentName(fragment);
  }

  quoteFragmentName(fragment, suffix = '') {
    if (suffix) {
      const parsedSuffix = this.parseFQN(`_${suffix}`)[0]?.name || '';

      if (fragment.quoted) {
        return this.quoteName(`${this.unquoteName(fragment.name, true)}${parsedSuffix}`);
      }

      if (
        nameNeedsQuotesChecker[this.provider].test(fragment.name) ||
        nameNeedsQuotesChecker[this.provider].test(parsedSuffix)
      ) {
        return this.quoteName(`${fragment.name}${parsedSuffix}`);
      }
      return `${fragment.name}${parsedSuffix}`;
    }

    if (fragment.quoted || !nameNeedsQuotesChecker[this.provider].test(fragment.name)) {
      return fragment.name;
    }
    return this.quoteName(fragment.name);
  }

  unquoteFragmentName(fragment, suffix = '') {
    const unquotedName = `${this.unquoteName(fragment.name)}${
      suffix ? this.parseFQN(`_${suffix}`)[0]?.name : ''
    }`;
    const needsQuotes =
      fragment.quoted || nameNeedsQuotesChecker[this.provider].test(unquotedName);

    // eslint-disable-next-line default-case
    switch (this.provider) {
      case Provider.BigQuery:
      case Provider.Databricks:
      case Provider.DatabricksRest:
        return unquotedName;
      case Provider.Postgres:
        return needsQuotes ? unquotedName : unquotedName.toLowerCase();
      case Provider.Snowflake:
        return needsQuotes ? unquotedName : unquotedName.toUpperCase();
      case Provider.Redshift:
        return unquotedName.replace(/[A-Z]/g, (match) => match.toLowerCase());
    }
  }

  isQuotedName(name) {
    return (
      name.startsWith(escapeCharacter[this.provider]) &&
      name.endsWith(escapeCharacter[this.provider])
    );
  }

  quoteName(name) {
    return `${escapeCharacter[this.provider]}${name}${escapeCharacter[this.provider]}`;
  }

  unquoteName(name, onlyDelimiters = false) {
    const escapeChar = escapeCharacter[this.provider];

    let unquotedName = name.replace(new RegExp(`^${escapeChar}|${escapeChar}$`, 'g'), '');
    if (!onlyDelimiters) {
      unquotedName = unquotedName.replace(
        new RegExp(`${escapeChar}{2}`, 'g'),
        escapeChar
      );
    }
    return unquotedName;
  }

  quoteExternalIdentifier(identifier) {
    const escapeChar = escapeCharacter[this.provider];
    return nameNeedsQuotesChecker[this.provider].test(identifier) ||
      caseSensitivenessChecker[this.provider]?.test(identifier)
      ? `${escapeChar}${identifier.replace(
          new RegExp(escapeChar, 'g'),
          '$&$&'
        )}${escapeChar}`
      : identifier;
  }
}
