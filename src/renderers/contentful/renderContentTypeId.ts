import { upperFirst, camelCase } from "lodash"

export default function renderContentTypeId(contentTypeId: string): string {
  return "Contentful" + upperFirst(camelCase(contentTypeId))
}
