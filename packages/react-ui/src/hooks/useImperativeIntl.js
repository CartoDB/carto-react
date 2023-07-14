import { IntlContext, createIntl, createIntlCache, useIntl } from 'react-intl';
import { messages } from '../localization';
import { useContext, useMemo } from 'react';
import { match } from '@formatjs/intl-localematcher';

export const DEFAULT_LOCALE = 'en-US';
const cache = createIntlCache();

// TODO: Pending to get external intl provider

export default function useImperativeIntl() {
  const extenal = useIntl();
  console.log('useImperativeIntl', extenal);
  // TODO: External intl
  const externalIntl = useContext(IntlContext);
  console.log('findMatchingMessagesLocale', externalIntl);

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
