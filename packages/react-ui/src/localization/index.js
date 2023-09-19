import enUS from './en-US';
import esES from './es-ES';

import { flattenMessages } from './localeUtils';

const enUSFlat = flattenMessages(enUS);
const esESFlat = flattenMessages(esES);

export const messages = {
  'en-US': enUSFlat,
  'es-ES': esESFlat
};
