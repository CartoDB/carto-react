import { Credentials, ExecuteSQLResponse, QueryParameter } from '../types';
import { FeatureCollection } from 'geojson';

export function executeSQL<Response = FeatureCollection | {}[]>({
  credentials,
  query,
  connection,
  opts,
  queryParameters
}: {
  credentials: Credentials;
  query: string;
  connection?: string;
  opts?: unknown;
  queryParameters?: QueryParameter[];
}): ExecuteSQLResponse<Response>;
