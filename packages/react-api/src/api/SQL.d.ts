import { Credentials } from '../types';
import { FeatureCollection } from 'geojson';

export type ExecuteSQLResponse<Response = FeatureCollection | {}[]> = Promise<Response>;

export function executeSQL<Response = FeatureCollection | {}[]>({
  credentials,
  query,
  connection,
  opts
}: {
  credentials: Credentials;
  query: string;
  connection?: string;
  opts?: unknown;
}): ExecuteSQLResponse<Response>;
