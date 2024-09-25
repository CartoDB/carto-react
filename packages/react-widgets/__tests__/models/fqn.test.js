import { Provider } from '@carto/react-core';
import { FullyQualifiedName, ParsingMode } from '../../src/models/fqn';

describe('FQN', () => {
  describe('for BigQuery', () => {
    test.each([
      [
        'project.dataset.table',
        { unquoted: ['project', 'dataset', 'table'], quoted: [null, null, null] },
        '`project.dataset.table`'
      ],
      [
        '`project.dataset.table`',
        { unquoted: ['project', 'dataset', 'table'], quoted: [null, null, null] },
        '`project.dataset.table`'
      ],
      [
        '`project`.`dataset`.`table`',
        {
          unquoted: ['project', 'dataset', 'table'],
          quoted: ['`project`', '`dataset`', '`table`']
        },
        '`project.dataset.table`'
      ],
      [
        'pro_ject.da-taset.tab le',
        {
          unquoted: ['pro_ject', 'da-taset', 'tab le'],
          quoted: [null, '`da-taset`', '`tab le`']
        },
        '`pro_ject.da-taset.tab le`'
      ],
      [
        'dataset.table',
        { unquoted: [null, 'dataset', 'table'], quoted: [null, null, null] },
        '`dataset.table`'
      ],
      ['table', { unquoted: ['', '', 'table'], quoted: [null, null, null] }, '`table`'],
      ['`table`', { unquoted: ['', '', 'table'], quoted: [null, null, null] }, '`table`'],
      [
        '`weird table-name`',
        {
          unquoted: ['', '', 'weird table-name'],
          quoted: [null, null, '`weird table-name`']
        },
        '`weird table-name`'
      ],
      [
        '`dataset.weird-table name`',
        {
          unquoted: ['', 'dataset', 'weird-table name'],
          quoted: [null, null, '`weird-table name`']
        },
        '`dataset.weird-table name`'
      ],
      [
        'project.dataset.`table with spaces`',
        {
          unquoted: ['project', 'dataset', 'table with spaces'],
          quoted: [null, null, '`table with spaces`']
        },
        '`project.dataset.table with spaces`'
      ],
      [
        '`project.dataset.`table double escaped``',
        {
          unquoted: ['project', 'dataset', 'table double escaped'],
          quoted: [null, null, '`table double escaped`']
        },
        '`project.dataset.table double escaped`'
      ],
      [
        '`project.dataset.table half escaped',
        {
          unquoted: ['project', 'dataset', 'table half escaped'],
          quoted: [null, null, '`table half escaped`']
        },
        '`project.dataset.table half escaped`'
      ],
      [
        'project.dataset.42name',
        { unquoted: ['project', 'dataset', '42name'], quoted: [null, null, '`42name`'] },
        '`project.dataset.42name`'
      ]
    ])(
      'should parse %p correctly',
      (
        fqn,
        {
          unquoted: [databaseName, schemaName, objectName],
          quoted: [quotedDatabaseName, quotedSchemaName, quotedObjectName]
        },
        expectedFqn
      ) => {
        const fqnObj = new FullyQualifiedName(fqn, Provider.BigQuery);

        expect(fqnObj.getObjectName()).toEqual(objectName);
        expect(fqnObj.getObjectName({ quoted: true })).toEqual(
          quotedObjectName || objectName
        );

        if (schemaName) {
          expect(fqnObj.getSchemaName()).toEqual(schemaName);
          expect(fqnObj.getSchemaName({ quoted: true })).toEqual(
            quotedSchemaName || schemaName
          );
        }

        if (databaseName) {
          expect(fqnObj.getDatabaseName()).toEqual(databaseName);
          expect(fqnObj.getDatabaseName({ quoted: true })).toEqual(
            quotedDatabaseName || databaseName
          );
        }

        expect(fqnObj.toString()).toEqual(expectedFqn);
      }
    );

    test.each([
      ['project.dataset', 'project', 'dataset', '', '`project.dataset`'],
      ['project', 'project', '', '', '`project`'],
      [
        'project.dataset.`table with spaces`',
        'project',
        'dataset',
        'table with spaces',
        '`project.dataset.table with spaces`'
      ]
    ])(
      'should parse %p correctly in left to right parsing mode',
      (fqn, databaseName, schemaName, objectName, expectedFqn) => {
        const fqnObj = new FullyQualifiedName(
          fqn,
          Provider.BigQuery,
          ParsingMode.LeftToRight
        );
        expect(fqnObj.getDatabaseName()).toEqual(databaseName);
        if (schemaName) {
          expect(fqnObj.getSchemaName()).toEqual(schemaName);
        }
        if (objectName) {
          expect(fqnObj.getObjectName()).toEqual(objectName);
        }
        expect(fqnObj.toString()).toEqual(expectedFqn);
      }
    );

    test.each([
      ['project.dataset.table.extra'],
      ['pro`ject.dataset.table'],
      ['`project.da``taset.table`'],
      ['dataset..table'],
      ['.dataset.table'],
      ['dataset.table.'],
      ['Project.dataset.table']
    ])('should throw an error for %p fqn', (invalidFqn) => {
      expect(() => new FullyQualifiedName(invalidFqn, Provider.BigQuery)).toThrowError();
    });

    test('should set project / dataset name correctly for an incomplete FQN', () => {
      const fqnObj = new FullyQualifiedName('dataset.table', Provider.BigQuery);
      fqnObj.setDatabaseName('project');
      fqnObj.setSchemaName('my_dataset');
      expect(fqnObj.getDatabaseName()).toEqual('project');
      expect(fqnObj.getSchemaName()).toEqual('my_dataset');
      expect(fqnObj.getObjectName()).toEqual('table');
      expect(fqnObj.toString()).toEqual('`project.my_dataset.table`');
    });

    test.each([
      ['project.dataset.table', 'suffix', 'table_suffix', 'table_suffix'],
      ['project.dataset.my-table', 'suffix', '`my-table_suffix`', 'my-table_suffix'],
      ['project.dataset.`table`', 'my-suffix', '`table_my-suffix`', 'table_my-suffix']
    ])(
      'should get object name correctly from %p with suffix %p',
      (fqn, suffix, quotedName, unquotedName) => {
        const fqnObj = new FullyQualifiedName(fqn, Provider.BigQuery);
        expect(fqnObj.getObjectName({ quoted: true, suffix: suffix })).toEqual(
          quotedName
        );
        expect(fqnObj.getObjectName({ quoted: false, suffix: suffix })).toEqual(
          unquotedName
        );
      }
    );

    test('should throw an error if we try to set the a project name with uppercase letters', () => {
      const fqnObj = new FullyQualifiedName('dataset.table', Provider.BigQuery);
      expect(() => fqnObj.setDatabaseName('Project')).toThrowError();
    });

    describe('isValid', () => {
      test.each([
        ['a.b.c.d'],
        ['a.b..c'],
        ['a..b.c'],
        ['a.b.c.'],
        ['.a.b.c'],
        ['.a.b.c.'],
        ['a..b'],
        ['.a.b'],
        ['a.b.'],
        ['a.'],
        ['.a'],
        ['`a.b.c.d`'],
        ['a.b..`c`'],
        ['`a..b.c`'],
        ['`a..b`']
      ])('should never accept %p', (fqn) => {
        expect(
          FullyQualifiedName.isValid(fqn, Provider.BigQuery, {
            parsingMode: ParsingMode.RightToLeft,
            quoted: false
          })
        ).toEqual(false);
        expect(
          FullyQualifiedName.isValid(fqn, Provider.BigQuery, {
            parsingMode: ParsingMode.RightToLeft,
            quoted: true
          })
        ).toEqual(false);
        expect(
          FullyQualifiedName.isValid(fqn, Provider.BigQuery, {
            parsingMode: ParsingMode.LeftToRight,
            quoted: false
          })
        ).toEqual(false);
        expect(
          FullyQualifiedName.isValid(fqn, Provider.BigQuery, {
            parsingMode: ParsingMode.LeftToRight,
            quoted: true
          })
        ).toEqual(false);
      });

      test.each([
        ['my project.dataset.table'],
        ['project.my dataset.table'],
        ['project.dataset.my table'],
        ['`project`.`dataset`.my table'],
        ['my dataset.table'],
        ['dataset.my table'],
        ['`my dataset`.my table'],
        ['my table']
      ])('should should only accept quoted %p', (fqn) => {
        expect(
          FullyQualifiedName.isValid(fqn, Provider.BigQuery, {
            parsingMode: ParsingMode.RightToLeft,
            quoted: false
          })
        ).toEqual(false);
        expect(
          FullyQualifiedName.isValid(fqn, Provider.BigQuery, {
            parsingMode: ParsingMode.RightToLeft,
            quoted: true
          })
        ).toEqual(true);
        expect(
          FullyQualifiedName.isValid(fqn, Provider.BigQuery, {
            parsingMode: ParsingMode.LeftToRight,
            quoted: false
          })
        ).toEqual(false);
        expect(
          FullyQualifiedName.isValid(fqn, Provider.BigQuery, {
            parsingMode: ParsingMode.LeftToRight,
            quoted: true
          })
        ).toEqual(true);
      });

      test.each([
        ['project.dataset.table'],
        ['dataset.table'],
        ['table'],
        ['my-project.dataset.table'],
        ['`a project`.dataset.table'],
        ['`a project.dataset.table`'],
        ['`a project.a dataset.a table`'],
        ['`a project`.`a dataset`.`a table`'],
        ['dataset.`a table`'],
        ['`a dataset`.`a table`'],
        ['`a table`']
      ])('should always accept %p', (fqn) => {
        expect(
          FullyQualifiedName.isValid(fqn, Provider.BigQuery, {
            parsingMode: ParsingMode.RightToLeft,
            quoted: false
          })
        ).toEqual(true);
        expect(
          FullyQualifiedName.isValid(fqn, Provider.BigQuery, {
            parsingMode: ParsingMode.RightToLeft,
            quoted: true
          })
        ).toEqual(true);
        expect(
          FullyQualifiedName.isValid(fqn, Provider.BigQuery, {
            parsingMode: ParsingMode.LeftToRight,
            quoted: false
          })
        ).toEqual(true);
        expect(
          FullyQualifiedName.isValid(fqn, Provider.BigQuery, {
            parsingMode: ParsingMode.LeftToRight,
            quoted: true
          })
        ).toEqual(true);
      });
    });
  });

  describe('for PostgreSQL', () => {
    test.each([
      [
        'database.schema.table',
        { unquoted: ['database', 'schema', 'table'], quoted: [null, null, null] },
        'database.schema.table'
      ],
      [
        'database."schema".table',
        { unquoted: ['database', 'schema', 'table'], quoted: [null, '"schema"', null] },
        'database."schema".table'
      ],
      [
        'database."schema"."table"',
        {
          unquoted: ['database', 'schema', 'table'],
          quoted: [null, '"schema"', '"table"']
        },
        'database."schema"."table"'
      ],
      [
        '"database.schema.table"',
        {
          unquoted: ['', '', 'database.schema.table'],
          quoted: [null, null, '"database.schema.table"']
        },
        '"database.schema.table"'
      ],
      [
        'database.schema."table WITH spaces"',
        {
          unquoted: ['database', 'schema', 'table WITH spaces'],
          quoted: [null, null, '"table WITH spaces"']
        },
        'database.schema."table WITH spaces"'
      ],
      [
        'database.schema.TableWithCaps',
        {
          unquoted: ['database', 'schema', 'tablewithcaps'],
          quoted: [null, null, 'TableWithCaps']
        },
        'database.schema.TableWithCaps'
      ],
      [
        'database.schema.table-WITH-dashes',
        {
          unquoted: ['database', 'schema', 'table-WITH-dashes'],
          quoted: [null, null, '"table-WITH-dashes"']
        },
        'database.schema."table-WITH-dashes"'
      ],
      [
        'database.schema."tableWith weird-FQN"',
        {
          unquoted: ['database', 'schema', 'tableWith weird-FQN'],
          quoted: [null, null, '"tableWith weird-FQN"']
        },
        'database.schema."tableWith weird-FQN"'
      ],
      [
        'database."schema"."ta""bl""e"',
        {
          unquoted: ['database', 'schema', 'ta"bl"e'],
          quoted: [null, '"schema"', '"ta""bl""e"']
        },
        'database."schema"."ta""bl""e"'
      ],
      [
        'database.schema.42name',
        { unquoted: ['database', 'schema', '42name'], quoted: [null, null, '"42name"'] },
        'database.schema."42name"'
      ]
    ])(
      'should parse %p correctly',
      (
        fqn,
        {
          unquoted: [databaseName, schemaName, objectName],
          quoted: [quotedDatabaseName, quotedSchemaName, quotedObjectName]
        },
        expectedFqn
      ) => {
        const fqnObj = new FullyQualifiedName(fqn, Provider.Postgres);

        expect(fqnObj.getObjectName()).toEqual(objectName);
        expect(fqnObj.getObjectName({ quoted: true })).toEqual(
          quotedObjectName || objectName
        );

        if (schemaName) {
          expect(fqnObj.getSchemaName()).toEqual(schemaName);
          expect(fqnObj.getSchemaName({ quoted: true })).toEqual(
            quotedSchemaName || schemaName
          );
        }

        if (databaseName) {
          expect(fqnObj.getDatabaseName()).toEqual(databaseName);
          expect(fqnObj.getDatabaseName({ quoted: true })).toEqual(
            quotedDatabaseName || databaseName
          );
        }

        expect(fqnObj.toString()).toEqual(expectedFqn);
      }
    );

    test.each([
      ['project.dataset', 'project', 'dataset', '', 'project.dataset'],
      ['project', 'project', '', '', 'project'],
      [
        'project.dataset.table with spaces',
        'project',
        'dataset',
        'table with spaces',
        'project.dataset."table with spaces"'
      ]
    ])(
      'should parse %p correctly in left to right parsing mode',
      (fqn, databaseName, schemaName, objectName, expectedFqn) => {
        const fqnObj = new FullyQualifiedName(
          fqn,
          Provider.Postgres,
          ParsingMode.LeftToRight
        );
        expect(fqnObj.getDatabaseName()).toEqual(databaseName);
        if (schemaName) {
          expect(fqnObj.getSchemaName()).toEqual(schemaName);
        }
        if (objectName) {
          expect(fqnObj.getObjectName()).toEqual(objectName);
        }
        expect(fqnObj.toString()).toEqual(expectedFqn);
      }
    );

    test.each([
      ['project.dataset.table.extra'],
      ['project.data"set.table'],
      ['schema..table'],
      ['.schema.table'],
      ['schema.table.']
    ])('should throw an error for %p fqn', (invalidFqn) => {
      expect(() => new FullyQualifiedName(invalidFqn, Provider.Postgres)).toThrowError();
    });

    test('should set database / schema name correctly for an incomplete FQN', () => {
      const fqnObj = new FullyQualifiedName('schema.table', Provider.Postgres);
      fqnObj.setDatabaseName('DAT_A-base');
      fqnObj.setSchemaName('MY_SCHEMA');
      expect(fqnObj.getDatabaseName()).toEqual('DAT_A-base');
      expect(fqnObj.getSchemaName()).toEqual('MY_SCHEMA');
      expect(fqnObj.getObjectName()).toEqual('table');
      expect(fqnObj.toString()).toEqual('"DAT_A-base"."MY_SCHEMA".table');
      fqnObj.setSchemaName('my_schema');
      expect(fqnObj.getSchemaName()).toEqual('my_schema');
      expect(fqnObj.toString()).toEqual('"DAT_A-base".my_schema.table');
    });

    test.each([
      ['project.dataset.table', 'suffix', 'table_suffix', 'table_suffix'],
      ['project.dataset.my-table', 'suffix', '"my-table_suffix"', 'my-table_suffix'],
      ['project.dataset.table', 'my-suffix', '"table_my-suffix"', 'table_my-suffix'],
      ['project.dataset."my""Table"', 'suffix', '"my""Table_suffix"', 'my"Table_suffix']
    ])(
      'should get object name correctly from %p with suffix %p',
      (fqn, suffix, quotedName, unquotedName) => {
        const fqnObj = new FullyQualifiedName(fqn, Provider.Postgres);
        expect(fqnObj.getObjectName({ quoted: true, suffix: suffix })).toEqual(
          quotedName
        );
        expect(fqnObj.getObjectName({ quoted: false, suffix: suffix })).toEqual(
          unquotedName
        );
      }
    );

    test('should set object name correctly when it should be escaped', () => {
      const fqnObj = new FullyQualifiedName(
        'database.schema',
        Provider.Postgres,
        ParsingMode.LeftToRight
      );
      fqnObj.setObjectName('ta ".ble name');
      expect(fqnObj.getObjectName()).toEqual('ta ".ble name');
      expect(fqnObj.toString()).toEqual('database.schema."ta "".ble name"');
    });

    describe('isValid', () => {
      test.each([
        ['a.b.c.d'],
        ['a.b..c'],
        ['a..b.c'],
        ['a.b.c.'],
        ['.a.b.c'],
        ['.a.b.c.'],
        ['a..b'],
        ['.a.b'],
        ['a.b.'],
        ['a.'],
        ['.a'],
        ['"a"."b"."c"."d"'],
        ['a.b.."c"'],
        ['"a".."b"."c"'],
        ['"a".."b"']
      ])('should never accept %p', (fqn) => {
        expect(
          FullyQualifiedName.isValid(fqn, Provider.Postgres, {
            parsingMode: ParsingMode.RightToLeft,
            quoted: false
          })
        ).toEqual(false);
        expect(
          FullyQualifiedName.isValid(fqn, Provider.Postgres, {
            parsingMode: ParsingMode.RightToLeft,
            quoted: true
          })
        ).toEqual(false);
        expect(
          FullyQualifiedName.isValid(fqn, Provider.Postgres, {
            parsingMode: ParsingMode.LeftToRight,
            quoted: false
          })
        ).toEqual(false);
        expect(
          FullyQualifiedName.isValid(fqn, Provider.Postgres, {
            parsingMode: ParsingMode.LeftToRight,
            quoted: true
          })
        ).toEqual(false);
      });

      test.each([
        ['my database.schema.table'],
        ['database.my schema.table'],
        ['database.schema.my table'],
        ['"database"."schema".my table'],
        ['my schema.table'],
        ['schema.my table'],
        ['"my schema".my table'],
        ['my table']
      ])('should should only accept quoted %p', (fqn) => {
        expect(
          FullyQualifiedName.isValid(fqn, Provider.Postgres, {
            parsingMode: ParsingMode.RightToLeft,
            quoted: false
          })
        ).toEqual(false);
        expect(
          FullyQualifiedName.isValid(fqn, Provider.Postgres, {
            parsingMode: ParsingMode.RightToLeft,
            quoted: true
          })
        ).toEqual(true);
        expect(
          FullyQualifiedName.isValid(fqn, Provider.Postgres, {
            parsingMode: ParsingMode.LeftToRight,
            quoted: false
          })
        ).toEqual(false);
        expect(
          FullyQualifiedName.isValid(fqn, Provider.Postgres, {
            parsingMode: ParsingMode.LeftToRight,
            quoted: true
          })
        ).toEqual(true);
      });

      test.each([
        ['database.schema.table'],
        ['"a database".schema.table'],
        ['"a database"."a schema"."a table"'],
        ['database."a table"'],
        ['"a database"."a table"'],
        ['"a table"']
      ])('should always accept %p', (fqn) => {
        expect(
          FullyQualifiedName.isValid(fqn, Provider.Postgres, {
            parsingMode: ParsingMode.RightToLeft,
            quoted: false
          })
        ).toEqual(true);
        expect(
          FullyQualifiedName.isValid(fqn, Provider.Postgres, {
            parsingMode: ParsingMode.RightToLeft,
            quoted: true
          })
        ).toEqual(true);
        expect(
          FullyQualifiedName.isValid(fqn, Provider.Postgres, {
            parsingMode: ParsingMode.LeftToRight,
            quoted: false
          })
        ).toEqual(true);
        expect(
          FullyQualifiedName.isValid(fqn, Provider.Postgres, {
            parsingMode: ParsingMode.LeftToRight,
            quoted: true
          })
        ).toEqual(true);
      });
    });
  });

  describe('for Snowflake', () => {
    test.each([
      [
        'database.schema.table',
        {
          unquoted: ['DATABASE', 'SCHEMA', 'TABLE'],
          quoted: ['database', 'schema', 'table']
        },
        'database.schema.table'
      ],
      [
        'DATABASE.schema.table',
        {
          unquoted: ['DATABASE', 'SCHEMA', 'TABLE'],
          quoted: ['DATABASE', 'schema', 'table']
        },
        'DATABASE.schema.table'
      ],
      [
        'DAT_abase.SCHE_ma.TAB le',
        {
          unquoted: ['DAT_ABASE', 'SCHE_MA', 'TAB le'],
          quoted: ['DAT_abase', 'SCHE_ma', '"TAB le"']
        },
        'DAT_abase.SCHE_ma."TAB le"'
      ],
      [
        'schema.table',
        { unquoted: ['', 'SCHEMA', 'TABLE'], quoted: [null, 'schema', 'table'] },
        'schema.table'
      ],
      ['table', { unquoted: ['', '', 'TABLE'], quoted: [null, null, 'table'] }, 'table'],
      [
        '"table"',
        { unquoted: ['', '', 'table'], quoted: [null, null, '"table"'] },
        '"table"'
      ],
      [
        '"weird table-name"',
        {
          unquoted: ['', '', 'weird table-name'],
          quoted: [null, null, '"weird table-name"']
        },
        '"weird table-name"'
      ],
      [
        'schema."weird-table name"',
        {
          unquoted: ['', 'SCHEMA', 'weird-table name'],
          quoted: [null, 'schema', '"weird-table name"']
        },
        'schema."weird-table name"'
      ],
      [
        'database.my@schema.my@table',
        {
          unquoted: ['DATABASE', 'my@schema', 'my@table'],
          quoted: ['database', '"my@schema"', '"my@table"']
        },
        'database."my@schema"."my@table"'
      ],
      [
        'database."schema"."ta""bl""e"',
        {
          unquoted: ['DATABASE', 'schema', 'ta"bl"e'],
          quoted: ['database', '"schema"', '"ta""bl""e"']
        },
        'database."schema"."ta""bl""e"'
      ],
      [
        'database.schema.42name',
        {
          unquoted: ['DATABASE', 'SCHEMA', '42name'],
          quoted: ['database', 'schema', '"42name"']
        },
        'database.schema."42name"'
      ]
    ])(
      'should parse %p correctly',
      (
        fqn,
        {
          unquoted: [databaseName, schemaName, objectName],
          quoted: [quotedDatabaseName, quotedSchemaName, quotedObjectName]
        },
        expectedFqn
      ) => {
        const fqnObj = new FullyQualifiedName(fqn, Provider.Snowflake);

        expect(fqnObj.getObjectName()).toEqual(objectName);
        expect(fqnObj.getObjectName({ quoted: true })).toEqual(
          quotedObjectName || objectName
        );

        if (schemaName) {
          expect(fqnObj.getSchemaName()).toEqual(schemaName);
          expect(fqnObj.getSchemaName({ quoted: true })).toEqual(
            quotedSchemaName || schemaName
          );
        }

        if (databaseName) {
          expect(fqnObj.getDatabaseName()).toEqual(databaseName);
          expect(fqnObj.getDatabaseName({ quoted: true })).toEqual(
            quotedDatabaseName || databaseName
          );
        }

        expect(fqnObj.toString()).toEqual(expectedFqn);
      }
    );

    test.each([
      ['project.dataset', 'PROJECT', 'DATASET', '', 'project.dataset'],
      ['project', 'PROJECT', '', '', 'project'],
      [
        'project.dataset.table with spaces',
        'PROJECT',
        'DATASET',
        'table with spaces',
        'project.dataset."table with spaces"'
      ]
    ])(
      'should parse %p correctly in left to right parsing mode',
      (fqn, databaseName, schemaName, objectName, expectedFqn) => {
        const fqnObj = new FullyQualifiedName(
          fqn,
          Provider.Snowflake,
          ParsingMode.LeftToRight
        );
        expect(fqnObj.getDatabaseName()).toEqual(databaseName);
        if (schemaName) {
          expect(fqnObj.getSchemaName()).toEqual(schemaName);
        }
        if (objectName) {
          expect(fqnObj.getObjectName()).toEqual(objectName);
        }
        expect(fqnObj.toString()).toEqual(expectedFqn);
      }
    );

    test.each([
      ['database.schema.table.extra'],
      ['schema..table'],
      ['.schema.table'],
      ['schema.table.']
    ])('should throw an error for %p fqn', (invalidFqn) => {
      expect(() => new FullyQualifiedName(invalidFqn, Provider.Snowflake)).toThrowError();
    });

    test('should set database / schema name correctly for an incomplete FQN', () => {
      const fqnObj = new FullyQualifiedName('schema.table', Provider.Snowflake);
      fqnObj.setDatabaseName('DAT_A-base');
      fqnObj.setSchemaName('my_schema');
      expect(fqnObj.getDatabaseName()).toEqual('DAT_A-base');
      expect(fqnObj.getSchemaName()).toEqual('my_schema');
      expect(fqnObj.getObjectName()).toEqual('TABLE');
      expect(fqnObj.toString()).toEqual('"DAT_A-base"."my_schema".table');
      fqnObj.setSchemaName('MY_SCHEMA');
      expect(fqnObj.getSchemaName()).toEqual('MY_SCHEMA');
      expect(fqnObj.toString()).toEqual('"DAT_A-base".MY_SCHEMA.table');
    });

    test.each([
      ['project.dataset.table', 'suffix', 'table_suffix', 'TABLE_SUFFIX'],
      ['project.dataset.my-table', 'suffix', '"my-table_suffix"', 'my-table_suffix'],
      ['project.dataset.table', 'my-suffix', '"table_my-suffix"', 'table_my-suffix'],
      ['project.dataset."my""Table"', 'suffix', '"my""Table_suffix"', 'my"Table_suffix']
    ])(
      'should get object name correctly from %p with suffix %p',
      (fqn, suffix, quotedName, unquotedName) => {
        const fqnObj = new FullyQualifiedName(fqn, Provider.Snowflake);
        expect(fqnObj.getObjectName({ quoted: true, suffix: suffix })).toEqual(
          quotedName
        );
        expect(fqnObj.getObjectName({ quoted: false, suffix: suffix })).toEqual(
          unquotedName
        );
      }
    );

    test('should set object name correctly when it should be escaped', () => {
      const fqnObj = new FullyQualifiedName(
        'database.schema',
        Provider.Snowflake,
        ParsingMode.LeftToRight
      );
      fqnObj.setObjectName('ta ".ble name');
      expect(fqnObj.getObjectName()).toEqual('ta ".ble name');
      expect(fqnObj.toString()).toEqual('database.schema."ta "".ble name"');
    });

    describe('isValid', () => {
      test.each([
        ['a.b.c.d'],
        ['a.b..c'],
        ['a..b.c'],
        ['a.b.c.'],
        ['.a.b.c'],
        ['.a.b.c.'],
        ['a..b'],
        ['.a.b'],
        ['a.b.'],
        ['a.'],
        ['.a'],
        ['"a"."b"."c"."d"'],
        ['a.b.."c"'],
        ['"a".."b"."c"'],
        ['"a".."b"']
      ])('should never accept %p', (fqn) => {
        expect(
          FullyQualifiedName.isValid(fqn, Provider.Snowflake, {
            parsingMode: ParsingMode.RightToLeft,
            quoted: false
          })
        ).toEqual(false);
        expect(
          FullyQualifiedName.isValid(fqn, Provider.Snowflake, {
            parsingMode: ParsingMode.RightToLeft,
            quoted: true
          })
        ).toEqual(false);
        expect(
          FullyQualifiedName.isValid(fqn, Provider.Snowflake, {
            parsingMode: ParsingMode.LeftToRight,
            quoted: false
          })
        ).toEqual(false);
        expect(
          FullyQualifiedName.isValid(fqn, Provider.Snowflake, {
            parsingMode: ParsingMode.LeftToRight,
            quoted: true
          })
        ).toEqual(false);
      });

      test.each([
        ['my database.schema.table'],
        ['database.my schema.table'],
        ['database.schema.my table'],
        ['"database"."schema".my table'],
        ['my schema.table'],
        ['schema.my table'],
        ['"my schema".my table'],
        ['my table']
      ])('should should only accept quoted %p', (fqn) => {
        expect(
          FullyQualifiedName.isValid(fqn, Provider.Snowflake, {
            parsingMode: ParsingMode.RightToLeft,
            quoted: false
          })
        ).toEqual(false);
        expect(
          FullyQualifiedName.isValid(fqn, Provider.Snowflake, {
            parsingMode: ParsingMode.RightToLeft,
            quoted: true
          })
        ).toEqual(true);
        expect(
          FullyQualifiedName.isValid(fqn, Provider.Snowflake, {
            parsingMode: ParsingMode.LeftToRight,
            quoted: false
          })
        ).toEqual(false);
        expect(
          FullyQualifiedName.isValid(fqn, Provider.Snowflake, {
            parsingMode: ParsingMode.LeftToRight,
            quoted: true
          })
        ).toEqual(true);
      });

      test.each([
        ['database.schema.table'],
        ['"a database".schema.table'],
        ['"a database"."a schema"."a table"'],
        ['database."a table"'],
        ['"a database"."a table"'],
        ['"a table"']
      ])('should always accept %p', (fqn) => {
        expect(
          FullyQualifiedName.isValid(fqn, Provider.Snowflake, {
            parsingMode: ParsingMode.RightToLeft,
            quoted: false
          })
        ).toEqual(true);
        expect(
          FullyQualifiedName.isValid(fqn, Provider.Snowflake, {
            parsingMode: ParsingMode.RightToLeft,
            quoted: true
          })
        ).toEqual(true);
        expect(
          FullyQualifiedName.isValid(fqn, Provider.Snowflake, {
            parsingMode: ParsingMode.LeftToRight,
            quoted: false
          })
        ).toEqual(true);
        expect(
          FullyQualifiedName.isValid(fqn, Provider.Snowflake, {
            parsingMode: ParsingMode.LeftToRight,
            quoted: true
          })
        ).toEqual(true);
      });
    });
  });

  describe('for Redshift', () => {
    test.each([
      [
        'database.schema.table',
        { unquoted: ['database', 'schema', 'table'], quoted: [null, null, null] },
        'database.schema.table'
      ],
      [
        'database."schema".table',
        { unquoted: ['database', 'schema', 'table'], quoted: [null, '"schema"', null] },
        'database."schema".table'
      ],
      [
        'database."schema"."table"',
        {
          unquoted: ['database', 'schema', 'table'],
          quoted: [null, '"schema"', '"table"']
        },
        'database."schema"."table"'
      ],
      [
        '"database.schema.table"',
        {
          unquoted: ['', '', 'database.schema.table'],
          quoted: [null, null, '"database.schema.table"']
        },
        '"database.schema.table"'
      ],
      [
        'database.schema."table WITH spaces"',
        {
          unquoted: ['database', 'schema', 'table with spaces'],
          quoted: [null, null, '"table WITH spaces"']
        },
        'database.schema."table WITH spaces"'
      ],
      [
        'database.schema.TableWithCaps',
        {
          unquoted: ['database', 'schema', 'tablewithcaps'],
          quoted: [null, null, 'TableWithCaps']
        },
        'database.schema.TableWithCaps'
      ],
      [
        'database.schema.table-with-dashes',
        {
          unquoted: ['database', 'schema', 'table-with-dashes'],
          quoted: [null, null, '"table-with-dashes"']
        },
        'database.schema."table-with-dashes"'
      ],
      [
        'database.schema."tableWith weird-FQN"',
        {
          unquoted: ['database', 'schema', 'tablewith weird-fqn'],
          quoted: [null, null, '"tableWith weird-FQN"']
        },
        'database.schema."tableWith weird-FQN"'
      ],
      [
        'database."schema"."ta""bl""e"',
        {
          unquoted: ['database', 'schema', 'ta"bl"e'],
          quoted: [null, '"schema"', '"ta""bl""e"']
        },
        'database."schema"."ta""bl""e"'
      ],
      [
        'database.schema.42name',
        { unquoted: ['database', 'schema', '42name'], quoted: [null, null, '"42name"'] },
        'database.schema."42name"'
      ]
    ])(
      'should parse %p correctly',
      (
        fqn,
        {
          unquoted: [databaseName, schemaName, objectName],
          quoted: [quotedDatabaseName, quotedSchemaName, quotedObjectName]
        },
        expectedFqn
      ) => {
        const fqnObj = new FullyQualifiedName(fqn, Provider.Redshift);

        expect(fqnObj.getObjectName()).toEqual(objectName);
        expect(fqnObj.getObjectName({ quoted: true })).toEqual(
          quotedObjectName || objectName
        );

        if (schemaName) {
          expect(fqnObj.getSchemaName()).toEqual(schemaName);
          expect(fqnObj.getSchemaName({ quoted: true })).toEqual(
            quotedSchemaName || schemaName
          );
        }

        if (databaseName) {
          expect(fqnObj.getDatabaseName()).toEqual(databaseName);
          expect(fqnObj.getDatabaseName({ quoted: true })).toEqual(
            quotedDatabaseName || databaseName
          );
        }

        expect(fqnObj.toString()).toEqual(expectedFqn);
      }
    );

    test.each([
      ['project.dataset', 'project', 'dataset', '', 'project.dataset'],
      ['project', 'project', '', '', 'project'],
      [
        'project.dataset.table with spaces',
        'project',
        'dataset',
        'table with spaces',
        'project.dataset."table with spaces"'
      ]
    ])(
      'should parse %p correctly in left to right parsing mode',
      (fqn, databaseName, schemaName, objectName, expectedFqn) => {
        const fqnObj = new FullyQualifiedName(
          fqn,
          Provider.Redshift,
          ParsingMode.LeftToRight
        );
        expect(fqnObj.getDatabaseName()).toEqual(databaseName);
        if (schemaName) {
          expect(fqnObj.getSchemaName()).toEqual(schemaName);
        }
        if (objectName) {
          expect(fqnObj.getObjectName()).toEqual(objectName);
        }
        expect(fqnObj.toString()).toEqual(expectedFqn);
      }
    );

    test.each([
      ['project.dataset.table.extra'],
      ['schema..table'],
      ['.schema.table'],
      ['schema.table.']
    ])('should throw an error for %p fqn', (invalidFqn) => {
      expect(() => new FullyQualifiedName(invalidFqn, Provider.Redshift)).toThrowError();
    });

    test('should set database / schema name correctly for an incomplete FQN', () => {
      const fqnObj = new FullyQualifiedName('schema.table', Provider.Redshift);
      fqnObj.setDatabaseName('DAT_A-base');
      fqnObj.setSchemaName('my_schema');
      expect(fqnObj.getDatabaseName()).toEqual('dat_a-base');
      expect(fqnObj.getSchemaName()).toEqual('my_schema');
      expect(fqnObj.getObjectName()).toEqual('table');
      expect(fqnObj.toString()).toEqual('"DAT_A-base".my_schema.table');
    });

    test.each([
      ['project.dataset.table', 'suffix', 'table_suffix', 'table_suffix'],
      ['project.dataset.my-table', 'suffix', '"my-table_suffix"', 'my-table_suffix'],
      ['project.dataset.table', 'my-suffix', '"table_my-suffix"', 'table_my-suffix'],
      ['project.dataset."my""Table"', 'suffix', '"my""Table_suffix"', 'my"table_suffix']
    ])(
      'should get object name correctly from %p with suffix %p',
      (fqn, suffix, quotedName, unquotedName) => {
        const fqnObj = new FullyQualifiedName(fqn, Provider.Redshift);
        expect(fqnObj.getObjectName({ quoted: true, suffix: suffix })).toEqual(
          quotedName
        );
        expect(fqnObj.getObjectName({ quoted: false, suffix: suffix })).toEqual(
          unquotedName
        );
      }
    );

    test('should set object name correctly when it should be escaped', () => {
      const fqnObj = new FullyQualifiedName(
        'database.schema',
        Provider.Redshift,
        ParsingMode.LeftToRight
      );
      fqnObj.setObjectName('ta ".ble name');
      expect(fqnObj.getObjectName()).toEqual('ta ".ble name');
      expect(fqnObj.toString()).toEqual('database.schema."ta "".ble name"');
    });

    describe('isValid', () => {
      test.each([
        ['a.b.c.d'],
        ['a.b..c'],
        ['a..b.c'],
        ['a.b.c.'],
        ['.a.b.c'],
        ['.a.b.c.'],
        ['a..b'],
        ['.a.b'],
        ['a.b.'],
        ['a.'],
        ['.a'],
        ['"a"."b"."c"."d"'],
        ['a.b.."c"'],
        ['"a".."b"."c"'],
        ['"a".."b"']
      ])('should never accept %p', (fqn) => {
        expect(
          FullyQualifiedName.isValid(fqn, Provider.Redshift, {
            parsingMode: ParsingMode.RightToLeft,
            quoted: false
          })
        ).toEqual(false);
        expect(
          FullyQualifiedName.isValid(fqn, Provider.Redshift, {
            parsingMode: ParsingMode.RightToLeft,
            quoted: true
          })
        ).toEqual(false);
        expect(
          FullyQualifiedName.isValid(fqn, Provider.Redshift, {
            parsingMode: ParsingMode.LeftToRight,
            quoted: false
          })
        ).toEqual(false);
        expect(
          FullyQualifiedName.isValid(fqn, Provider.Redshift, {
            parsingMode: ParsingMode.LeftToRight,
            quoted: true
          })
        ).toEqual(false);
      });

      test.each([
        ['my database.schema.table'],
        ['database.my schema.table'],
        ['database.schema.my table'],
        ['"database"."schema".my table'],
        ['my schema.table'],
        ['schema.my table'],
        ['"my schema".my table'],
        ['my table']
      ])('should should only accept quoted %p', (fqn) => {
        expect(
          FullyQualifiedName.isValid(fqn, Provider.Redshift, {
            parsingMode: ParsingMode.RightToLeft,
            quoted: false
          })
        ).toEqual(false);
        expect(
          FullyQualifiedName.isValid(fqn, Provider.Redshift, {
            parsingMode: ParsingMode.RightToLeft,
            quoted: true
          })
        ).toEqual(true);
        expect(
          FullyQualifiedName.isValid(fqn, Provider.Redshift, {
            parsingMode: ParsingMode.LeftToRight,
            quoted: false
          })
        ).toEqual(false);
        expect(
          FullyQualifiedName.isValid(fqn, Provider.Redshift, {
            parsingMode: ParsingMode.LeftToRight,
            quoted: true
          })
        ).toEqual(true);
      });

      test.each([
        ['database.schema.table'],
        ['"a database".schema.table'],
        ['"a database"."a schema"."a table"'],
        ['database."a table"'],
        ['"a database"."a table"'],
        ['"a table"']
      ])('should always accept %p', (fqn) => {
        expect(
          FullyQualifiedName.isValid(fqn, Provider.Redshift, {
            parsingMode: ParsingMode.RightToLeft,
            quoted: false
          })
        ).toEqual(true);
        expect(
          FullyQualifiedName.isValid(fqn, Provider.Redshift, {
            parsingMode: ParsingMode.RightToLeft,
            quoted: true
          })
        ).toEqual(true);
        expect(
          FullyQualifiedName.isValid(fqn, Provider.Redshift, {
            parsingMode: ParsingMode.LeftToRight,
            quoted: false
          })
        ).toEqual(true);
        expect(
          FullyQualifiedName.isValid(fqn, Provider.Redshift, {
            parsingMode: ParsingMode.LeftToRight,
            quoted: true
          })
        ).toEqual(true);
      });
    });
  });

  describe.each([Provider.Databricks, Provider.DatabricksRest])('for %s', (provider) => {
    test.each([
      [
        'database.schema.table',
        { unquoted: ['database', 'schema', 'table'], quoted: [null, null, null] },
        'database.schema.table'
      ],
      [
        'database.`schema`.table',
        { unquoted: ['database', 'schema', 'table'], quoted: [null, '`schema`', null] },
        'database.`schema`.table'
      ],
      [
        'database.`schema`.`table`',
        {
          unquoted: ['database', 'schema', 'table'],
          quoted: [null, '`schema`', '`table`']
        },
        'database.`schema`.`table`'
      ],
      [
        '`database.schema.table`',
        {
          unquoted: ['', '', 'database.schema.table'],
          quoted: [null, null, '`database.schema.table`']
        },
        '`database.schema.table`'
      ],
      [
        'database.schema.`table with spaces`',
        {
          unquoted: ['database', 'schema', 'table with spaces'],
          quoted: [null, null, '`table with spaces`']
        },
        'database.schema.`table with spaces`'
      ],
      [
        'database.schema.TableWithCaps',
        { unquoted: ['database', 'schema', 'TableWithCaps'], quoted: [null, null, null] },
        'database.schema.TableWithCaps'
      ],
      [
        'database.schema.table-with-dashes',
        {
          unquoted: ['database', 'schema', 'table-with-dashes'],
          quoted: [null, null, '`table-with-dashes`']
        },
        'database.schema.`table-with-dashes`'
      ],
      [
        'database.schema.`tableWith weird-FQN`',
        {
          unquoted: ['database', 'schema', 'tableWith weird-FQN'],
          quoted: [null, null, '`tableWith weird-FQN`']
        },
        'database.schema.`tableWith weird-FQN`'
      ],
      [
        'database.`schema`.`ta``bl``e`',
        {
          unquoted: ['database', 'schema', 'ta`bl`e'],
          quoted: [null, '`schema`', '`ta``bl``e`']
        },
        'database.`schema`.`ta``bl``e`'
      ],
      [
        '`carto-dev-data`.support_team.airports_rls_prepared',
        {
          unquoted: ['carto-dev-data', 'support_team', 'airports_rls_prepared'],
          quoted: ['`carto-dev-data`', 'support_team', 'airports_rls_prepared']
        },
        '`carto-dev-data`.support_team.airports_rls_prepared'
      ]
    ])(
      'should parse %p correctly',
      (
        fqn,
        {
          unquoted: [databaseName, schemaName, objectName],
          quoted: [quotedDatabaseName, quotedSchemaName, quotedObjectName]
        },
        expectedFqn
      ) => {
        const fqnObj = new FullyQualifiedName(fqn, provider);

        expect(fqnObj.getObjectName()).toEqual(objectName);
        expect(fqnObj.getObjectName({ quoted: true })).toEqual(
          quotedObjectName || objectName
        );

        if (schemaName) {
          expect(fqnObj.getSchemaName()).toEqual(schemaName);
          expect(fqnObj.getSchemaName({ quoted: true })).toEqual(
            quotedSchemaName || schemaName
          );
        }

        if (databaseName) {
          expect(fqnObj.getDatabaseName()).toEqual(databaseName);
          expect(fqnObj.getDatabaseName({ quoted: true })).toEqual(
            quotedDatabaseName || databaseName
          );
        }

        expect(fqnObj.toString()).toEqual(expectedFqn);
      }
    );

    test.each([
      ['project.dataset', 'project', 'dataset', '', 'project.dataset'],
      ['project', 'project', '', '', 'project'],
      [
        'project.dataset.table with spaces',
        'project',
        'dataset',
        'table with spaces',
        'project.dataset.`table with spaces`'
      ]
    ])(
      'should parse %p correctly in left to right parsing mode',
      (fqn, databaseName, schemaName, objectName, expectedFqn) => {
        const fqnObj = new FullyQualifiedName(fqn, provider, ParsingMode.LeftToRight);
        expect(fqnObj.getDatabaseName()).toEqual(databaseName);
        if (schemaName) {
          expect(fqnObj.getSchemaName()).toEqual(schemaName);
        }
        if (objectName) {
          expect(fqnObj.getObjectName()).toEqual(objectName);
        }
        expect(fqnObj.toString()).toEqual(expectedFqn);
      }
    );

    test.each([
      ['project.dataset.table.extra'],
      ['"project.dataset.name'],
      ['schema..table'],
      ['.schema.table'],
      ['schema.table.']
    ])('should throw an error for %p fqn', (invalidFqn) => {
      expect(() => new FullyQualifiedName(invalidFqn, Provider.Snowflake)).toThrowError();
    });

    test('should set database / schema name correctly for an incomplete FQN', () => {
      const fqnObj = new FullyQualifiedName('schema.table', provider);
      fqnObj.setDatabaseName('DAT_A-base');
      fqnObj.setSchemaName('my_schema');
      expect(fqnObj.getDatabaseName()).toEqual('DAT_A-base');
      expect(fqnObj.getSchemaName()).toEqual('my_schema');
      expect(fqnObj.getObjectName()).toEqual('table');
      expect(fqnObj.toString()).toEqual('`DAT_A-base`.my_schema.table');
    });

    test.each([
      ['project.dataset.table', 'suffix', 'table_suffix', 'table_suffix'],
      ['project.dataset.my-table', 'suffix', '`my-table_suffix`', 'my-table_suffix'],
      ['project.dataset.table', 'my-suffix', '`table_my-suffix`', 'table_my-suffix'],
      ['project.dataset.`my``Table`', 'suffix', '`my``Table_suffix`', 'my`Table_suffix']
    ])(
      'should get object name correctly from %p with suffix %p',
      (fqn, suffix, quotedName, unquotedName) => {
        const fqnObj = new FullyQualifiedName(fqn, provider);
        expect(fqnObj.getObjectName({ quoted: true, suffix: suffix })).toEqual(
          quotedName
        );
        expect(fqnObj.getObjectName({ quoted: false, suffix: suffix })).toEqual(
          unquotedName
        );
      }
    );

    test('should set object name correctly when it should be escaped', () => {
      const fqnObj = new FullyQualifiedName(
        'database.schema',
        provider,
        ParsingMode.LeftToRight
      );
      fqnObj.setObjectName('ta ".ble name');
      expect(fqnObj.getObjectName()).toEqual('ta ".ble name');
      expect(fqnObj.toString()).toEqual('database.schema.`ta ".ble name`');
    });

    describe('isValid', () => {
      test.each([
        ['a.b.c.d'],
        ['a.b..c'],
        ['a..b.c'],
        ['a.b.c.'],
        ['.a.b.c'],
        ['.a.b.c.'],
        ['a..b'],
        ['.a.b'],
        ['a.b.'],
        ['a.'],
        ['.a'],
        ['`a`.`b`.`c`.`d`'],
        ['a.b..`c`'],
        ['`a`..`b`.`c`'],
        ['`a`..`b`']
      ])('should never accept %p', (fqn) => {
        expect(
          FullyQualifiedName.isValid(fqn, provider, {
            parsingMode: ParsingMode.RightToLeft,
            quoted: false
          })
        ).toEqual(false);
        expect(
          FullyQualifiedName.isValid(fqn, provider, {
            parsingMode: ParsingMode.RightToLeft,
            quoted: true
          })
        ).toEqual(false);
        expect(
          FullyQualifiedName.isValid(fqn, provider, {
            parsingMode: ParsingMode.LeftToRight,
            quoted: false
          })
        ).toEqual(false);
        expect(
          FullyQualifiedName.isValid(fqn, provider, {
            parsingMode: ParsingMode.LeftToRight,
            quoted: true
          })
        ).toEqual(false);
      });

      test.each([
        ['my database.schema.table'],
        ['database.my schema.table'],
        ['database.schema.my table'],
        ['`database`.`schema`.my table'],
        ['my schema.table'],
        ['schema.my table'],
        ['`my schema`.my table'],
        ['my table']
      ])('should should only accept quoted %p', (fqn) => {
        expect(
          FullyQualifiedName.isValid(fqn, provider, {
            parsingMode: ParsingMode.RightToLeft,
            quoted: false
          })
        ).toEqual(false);
        expect(
          FullyQualifiedName.isValid(fqn, provider, {
            parsingMode: ParsingMode.RightToLeft,
            quoted: true
          })
        ).toEqual(true);
        expect(
          FullyQualifiedName.isValid(fqn, provider, {
            parsingMode: ParsingMode.LeftToRight,
            quoted: false
          })
        ).toEqual(false);
        expect(
          FullyQualifiedName.isValid(fqn, provider, {
            parsingMode: ParsingMode.LeftToRight,
            quoted: true
          })
        ).toEqual(true);
      });

      test.each([
        ['database.schema.table'],
        ['`a database`.schema.table'],
        ['`a database`.`a schema`.`a table`'],
        ['database.`a table`'],
        ['`a database`.`a table`'],
        ['`a table`']
      ])('should always accept %p', (fqn) => {
        expect(
          FullyQualifiedName.isValid(fqn, provider, {
            parsingMode: ParsingMode.RightToLeft,
            quoted: false
          })
        ).toEqual(true);
        expect(
          FullyQualifiedName.isValid(fqn, provider, {
            parsingMode: ParsingMode.RightToLeft,
            quoted: true
          })
        ).toEqual(true);
        expect(
          FullyQualifiedName.isValid(fqn, provider, {
            parsingMode: ParsingMode.LeftToRight,
            quoted: false
          })
        ).toEqual(true);
        expect(
          FullyQualifiedName.isValid(fqn, provider, {
            parsingMode: ParsingMode.LeftToRight,
            quoted: true
          })
        ).toEqual(true);
      });
    });
  });

  describe('in default parsing mode (right to left)', () => {
    describe('with no schema and object', () => {
      test('should work when safely asking for database name', () => {
        const fqn = new FullyQualifiedName('schema.table', Provider.BigQuery);
        expect(fqn.getDatabaseName({ safe: true })).toBe(null);
      });

      test('should work when safely asking for schema name', () => {
        const fqn = new FullyQualifiedName('table', Provider.BigQuery);
        expect(fqn.getSchemaName({ safe: true })).toBe(null);
      });

      test('should fail when asking for database name', () => {
        const fqn = new FullyQualifiedName('schema.table', Provider.BigQuery);
        expect(() => fqn.getDatabaseName()).toThrowError('Database name is not defined');
      });

      test('should fail when asking for schema name', () => {
        const fqn = new FullyQualifiedName('table', Provider.BigQuery);
        expect(() => fqn.getSchemaName()).toThrowError('Schema name is not defined');
      });

      test('should work when asking for object name', () => {
        const fqn = new FullyQualifiedName('table', Provider.BigQuery);
        expect(fqn.getObjectName()).toEqual('table');
      });
    });

    describe('with no database name', () => {
      test('should work when safely asking for database name', () => {
        const fqn = new FullyQualifiedName('schema.table', Provider.BigQuery);
        expect(fqn.getDatabaseName({ safe: true })).toEqual(null);
      });

      test('should fail when asking for database name', () => {
        const fqn = new FullyQualifiedName('schema.table', Provider.BigQuery);
        expect(() => fqn.getDatabaseName()).toThrowError('Database name is not defined');
      });

      test('should work when asking for schema name', () => {
        const fqn = new FullyQualifiedName('schema.table', Provider.BigQuery);
        expect(fqn.getSchemaName()).toEqual('schema');
      });

      test('should work when asking for object name', () => {
        const fqn = new FullyQualifiedName('table', Provider.BigQuery);
        expect(fqn.getObjectName()).toEqual('table');
      });
    });
  });

  describe('in left to right parsing mode', () => {
    describe('with no schema and object ', () => {
      test('should work when asking for full FQN', () => {
        const fqn = new FullyQualifiedName(
          'database',
          Provider.BigQuery,
          ParsingMode.LeftToRight
        );
        expect(fqn.toString()).toEqual('`database`');
      });

      test('should work when asking for database name', () => {
        const fqn = new FullyQualifiedName(
          'database',
          Provider.BigQuery,
          ParsingMode.LeftToRight
        );
        expect(fqn.getDatabaseName()).toEqual('database');
      });

      test('should fail when asking for schema name', () => {
        const fqn = new FullyQualifiedName(
          'database',
          Provider.BigQuery,
          ParsingMode.LeftToRight
        );
        expect(() => fqn.getSchemaName()).toThrowError('Schema name is not defined');
      });

      test('should fail when asking for object name', () => {
        const fqn = new FullyQualifiedName(
          'database',
          Provider.BigQuery,
          ParsingMode.LeftToRight
        );
        expect(() => fqn.getObjectName()).toThrowError('Object name is not defined');
      });

      test('should work when safely asking for schema name', () => {
        const fqn = new FullyQualifiedName(
          'database',
          Provider.BigQuery,
          ParsingMode.LeftToRight
        );
        expect(fqn.getSchemaName({ safe: true })).toBe(null);
      });

      test('should work when safely asking for object name', () => {
        const fqn = new FullyQualifiedName(
          'database',
          Provider.BigQuery,
          ParsingMode.LeftToRight
        );
        expect(fqn.getObjectName({ safe: true })).toBe(null);
      });
    });

    describe('with no object name', () => {
      test('should work when asking for full FQN', () => {
        const fqn = new FullyQualifiedName(
          'database.schema',
          Provider.BigQuery,
          ParsingMode.LeftToRight
        );
        expect(fqn.toString()).toEqual('`database.schema`');
      });

      test('should work when asking for database name', () => {
        const fqn = new FullyQualifiedName(
          'database.schema',
          Provider.BigQuery,
          ParsingMode.LeftToRight
        );
        expect(fqn.getDatabaseName()).toEqual('database');
      });

      test('should work when asking for schema name', () => {
        const fqn = new FullyQualifiedName(
          'database.schema',
          Provider.BigQuery,
          ParsingMode.LeftToRight
        );
        expect(fqn.getSchemaName()).toEqual('schema');
      });

      test('should fail when asking for object name', () => {
        const fqn = new FullyQualifiedName(
          'database.schema',
          Provider.BigQuery,
          ParsingMode.LeftToRight
        );
        expect(() => fqn.getObjectName()).toThrowError('Object name is not defined');
      });
    });
  });
});
