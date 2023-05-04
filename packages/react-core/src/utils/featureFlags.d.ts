export enum Flags {
  REMOTE_WIDGETS = '2023-remote-widgets'
}
export function setFlags(flags: Record<string, any> | string[]): void
export function clearFlags(): void
export function hasFlag(flag: string): boolean
