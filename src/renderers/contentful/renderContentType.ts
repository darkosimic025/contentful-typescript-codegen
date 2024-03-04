import { ContentType, Field, FieldType, Sys } from "contentful"

import renderInterface from "../typescript/renderInterface"
import renderField from "./renderField"
import renderContentTypeId from "./renderContentTypeId"

import renderArray from "./fields/renderArray"
import renderBoolean from "./fields/renderBoolean"
import renderLink from "./fields/renderLink"
import renderLocation from "./fields/renderLocation"
import renderNumber from "./fields/renderNumber"
import renderObject from "./fields/renderObject"
import renderRichText from "./fields/renderRichText"
import renderSymbol from "./fields/renderSymbol"

export default function renderContentType(contentType: ContentType, localization: boolean): string {
  const name = renderContentTypeId(contentType.sys.id)
  const contentTypeFields = renderContentTypeFields(contentType.fields, localization)
  const sys = renderSys(contentType.sys)
  const fields = [sys, ...contentTypeFields].join("\n\n")

  return `
    ${descriptionComment(contentType.description)}

    ${renderInterface({ name: `${name}`, fields })}
  `
}

function descriptionComment(description: string | undefined) {
  if (description) {
    return `/** ${description} */`
  }

  return ""
}

function renderContentTypeFields(fields: Field[], localization: boolean): string[] {
  return fields
    .filter(field => !field.omitted)
    .map<string>(field => {
      const functionMap: Record<FieldType, (field: Field) => string> = {
        Array: renderArray,
        Boolean: renderBoolean,
        Date: renderSymbol,
        Integer: renderNumber,
        Link: renderLink,
        Location: renderLocation,
        Number: renderNumber,
        Object: renderObject,
        RichText: renderRichText,
        Symbol: renderSymbol,
        Text: renderSymbol,
      }

      return renderField(field, functionMap[field.type](field), localization)
    })
}

function renderSys(sys: Sys) {
  return `
    id: string;

    __typename: '${sys.id}';

    node_locale: string;

    createdAt: string;

    updatedAt?: string;
  `
}
