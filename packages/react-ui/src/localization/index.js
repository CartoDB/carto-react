import enUS from './en-US';
import esES from './es-ES';
import idID from './id-ID';

import { flattenMessages } from './localeUtils';

const enUSFlat = flattenMessages(enUS);
const esESFlat = flattenMessages(esES);
const idIDFlat = flattenMessages(idID);

export const messages = {
  'en-US': enUSFlat,
  'es-ES': esESFlat,
  'id-ID': idIDFlat
};
