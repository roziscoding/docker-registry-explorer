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
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var blessed_1 = __importDefault(require("blessed"));
var MainWindow = (function () {
    function MainWindow(screen, login, password, baseUrl) {
        var _this = this;
        this.screen = screen;
        screen.key(['r', 'C-r'], function (_ch, _key) {
            _this.populateRepositories();
        });
        this.http = axios_1.default.create({
            baseURL: baseUrl + "/v2",
            headers: {
                Authorization: "Basic " + Buffer.from(login + ":" + password).toString('base64')
            }
        });
        this.repositoriesList = blessed_1.default.list({
            parent: screen,
            top: '0%',
            left: '0%',
            width: '20%',
            height: '100%',
            keys: true,
            border: {
                type: 'line'
            },
            style: {
                selected: {
                    bg: 'white',
                    fg: 'black'
                }
            }
        });
        this.repositoriesList.on("select", function (item, _index) {
            _this.populateTags(item.getText());
        });
        this.tagList = blessed_1.default.list({
            parent: screen,
            top: '0',
            left: '20%',
            width: '80%',
            height: '100%',
            keys: true,
            border: {
                type: 'line'
            },
            style: {
                selected: {
                    bg: 'white',
                    fg: 'black'
                }
            }
        });
        this.loading = blessed_1.default.loading({
            parent: screen,
            top: 'center',
            left: 'center',
            width: '30%',
            height: '20%'
        });
    }
    MainWindow.prototype.displayErrorAndExit = function (error) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                blessed_1.default.message({
                    parent: this.screen,
                    top: 'center',
                    left: 'center',
                    width: '30%',
                    height: '20%',
                    border: {
                        type: 'line'
                    },
                    style: {
                        border: {
                            fg: 'red'
                        }
                    }
                }).error(error, 0, function () { process.exit(1); });
                return [2];
            });
        });
    };
    MainWindow.prototype.populateRepositories = function () {
        return __awaiter(this, void 0, void 0, function () {
            var repositories, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.loading.load('Buscando repositórios');
                        this.repositoriesList.clearItems();
                        this.screen.render();
                        return [4, this.http.get('/_catalog')];
                    case 1:
                        repositories = (_a.sent()).data.repositories;
                        this.repositoriesList.setItems(repositories);
                        this.loading.stop();
                        this.screen.render();
                        return [3, 3];
                    case 2:
                        err_1 = _a.sent();
                        this.displayErrorAndExit(err_1.message);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    MainWindow.prototype.populateTags = function (repositoryName) {
        return __awaiter(this, void 0, void 0, function () {
            var tags, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.loading.load('Buscando tags');
                        this.tagList.clearItems();
                        this.screen.render();
                        return [4, this.http.get("/" + repositoryName + "/tags/list")];
                    case 1:
                        tags = (_a.sent()).data.tags;
                        this.tagList.setItems(tags);
                        this.loading.stop();
                        this.screen.render();
                        return [3, 3];
                    case 2:
                        err_2 = _a.sent();
                        this.displayErrorAndExit(err_2.message);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    MainWindow.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.repositoriesList.focus();
                        return [4, this.populateRepositories()];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    return MainWindow;
}());
exports.MainWindow = MainWindow;
