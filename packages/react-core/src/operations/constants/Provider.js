/**
 * Enum for the different connections providers
 * @enum {string}
 * @readonly
 */
export const Provider = Object.freeze({
  BigQuery: 'bigquery',
  Redshift: 'redshift',
  Postgres: 'postgres',
  Snowflake: 'snowflake',
  Databricks: 'databricks',
  DatabricksRest: 'databricksRest'
});
