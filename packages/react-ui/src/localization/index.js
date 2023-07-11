import enUS from './enUS';
import esES from './esES';
import idID from './idID';

import { flattenMessages } from './localeUtils';

const enUSFlat = flattenMessages(enUS);
const esESFlat = flattenMessages(esES);
const idIDFlat = flattenMessages(idID);

export const messages = {
  enUS: enUSFlat,
  esES: esESFlat,
  idID: idIDFlat
};
