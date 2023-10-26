// Default client
import { version } from '../../package.json';
let client = `c4react:${version}`;

export function getClient() {
  return client;
}

export function setClient(c) {
  client = c;
}
