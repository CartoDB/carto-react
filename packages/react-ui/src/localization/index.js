import en from './en';
import es from './es';

import { flattenMessages } from './localeUtils';

const enFlat = flattenMessages(en);
const esFlat = flattenMessages(es);

export const messages = {
  en: enFlat,
  es: esFlat
};
