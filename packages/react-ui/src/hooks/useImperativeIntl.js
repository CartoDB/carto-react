import { createIntl, createIntlCache } from 'react-intl';
import { messages } from '../localization';
import { useMemo } from 'react';
import {
  flattenMessages,
  findMatchingMessagesLocale,
  DEFAULT_LOCALE
} from '../localization/localeUtils';

const cache = createIntlCache();

export default function useImperativeIntl(intlConfig) {
  return useMemo(() => {
    const locale = intlConfig?.locale || DEFAULT_LOCALE;
    const messagesLocale = findMatchingMessagesLocale(locale, messages);
    const intMessages = {
      ...(intlConfig?.messages || {}),
      ...(messages[messagesLocale] || {})
    };

    return createIntl(
      {
        locale,
        messages: flattenMessages(intMessages)
      },
      cache
    );
  }, [intlConfig]);
}
