import { IntlContext, createIntl, createIntlCache } from 'react-intl';
import { messages } from '../localization';
import { createContext, useContext, useMemo } from 'react';
import { match } from '@formatjs/intl-localematcher';

export const DEFAULT_LOCALE = 'en-US';
const cache = createIntlCache();

// TODO: External intl
const I18nContext = createContext(IntlContext);

export default function useImperativeIntl() {
  // TODO: External intl
  const externalIntl = useContext(I18nContext);
  // @ts-ignore
  const locale = externalIntl?.locale || DEFAULT_LOCALE;
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
