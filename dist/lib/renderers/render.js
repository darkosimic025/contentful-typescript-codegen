"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var prettier_1 = require("prettier");
var renderAllLocales_1 = require("./contentful/renderAllLocales");
var renderContentfulImports_1 = require("./contentful/renderContentfulImports");
var renderContentType_1 = require("./contentful/renderContentType");
var renderContentTypeId_1 = require("./contentful/renderContentTypeId");
var renderDefaultLocale_1 = require("./contentful/renderDefaultLocale");
var renderLocalizedTypes_1 = require("./contentful/renderLocalizedTypes");
var renderNamespace_1 = require("./contentful/renderNamespace");
var renderUnion_1 = require("./typescript/renderUnion");
function render(contentTypes, locales, _a) {
    var _b = _a === void 0 ? {} : _a, namespace = _b.namespace, _c = _b.localization, localization = _c === void 0 ? false : _c;
    return __awaiter(this, void 0, void 0, function () {
        var sortedContentTypes, sortedLocales, typingsSource, source, prettierConfig;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    sortedContentTypes = contentTypes.sort(function (a, b) { return a.sys.id.localeCompare(b.sys.id); });
                    sortedLocales = locales.sort(function (a, b) { return a.code.localeCompare(b.code); });
                    typingsSource = [
                        renderAllContentTypes(sortedContentTypes, localization),
                        renderAllContentTypeIds(sortedContentTypes),
                        renderEntryType(sortedContentTypes),
                        renderAllLocales_1.default(sortedLocales),
                        renderDefaultLocale_1.default(sortedLocales),
                        renderLocalizedTypes_1.default(localization),
                    ].join("\n\n");
                    source = [
                        renderContentfulImports_1.default(localization, hasRichText(contentTypes)),
                        renderNamespace_1.default(typingsSource, namespace),
                    ].join("\n\n");
                    return [4 /*yield*/, prettier_1.resolveConfig(process.cwd())];
                case 1:
                    prettierConfig = _d.sent();
                    return [2 /*return*/, prettier_1.format(source, __assign(__assign({}, prettierConfig), { parser: "typescript" }))];
            }
        });
    });
}
exports.default = render;
function renderAllContentTypes(contentTypes, localization) {
    return contentTypes.map(function (contentType) { return renderContentType_1.default(contentType, localization); }).join("\n\n");
}
function renderAllContentTypeIds(contentTypes) {
    return renderUnion_1.default("CONTENT_TYPE", contentTypes.map(function (contentType) { return "'" + contentType.sys.id + "'"; }));
}
function renderEntryType(contentTypes) {
    return renderUnion_1.default("IEntry", contentTypes.map(function (contentType) { return renderContentTypeId_1.default(contentType.sys.id); }));
}
function hasRichText(contentTypes) {
    return contentTypes.some(function (sortedContentType) {
        return sortedContentType.fields.some(function (f) { return !f.omitted && f.type === "RichText"; });
    });
}
//# sourceMappingURL=render.js.map