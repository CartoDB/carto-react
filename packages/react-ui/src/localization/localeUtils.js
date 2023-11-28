import { match } from '@formatjs/intl-localematcher';

export const DEFAULT_LOCALE = 'en';

export function flattenMessages(nestedMessages, prefix = '') {
  return Object.keys(nestedMessages).reduce((messages, key) => {
    const value = nestedMessages[key];
    const prefixedKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'string') {
      messages[prefixedKey] = value;
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey));
    }
    return messages;
  }, {});
}

export function findMatchingMessagesLocale(locale, messages) {
  const localeMatcher = match([locale], Object.keys(messages), DEFAULT_LOCALE);
  return localeMatcher ? localeMatcher : DEFAULT_LOCALE;
}
