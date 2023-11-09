import { SourceProps } from "@carto/react-api";
import { FiltersLogicalOperators, Provider, _FilterTypes } from "@carto/react-core";
import { SourceFilters } from "@carto/react-redux";
import { MAP_TYPES } from "@deck.gl/carto/typed";

export function isRemoteCalculationSupported(prop: { source: SourceProps }): boolean

export function sourceAndFiltersToSQL(props: { data: string, filters?: SourceFilters, filtersLogicalOperator?: FiltersLogicalOperators, provider: Provider, type: typeof MAP_TYPES }): string