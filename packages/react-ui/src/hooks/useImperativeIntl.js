import { createIntl, createIntlCache } from 'react-intl';
import { messages } from '../localization';
import { useMemo } from 'react';
import {
  flattenMessages,
  findMatchingMessagesLocale,
  DEFAULT_LOCALE
} from '../localization/localeUtils';

const cache = createIntlCache();
const intlInstanceCache = new WeakMap();

const createIntlInstance = (intlConfig) => {
  const locale = intlConfig?.locale || DEFAULT_LOCALE;
  const messagesLocale = findMatchingMessagesLocale(locale, messages);
  const intMessages = {
    ...(messages[messagesLocale] || {}),
    ...(intlConfig?.messages || {})
  };

  const combinedMessages = flattenMessages(intMessages);
  return createIntl(
    {
      locale,
      messages: combinedMessages
    },
    cache
  );
};

const getGloballyCachedIntl = (intlConfig) => {
  // This is very simple cache exploits fact that Intl instance is actually same for most of time
  // so we can reuse those maps across several instances of same components
  // note, useMemo can't cache accross many that globally and flattenMessages over _app_ and c4r messages is quite costly
  // and would be paid for every c4r component mounted.
  let cachedInstance = intlInstanceCache.get(intlConfig);
  if (cachedInstance) {
    return cachedInstance;
  }
  const newInstance = createIntlInstance(intlConfig);
  intlInstanceCache.set(intlConfig, newInstance);
  return newInstance;
};

export default function useImperativeIntl(intlConfig) {
  return getGloballyCachedIntl(intlConfig);
}
