import { createIntl, createIntlCache } from 'react-intl';
import { messages } from '../localization';
import { useMemo } from 'react';
import { match } from '@formatjs/intl-localematcher';
import { flattenMessages } from '../localization/localeUtils';

export const DEFAULT_LOCALE = 'en';
const cache = createIntlCache();

export default function useImperativeIntl(intlConfig) {
  const locale = intlConfig?.locale || DEFAULT_LOCALE;
  const messagesLocale = findMatchingMessagesLocale(locale);
  const intMessages = intlConfig?.messages
    ? flattenMessages(intlConfig?.messages)
    : messages[messagesLocale];

  return useMemo(
    () =>
      createIntl(
        {
          locale,
          messages: intMessages
        },
        cache
      ),
    [locale, intMessages]
  );
}

// AUX
function findMatchingMessagesLocale(locale) {
  const localeMatcher = match([locale], Object.keys(messages), DEFAULT_LOCALE);
  console.log(localeMatcher);
  return localeMatcher ? localeMatcher : DEFAULT_LOCALE;
}
