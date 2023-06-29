import en from './en';

import { flattenMessages } from './localeUtils';

const enFlat = flattenMessages(en);

export const messages = {
  en: enFlat,
  // Custom messages from redux store
  custom: {}
};
