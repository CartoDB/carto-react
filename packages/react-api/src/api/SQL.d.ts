import { Credentials, ExecuteSQL } from '../types';

export function executeSQL({
    credentials,
    query,
    connection,
    opts 
  }: {
    credentials: Credentials,
    query: string,
    connection?: string,
    opts?: unknown
  }): ExecuteSQL;