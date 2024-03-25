import { Provider } from "@carto/react-core"

export type Fragment = {
  name: string,
  quoted: boolean
}
export type GetIdentifierOptions = {
  quoted?: boolean,
  safe?: boolean
}

export type GetObjectIdentifierOptions = GetIdentifierOptions & {
  suffix?: string
}

export enum ParsingMode {
  LeftToRight = 'leftToRight',
  RightToLeft = 'rightToLeft'
}

type IsValidOptions = {
  parsingMode?: ParsingMode
  quoted?: boolean
}

export class FullyQualifiedName {
  protected databaseFragment: Fragment | null
  protected schemaFragment: Fragment | null
  protected objectFragment: Fragment | null

  protected provider: Provider
  protected originalFQN: string
  protected parsingMode: ParsingMode

  static empty (provider: Provider, mode: ParsingMode): FullyQualifiedName

  constructor (fqn: string, provider: Provider, mode?: ParsingMode)

  public toString (): string

  public getDatabaseName<Safe extends boolean> (options: { quoted?: boolean, safe: Safe }): Safe extends true ? string | null : string
  public getDatabaseName (options?: GetIdentifierOptions): string
  public getDatabaseName (options?: GetIdentifierOptions): string | null

  public getSchemaName<Safe extends boolean> (options: { quoted?: boolean, safe: Safe }): Safe extends true ? string | null : string
  public getSchemaName (options?: GetIdentifierOptions): string
  public getSchemaName (options?: GetIdentifierOptions): string | null

  public getObjectName<Safe extends boolean> (options: { quoted?: boolean, safe: Safe, suffix?: string }): Safe extends true ? string | null : string
  public getObjectName (options?: GetObjectIdentifierOptions): string
  public getObjectName (options?: GetObjectIdentifierOptions): string | null | boolean

  public setDatabaseName (databaseName: string): void

  public setSchemaName (schemaName: string): void

  public setObjectName (objectName: string): void

  static isValid (fqn: string, provider: Provider, options?: IsValidOptions): boolean

  private _isValid (quoted: boolean): boolean

  private parseFQN (fqn: string): Array<Fragment | null>

  private getFragmentName (fragment: Fragment): string

  private quoteFragmentName (fragment: Fragment, suffix): string

  private unquoteFragmentName (fragment: Fragment, suffix): string

  private isQuotedName (name: string): boolean

  private quoteName (name: string): string

  private unquoteName (name: string, onlyDelimiters): string

  private quoteExternalIdentifier (identifier: string): string
}