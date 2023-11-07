/** renders helper types for --localization flag */
export default function renderLocalizedTypes(localization: boolean) {
  if (!localization) return null

  return `
    export type LocalizedField<T> = Partial<Record<LOCALE_CODE, T>>
  
    export interface Asset {
        title: string
        description: string
        file: {
          url: string
          details: {
            size: number
            image?: {
              width: number
              height: number
            }
          }
          fileName: string
          contentType: string
        }
    }
  `
}
