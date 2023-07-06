import en from './en';
import es from './es';
import id from './id';

import { flattenMessages } from './localeUtils';

const enFlat = flattenMessages(en);
const esFlat = flattenMessages(es);
const idFlat = flattenMessages(id);

export const messages = {
  en: enFlat,
  es: esFlat,
  id: idFlat
};
