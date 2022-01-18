import { Credentials, ExecuteSQLResponse } from '../types';
import { FeatureCollection } from 'geojson';

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
