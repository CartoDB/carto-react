import { createIntl, createIntlCache } from 'react-intl';
import { messages } from '../localization';
import { useMemo } from 'react';

const DEFAULT_LANGUAGE = 'en';
const cache = createIntlCache();
/**
 * React hook to handle custom locale messages to override default ones
 * @param {object} localizationMessages
 */
export default function useLocale(localizationMessages) {
  const intl = useMemo(
    () =>
      createIntl(
        {
          locale: DEFAULT_LANGUAGE,
          messages: localizationMessages || messages[DEFAULT_LANGUAGE]
        },
        cache
      ),
    [localizationMessages]
  );

  return intl;
}
