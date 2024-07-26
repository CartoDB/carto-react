import { createIntl, createIntlCache } from 'react-intl';
import { messages } from '../localization';
import {
  flattenMessages,
  findMatchingMessagesLocale,
  DEFAULT_LOCALE
} from '../localization/localeUtils';

const cache = createIntlCache();

let lastIntlConfig;
let cachedC4rIntl;

export default function useImperativeIntl(intlConfig) {
  if (!cachedC4rIntl || lastIntlConfig !== intlConfig) {
    // this is very naive cache that bases on fact that Intl instance is actually same for most of time
    // so we can reuse those maps across several instances of same components
    // note, useMemo can't do that globally and flattenMessages over _app_ and c4r is quite costly and would
    // be paid for evey c4r component mounted
    const locale = intlConfig?.locale || DEFAULT_LOCALE;
    const messagesLocale = findMatchingMessagesLocale(locale, messages);
    const intMessages = {
      ...(messages[messagesLocale] || {}),
      ...(intlConfig?.messages || {})
    };

    const combinedMessages = flattenMessages(intMessages);
    cachedC4rIntl = createIntl(
      {
        locale,
        messages: combinedMessages
      },
      cache
    );
    lastIntlConfig = intlConfig;
  }
  return cachedC4rIntl;
}
