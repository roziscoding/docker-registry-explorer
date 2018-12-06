"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var blessed_1 = __importDefault(require("blessed"));
var main_1 = require("./windows/main");
process.on('unhandledRejection', function (reason, _promise) {
    console.error(reason);
    process.exit(1);
});
function readInputFactory(screen, prompt) {
    return function readPromptInput(text) {
        return new Promise(function (resolve, reject) {
            prompt.readInput(text, '', function (err, result) {
                if (err)
                    reject(err);
                resolve(result);
                prompt.hide();
                screen.render();
            });
        });
    };
}
(function () { return __awaiter(_this, void 0, void 0, function () {
    var screen, prompt, readPromptInput, login, _a, passowrd, _b, url, _c, mainWindow;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                screen = blessed_1.default.screen();
                screen.key(['escape', 'q', 'C-c'], function (_ch, _key) {
                    return process.exit(0);
                });
                prompt = blessed_1.default.prompt({
                    parent: screen,
                    top: 'center',
                    left: 'center',
                    width: '30%',
                    height: '20%',
                    border: {
                        type: 'line'
                    },
                    style: {
                        border: {
                            fg: 'white'
                        }
                    }
                });
                readPromptInput = readInputFactory(screen, prompt);
                _a = process.env.REGISTRY_LOGIN;
                if (_a) return [3, 2];
                return [4, readPromptInput('Registry login')];
            case 1:
                _a = (_d.sent());
                _d.label = 2;
            case 2:
                login = _a;
                _b = process.env.REGISTRY_PASSWORD;
                if (_b) return [3, 4];
                return [4, readPromptInput('Registry password')];
            case 3:
                _b = (_d.sent());
                _d.label = 4;
            case 4:
                passowrd = _b;
                _c = process.env.REGISTRY_URL;
                if (_c) return [3, 6];
                return [4, readPromptInput('Registry URL')];
            case 5:
                _c = (_d.sent());
                _d.label = 6;
            case 6:
                url = _c;
                mainWindow = new main_1.MainWindow(screen, login, passowrd, url);
                mainWindow.start();
                return [2];
        }
    });
}); })();
