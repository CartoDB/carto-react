import { createIntl, createIntlCache } from 'react-intl';
import { messages } from '../localization';
import { useMemo } from 'react';

const DEFAULT_LOCALE = 'en-US';
const cache = createIntlCache();

/**
 * The hook returns an instance of the Intl object with the specified locale
 * and messages using imperative API.
 * @see https://formatjs.io/docs/react-intl/api/#createintl
 * @param {string} locale - The locale to use.
 * @returns the `intl` object.
 */
export default function useImperativeIntl(locale) {
  // Check if the locale is valid ISO 5 letters code (ex: 'en-US', 'es-ES', 'id-ID')
  const testLocale = /^[a-z]{2}-[A-Z]{2}$/;
  const validLocale = testLocale.test(locale) ? locale : DEFAULT_LOCALE;

  const intl = useMemo(
    () =>
      createIntl(
        {
          locale: validLocale,
          messages: messages[validLocale] || messages[DEFAULT_LOCALE]
        },
        cache
      ),
    [validLocale]
  );

  return intl;
}
