import renderContentType from "../../../src/renderers/contentful/renderContentType"
import { ContentType, Sys } from "contentful"
import format from "../../support/format"

describe("renderContentType()", () => {
  const contentType: ContentType = {
    sys: {
      id: "myContentType",
    } as Sys,
    fields: [
      {
        id: "symbolField",
        name: "Symbol Field™",
        required: false,
        validations: [],
        disabled: false,
        omitted: false,
        localized: false,
        type: "Symbol",
      },
      {
        id: "arrayField",
        name: "Array field",
        required: true,
        validations: [{}],
        items: {
          type: "Symbol",
          validations: [
            {
              in: ["one", "of", "the", "above"],
            },
          ],
        },
        disabled: false,
        omitted: false,
        localized: false,
        type: "Array",
      },
    ],
    description: "",
    displayField: "",
    name: "",
    toPlainObject: () => ({} as ContentType),
  }

  const contentTypeWithDescription: ContentType = {
    sys: {
      id: "myContentType",
    } as Sys,
    fields: [],
    description: "This is a description",
    displayField: "",
    name: "",
    toPlainObject: () => ({} as ContentType),
  }

  it("works with miscellaneous field types", () => {
    expect(format(renderContentType(contentType, false))).toMatchInlineSnapshot(`
      "export interface ContentfulMyContentType {
        id: string;

        __typename: \\"myContentType\\";

        node_locale: string;

        createdAt: string;

        updatedAt?: string;

        /** Symbol Field™ */
        symbolField?: string | undefined;

        /** Array field */
        arrayField: (\\"one\\" | \\"of\\" | \\"the\\" | \\"above\\")[];
      }"
    `)
  })

  it("supports descriptions", () => {
    expect(format(renderContentType(contentTypeWithDescription, false))).toMatchInlineSnapshot(`
      "/** This is a description */

      export interface ContentfulMyContentType {
        id: string;

        __typename: \\"myContentType\\";

        node_locale: string;

        createdAt: string;

        updatedAt?: string;
      }"
    `)
  })

  it("works with localized fields", () => {
    expect(format(renderContentType(contentType, true))).toMatchInlineSnapshot(`
      "export interface ContentfulMyContentType {
        id: string;

        __typename: \\"myContentType\\";

        node_locale: string;

        createdAt: string;

        updatedAt?: string;

        /** Symbol Field™ */
        symbolField?: LocalizedField<string> | undefined;

        /** Array field */
        arrayField: LocalizedField<(\\"one\\" | \\"of\\" | \\"the\\" | \\"above\\")[]>;
      }"
    `)
  })
})
