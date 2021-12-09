export function processFormatterRes(formatterRes) {
  return typeof formatterRes === 'object'
    ? `${formatterRes.prefix || ''}${formatterRes.value}${formatterRes.suffix || ''}`
    : formatterRes;
}
