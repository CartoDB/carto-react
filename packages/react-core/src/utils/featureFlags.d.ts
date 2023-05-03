export enum Flags {
    DYNAMIC_TILING_V2 = '2023-dynamic-tiling-v-2'
}
export function setFlags(flags: Record<string, any> | string[]): void
export function clearFlags(): void
export function hasFlag(flag: string): boolean
