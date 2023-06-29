import { createIntl, createIntlCache } from 'react-intl';
import { messages } from '../localization';
import { useMemo } from 'react';

/**
 * React hook to handle custom locale messages to override default ones
 * @param {object} localizationMessages
 */
export default function useLocale(localizationMessages) {
  const cache = createIntlCache();
  const intl = useMemo(
    () =>
      createIntl(
        {
          locale: 'en',
          messages: localizationMessages || messages['en']
        },
        cache
      ),
    [localizationMessages, cache]
  );

  return intl;
}
