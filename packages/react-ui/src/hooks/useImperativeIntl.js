import { createIntl, createIntlCache } from 'react-intl';
import { messages } from '../localization';

// This is optional but highly recommended
// since it prevents memory leak
const cache = createIntlCache();

/**
 * The hook returns an instance of the Intl object with the specified locale
 * and messages using imperative API.
 * @see https://formatjs.io/docs/react-intl/api/#createintl
 * @param {string} locale - The locale to use.
 * @returns the `intl` object.
 */
export default function useImperativeIntl(locale) {
  const intl = createIntl(
    {
      locale: locale,
      messages: messages[locale]
    },
    cache
  );
  return intl;
}
