import { Credentials } from '../types';

export function executeSQL(
  credentials: Credentials,
  query: string,
  opts?: {
    format: '' | 'geojson'
  }
): Promise<{} | []>