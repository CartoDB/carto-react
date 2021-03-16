function addCommaRecognizer(p) {
  return p.toString().replace(/,/g, '_commaInArray');
}

function makeValueTransformation(prop) {
  if (Array.isArray(prop)) {
    if (prop.every((p) => typeof p === 'object')) {
      return `[\n  ${prop.map((p) => JSON.stringify(p))}\n]`;
    }

    if (prop.every(String)) {
      prop = prop.map((p) => `'${p}'`);
    }

    return `{[${addCommaRecognizer(prop)}]}`;
  }

  if (typeof prop === 'string') {
    return `'${prop}'`;
  }

  if (typeof prop === 'object') {
    return `{${JSON.stringify(prop)}}`;
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
