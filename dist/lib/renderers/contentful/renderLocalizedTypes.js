"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** renders helper types for --localization flag */
function renderLocalizedTypes(localization) {
    if (!localization)
        return null;
    return "\n    export type LocalizedField<T> = Partial<Record<LOCALE_CODE, T>>\n  \n    export interface Asset {\n        title: string\n        description: string\n        file: {\n          url: string\n          details: {\n            size: number\n            image?: {\n              width: number\n              height: number\n            }\n          }\n          fileName: string\n          contentType: string\n        }\n    }\n  ";
}
exports.default = renderLocalizedTypes;
//# sourceMappingURL=renderLocalizedTypes.js.map