function makeSpaces(length) {
  return ' '.repeat(length);
}

function addCommaRecognizer(p) {
  return p.toString().replace(/,/g, '_commaInArray');
}

function parseObject(obj, spaces) {
  return JSON.stringify(obj)
    .replace(/{/g, `{\n${makeSpaces(spaces)}`)
    .replace(/,/g, `\n${makeSpaces(spaces)}`);
}

function makeValueTransformation(prop) {
  if (Array.isArray(prop)) {
    if (!prop.length) {
      return '{[]}';
    }

    if (prop.every((p) => typeof p === 'object')) {
      return `${JSON.stringify(prop)}`;
    }

    if (prop.every((p) => typeof p === 'string')) {
      prop = prop.map((p) => `'${p}'`);
    }

    return `{[${addCommaRecognizer(prop)}]}`;
  }

  if (typeof prop === 'object') {
    return `{${parseObject(prop, 4)}}`.replace(/}}/g, '\n  }}');
  }

  if (typeof prop === 'string') {
    return `'${prop}'`;
  }

  return `{${prop}}`;
}

export function buildReactPropsAsString(props, componentName) {
  const transformedProps = Object.entries(props).map(
    ([k, v]) => k + '=' + makeValueTransformation(v)
  );

  return {
    docs: {
      source: {
        code: `<${componentName}\n  ${transformedProps
          .join()
          .replace(/,/g, '\n  ')
          .replace(/_commaInArray/g, ', ')}\n/>`
      }
    }
  };
}

export function replaceWithStyleForwardRef(displayName) {
  return displayName.replace(/WithStyles\(ForwardRef\(([\w]*)\){2}/, '$1');
}
