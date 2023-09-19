import { createIntl, createIntlCache, useIntl, IntlContext } from 'react-intl';
import { messages } from '../localization';
import { useContext, useMemo } from 'react';
import { match } from '@formatjs/intl-localematcher';
import { createContext } from 'react';

export const DEFAULT_LOCALE = 'en';
const cache = createIntlCache();

export const I18nContext = createContext(IntlContext);

export default function useImperativeIntl() {
  const external = useContext(I18nContext);
  const locale = external?.locale || DEFAULT_LOCALE;
  const messagesLocale = findMatchingMessagesLocale(locale);

  return useMemo(
    () =>
      createIntl(
        {
          locale,
          messages: messages[messagesLocale]
        },
        cache
      ),
    [locale, messagesLocale]
  );
}

// AUX
function findMatchingMessagesLocale(locale) {
  const localeMatcher = match([locale], Object.keys(messages), DEFAULT_LOCALE);
  return localeMatcher ? localeMatcher : DEFAULT_LOCALE;
}
