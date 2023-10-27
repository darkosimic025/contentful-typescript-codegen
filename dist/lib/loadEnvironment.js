"use strict";
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
exports.loadEnvironment = void 0;
var path = require("path");
var fs = require("fs");
function loadEnvironment() {
    return __awaiter(this, void 0, void 0, function () {
        var getEnvironment, environment, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, , 4, 5]);
                    getEnvironment = getEnvironmentGetter();
                    return [4 /*yield*/, getEnvironment()];
                case 1:
                    environment = _b.sent();
                    _a = {};
                    return [4 /*yield*/, environment.getContentTypes({ limit: 1000 })];
                case 2:
                    _a.contentTypes = (_b.sent());
                    return [4 /*yield*/, environment.getLocales()];
                case 3: return [2 /*return*/, (_a.locales = (_b.sent()),
                        _a)];
                case 4:
                    if (registerer) {
                        registerer.enabled(false);
                    }
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.loadEnvironment = loadEnvironment;
/* istanbul ignore next */
var interopRequireDefault = function (obj) {
    return obj && obj.__esModule ? obj : { default: obj };
};
var registerer = null;
function enableTSNodeRegisterer() {
    if (registerer) {
        registerer.enabled(true);
        return;
    }
    try {
        registerer = require("ts-node").register();
        registerer.enabled(true);
    }
    catch (e) {
        if (e.code === "MODULE_NOT_FOUND") {
            throw new Error("'ts-node' is required for TypeScript configuration files. Make sure it is installed\nError: " + e.message);
        }
        throw e;
    }
}
function determineEnvironmentPath() {
    var pathWithoutExtension = path.resolve(process.cwd(), "./getContentfulEnvironment");
    if (fs.existsSync(pathWithoutExtension + ".ts")) {
        return pathWithoutExtension + ".ts";
    }
    return pathWithoutExtension + ".js";
}
function getEnvironmentGetter() {
    var getEnvironmentPath = determineEnvironmentPath();
    if (getEnvironmentPath.endsWith(".ts")) {
        enableTSNodeRegisterer();
        return interopRequireDefault(require(getEnvironmentPath)).default;
    }
    return require(getEnvironmentPath);
}
//# sourceMappingURL=loadEnvironment.js.map