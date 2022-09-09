/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/api/src/app/app.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const app_service_1 = __webpack_require__("./apps/api/src/app/app.service.ts");
const app_config_service_1 = __webpack_require__("./apps/api/src/app/config/app-config.service.ts");
let AppController = class AppController {
    constructor(appService, appConfigService) {
        this.appService = appService;
        this.appConfigService = appConfigService;
        const config = this.appConfigService.getConfig();
    }
    getApiInfos() {
        return app_service_1.AppService.availableRoutes;
    }
};
tslib_1.__decorate([
    (0, common_1.Get)("/"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Array)
], AppController.prototype, "getApiInfos", null);
AppController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object, typeof (_b = typeof app_config_service_1.AppConfigService !== "undefined" && app_config_service_1.AppConfigService) === "function" ? _b : Object])
], AppController);
exports.AppController = AppController;


/***/ }),

/***/ "./apps/api/src/app/app.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const app_controller_1 = __webpack_require__("./apps/api/src/app/app.controller.ts");
const app_service_1 = __webpack_require__("./apps/api/src/app/app.service.ts");
const config_1 = __webpack_require__("@nestjs/config");
const app_config_module_1 = __webpack_require__("./apps/api/src/app/config/app-config.module.ts");
const app_file_module_1 = __webpack_require__("./apps/api/src/app/files/app-file.module.ts");
const path_1 = __webpack_require__("path");
const serve_static_1 = __webpack_require__("@nestjs/serve-static");
const app_thumbs_module_1 = __webpack_require__("./apps/api/src/app/thumbs/app-thumbs.module.ts");
const app_viewer_module_1 = __webpack_require__("./apps/api/src/app/viewer/app-viewer.module.ts");
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            app_config_module_1.AppConfigModule,
            app_file_module_1.AppFileModule,
            app_thumbs_module_1.AppThumbsModule,
            app_viewer_module_1.AppViewerModule,
            serve_static_1.ServeStaticModule.forRoot({
                exclude: ['/api/*'],
                rootPath: (0, path_1.join)(__dirname, "./assets")
            }),
            common_1.CacheModule.register({
                ttl: 60,
                max: 10,
                isGlobal: true,
            })
        ],
        controllers: [
            app_controller_1.AppController
        ],
        providers: [
            app_service_1.AppService,
            config_1.ConfigService,
            // {
            //   provide: APP_INTERCEPTOR,
            //   useClass: ErrorInterceptor
            // }
        ]
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),

/***/ "./apps/api/src/app/app.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
let AppService = class AppService {
};
AppService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], AppService);
exports.AppService = AppService;


/***/ }),

/***/ "./apps/api/src/app/common/convert-img/app-convert-img.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppConvertImgModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const config_1 = __webpack_require__("@nestjs/config");
const configuration_1 = __webpack_require__("./apps/api/src/config/configuration.ts");
const app_file_util_module_1 = __webpack_require__("./apps/api/src/app/common/file/app-file-util.module.ts");
const app_convert_img_service_1 = __webpack_require__("./apps/api/src/app/common/convert-img/app-convert-img.service.ts");
const app_config_module_1 = __webpack_require__("./apps/api/src/app/config/app-config.module.ts");
let AppConvertImgModule = class AppConvertImgModule {
};
AppConvertImgModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                load: [configuration_1.default]
            }),
            app_config_module_1.AppConfigModule,
            app_file_util_module_1.AppFileUtilModule
        ],
        providers: [
            app_convert_img_service_1.AppConvertImgService
        ],
        exports: [
            app_convert_img_service_1.AppConvertImgService
        ]
    })
], AppConvertImgModule);
exports.AppConvertImgModule = AppConvertImgModule;


/***/ }),

/***/ "./apps/api/src/app/common/convert-img/app-convert-img.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppConvertImgService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const child_process = __webpack_require__("child_process");
const app_resize_img_options_1 = __webpack_require__("./apps/api/src/app/common/convert-img/data/app-resize-img-options.ts");
const exec = child_process.exec;
let AppConvertImgService = class AppConvertImgService {
    resizeImgSync(imgSource, imgTarget = imgSource, options = new app_resize_img_options_1.ResizeImgOptions()) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                this.resizeImg(imgSource, imgTarget, options, (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(result);
                    }
                });
            });
        });
    }
    resizeImg(imgSource, imgTarget = imgSource, options = new app_resize_img_options_1.ResizeImgOptions(), callback) {
        // imgSource must be copied already  from tmp directory to target folder!
        var _a, _b, _c;
        const gmExecutable = (_a = options.gmExecutable) !== null && _a !== void 0 ? _a : "gm";
        const width = (_b = options.width) !== null && _b !== void 0 ? _b : "200";
        const height = (_c = options.height) !== null && _c !== void 0 ? _c : "300";
        const buf = [];
        buf.push("\"");
        buf.push(gmExecutable);
        buf.push("\" ");
        buf.push(" convert \"");
        buf.push(imgSource);
        buf.push("\" -resize ");
        buf.push(width);
        buf.push("x");
        buf.push(height);
        buf.push(" \"");
        buf.push(imgTarget);
        buf.push("\"");
        const command = buf.join("");
        exec(command, (err, stdout, stderr) => {
            if (err) {
                common_1.Logger.error("Error:", err);
            }
            else {
                common_1.Logger.log("File saved.", imgTarget);
            }
            callback(err, imgTarget);
        });
    }
};
AppConvertImgService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], AppConvertImgService);
exports.AppConvertImgService = AppConvertImgService;


/***/ }),

/***/ "./apps/api/src/app/common/convert-img/data/app-resize-img-options.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResizeImgOptions = void 0;
class ResizeImgOptions {
    constructor(gmExecutable = "gm", width = 200, height = 300) {
        this.gmExecutable = gmExecutable;
        this.width = width;
        this.height = height;
    }
}
exports.ResizeImgOptions = ResizeImgOptions;


/***/ }),

/***/ "./apps/api/src/app/common/file/app-file-util.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppFileUtilModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const app_file_util_service_1 = __webpack_require__("./apps/api/src/app/common/file/app-file-util.service.ts");
let AppFileUtilModule = class AppFileUtilModule {
};
AppFileUtilModule = tslib_1.__decorate([
    (0, common_1.Module)({
        providers: [
            app_file_util_service_1.AppFileUtilService
        ],
        exports: [
            app_file_util_service_1.AppFileUtilService
        ]
    })
], AppFileUtilModule);
exports.AppFileUtilModule = AppFileUtilModule;


/***/ }),

/***/ "./apps/api/src/app/common/file/app-file-util.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppFileUtilService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const path = __webpack_require__("path");
const fs = __webpack_require__("fs-extra");
let AppFileUtilService = class AppFileUtilService {
    readDirs(dir, fileSuffixes) {
        // if (!fs.existsSync(dir)) {
        //   return [];
        // }
        const dirs = [dir];
        const allItems = [];
        while (dirs.length) {
            const dir = dirs.pop();
            const ffs = fs.readdirSync(dir);
            ffs.forEach(f => {
                const f2 = path.join(dir, f);
                const stats2 = fs.statSync(f2);
                if (stats2.isDirectory()) {
                    dirs.push(f2);
                }
                else {
                    const dir = path.dirname(f2);
                    const base = path.basename(f2);
                    const ext = path.extname(f2);
                    if (fileSuffixes.includes(ext)) {
                        allItems.push(path.join(dir, base));
                    }
                }
            });
        }
        const ret = allItems
            .map(f => f.replace(/[\\]+/g, "/")) // c:\\user\abc -> c:/user/abs
            .map(f => f.replace(dir, "")) // we will cut off the (base) dir
            .sort();
        return ret;
    }
};
AppFileUtilService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], AppFileUtilService);
exports.AppFileUtilService = AppFileUtilService;


/***/ }),

/***/ "./apps/api/src/app/common/unpack/app-unpack.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppUnpackModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const config_1 = __webpack_require__("@nestjs/config");
const configuration_1 = __webpack_require__("./apps/api/src/config/configuration.ts");
const app_file_util_module_1 = __webpack_require__("./apps/api/src/app/common/file/app-file-util.module.ts");
const app_unpack_service_1 = __webpack_require__("./apps/api/src/app/common/unpack/app-unpack.service.ts");
const app_config_module_1 = __webpack_require__("./apps/api/src/app/config/app-config.module.ts");
let AppUnpackModule = class AppUnpackModule {
};
AppUnpackModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                load: [configuration_1.default]
            }),
            app_config_module_1.AppConfigModule,
            app_file_util_module_1.AppFileUtilModule
        ],
        providers: [
            app_unpack_service_1.AppUnpackService
        ],
        exports: [
            app_unpack_service_1.AppUnpackService
        ]
    })
], AppUnpackModule);
exports.AppUnpackModule = AppUnpackModule;


/***/ }),

/***/ "./apps/api/src/app/common/unpack/app-unpack.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var AppUnpackService_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppUnpackService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const child_process = __webpack_require__("child_process");
const path = __webpack_require__("path");
const os = __webpack_require__("os");
const app_unpack_options_1 = __webpack_require__("./apps/api/src/app/common/unpack/data/app-unpack-options.ts");
const exec = child_process.exec;
// TODO https://github.com/krocon/node-unpack-all/blob/master/postinstall.mjs
let AppUnpackService = AppUnpackService_1 = class AppUnpackService {
    constructor() {
        this.exec = child_process.exec;
    }
    listSync(archiveFile, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                this.list(archiveFile, options, (err, files, _) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(files);
                    }
                });
            });
        });
    }
    unpackSync(archiveFile, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                this.unpack(archiveFile, options, (err, files, _) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(files);
                    }
                });
            });
        });
    }
    unpack(archiveFile, options, callback) {
        var _a, _b, _c, _d;
        if (!archiveFile) {
            throw new Error("Error: archiveFile is missing.");
        }
        if (!callback) {
            callback = this.defaultListCallback;
        }
        options = Object.assign(Object.assign({}, new app_unpack_options_1.UnpackOptions()), (options !== null && options !== void 0 ? options : {}));
        // Unar command:
        const unar = (_a = options.unar) !== null && _a !== void 0 ? _a : "unar";
        const ar = [unar];
        // Archive file (source):
        ar.push("SOURCEFILE");
        // -output-directory (-o) <string>: The directory to write the contents of the archive to. Defaults to the current directory.
        ar.push("-o");
        let targetDir = (_b = options.targetDir) !== null && _b !== void 0 ? _b : path.join(os.tmpdir(), "tmp");
        if (options.randomTargetSubDir) {
            targetDir = targetDir + "/t" + Date.now();
        }
        ar.push(targetDir);
        // -force-overwrite (-f): Always overwrite files when a file to be unpacked already exists on disk. By default, the program asks the user if possible, otherwise skips the file.
        if (options.forceOverwrite) {
            ar.push("-f");
        }
        // -force-rename (-r): Always rename files when a file to be unpacked already exists on disk.
        if (options.forceRename) {
            ar.push("-r");
        }
        // -force-skip (-s): Always skip files when a file to be unpacked already exists on disk.
        if (options.forceSkip) {
            ar.push("-s");
        }
        // -force-directory (-d): Always create a containing directory for the contents of the unpacked archive. By default, a directory is created if there is more than one top-level file or folder.
        if (options.forceDirectory) {
            ar.push("-d");
        }
        // -no-directory (-D): Never create a containing directory for the contents of the unpacked archive.
        if (options.noDirectory) {
            ar.push("-D");
        }
        // -no-recursion (-nr): Do not attempt to extract archives contained in other archives. For instance, when unpacking a .tar.gz file, only unpack the .gz file and not its contents.
        if (options.noRecursion) {
            ar.push("-nr");
        }
        // -copy-time (-t): Copy the file modification time from the archive file to the containing directory, if one is created.
        if (options.copyTime) {
            ar.push("-t");
        }
        // -quiet (-q): Run in quiet mode.
        if (options.quiet) {
            ar.push("-q");
        }
        // -password (-p) <string>: The password to use for decrypting protected archives.
        if (options.password) {
            ar.push("-p");
            ar.push(options.password);
        }
        // -password-encoding (-E) <name>: The encoding to use for the password for the archive, when it is not known. If not specified, then either the encoding given by the -encoding option or the auto-detected encoding is used.
        if (options.passwordEncoding) {
            ar.push("-E");
            ar.push(options.passwordEncoding);
        }
        // -encoding (-e) <encoding name>: The encoding to use for filenames in the archive, when it is not known. If not specified, the program attempts to auto-detect the encoding used. Use "help" or "list" as the argument to give
        if (options.encoding) {
            ar.push("-e");
            ar.push(options.encoding);
        }
        if ((_c = options.indexes) === null || _c === void 0 ? void 0 : _c.length) {
            // -indexes (-i): Instead of specifying the files to unpack as filenames or wildcard patterns, specify them as indexes, as output by lsar.
            options.indexes.forEach(idx => {
                ar.push("-i");
                ar.push("" + idx); // string!
            });
        }
        else if ((_d = options.files) === null || _d === void 0 ? void 0 : _d.length) {
            options.files.forEach(s => {
                ar.push(s);
            });
        }
        if (!options.quiet)
            common_1.Logger.log("command", this.quote(ar));
        const cmd = this.quote(ar).replace("SOURCEFILE", this.escapeFileName(archiveFile));
        if (!options.quiet)
            common_1.Logger.log("cmd", cmd);
        exec(cmd, (err, stdout, stderr) => {
            if (err) {
                return callback(err.name, null, "");
            }
            if (stderr && stderr.length > 0) {
                return callback("Error: " + stderr, null, "");
            }
            if (stdout && stdout.length > 0) {
                if (stdout.indexOf("No files extracted") > -1) {
                    return callback("Error: No files extracted", null, "");
                }
            }
            if (targetDir) {
                callback(null, [targetDir], stdout);
            }
        });
    }
    list(archiveFile, options, callback) {
        var _a;
        if (!archiveFile) {
            throw new Error("Error: archiveFile is missing.");
        }
        if (!callback) {
            callback = this.defaultListCallback;
        }
        options = Object.assign(Object.assign({}, new app_unpack_options_1.UnpackOptions()), (options !== null && options !== void 0 ? options : {}));
        // Unar command:
        const lsar = (_a = options.lsar) !== null && _a !== void 0 ? _a : "lsar";
        const ar = [lsar];
        // Archive file (source):
        ar.push("SOURCEFILE");
        // -no-recursion (-nr): Do not attempt to extract archives contained in other archives. For instance, when unpacking a .tar.gz file, only unpack the .gz file and not its contents.
        if (options.noRecursion) {
            ar.push("-nr");
        }
        // -password (-p) <string>: The password to use for decrypting protected archives.
        if (options.password) {
            ar.push("-p");
            ar.push(options.password);
        }
        // -password-encoding (-E) <name>: The encoding to use for the password for the archive, when it is not known. If not specified, then either the encoding given by the -encoding option or the auto-detected encoding is used.
        if (options.passwordEncoding) {
            ar.push("-E");
            ar.push(options.passwordEncoding);
        }
        // -encoding (-e) <encoding name>: The encoding to use for filenames in the archive, when it is not known. If not specified, the program attempts to auto-detect the encoding used. Use "help" or "list" as the argument to give
        if (options.encoding) {
            ar.push("-e");
            ar.push(options.encoding);
        }
        // -print-encoding (-pe): Print the auto-detected encoding and the confidence factor after the file list
        if (options.printEncoding) {
            ar.push("-pe");
            ar.push(options.printEncoding);
        }
        // -json (-j): Print the listing in JSON format.
        if (options.json) {
            ar.push("-j");
        }
        // -json-ascii (-ja): Print the listing in JSON format, encoded as pure ASCII text.
        if (options.jsonAscii) {
            ar.push("-ja");
        }
        const cmd = this.quote(ar).replace("SOURCEFILE", this.escapeFileName(archiveFile));
        if (!options.quiet) {
            common_1.Logger.log("cmd", cmd);
        }
        exec(cmd, (err, stdout, stderr) => {
            if (err) {
                return callback(err.name, null, "");
            }
            if (stderr && stderr.length > 0) {
                return callback("Error: " + stderr, null, "");
            }
            const lines = stdout.split(/(\r?\n)/g);
            if (lines.length > 0) {
                const files = lines.filter(this.defaultListFilter.bind(this));
                return callback(null, files, "");
            }
            else {
                return callback("Error: no files found in archive. " + stderr, null, "");
            }
        });
    }
    escapeFileName(s) {
        return "\"" + s + "\"";
    }
    defaultListCallback(err, _files, _text) {
        if (err) {
            return common_1.Logger.error(err);
        }
    }
    isInt(x) {
        return !isNaN(x) && eval(x).toString().length === parseInt(eval(x)).toString().length;
    }
    defaultListFilter(s) {
        return !!(s && s !== ""
            && s.indexOf("\r") === -1
            && s.indexOf("\n") === -1
            && !s.includes(': ')
            && !s.match(AppUnpackService_1.archiveTypePattern));
    }
    quote(xs) {
        return xs.map(s => {
            if (s && typeof s === "object") {
                return s.op.replace(/(.)/g, "\\$1");
            }
            if (/["\s]/.test(s) && !/'/.test(s)) {
                return "'" + s.replace(/(['\\])/g, "\\$1") + "'";
            }
            if (/["'\s]/.test(s)) {
                return "\"" + s.replace(/(["\\$`!])/g, "\\$1") + "\"";
            }
            return String(s).replace(/([A-Za-z]:)?([#!"$&'()*,:;<=>?@\[\\\]^`{|}])/g, "$1\\$2");
        }).join(" ");
    }
};
AppUnpackService.archiveTypePattern = /: [A-Z,7]*$/g;
AppUnpackService = AppUnpackService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)()
], AppUnpackService);
exports.AppUnpackService = AppUnpackService;


/***/ }),

/***/ "./apps/api/src/app/common/unpack/data/app-unpack-options.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UnpackOptions = void 0;
class UnpackOptions {
    constructor(callback = undefined, targetDir = "", unar = "unar", randomTargetSubDir = "", forceOverwrite = true, forceRename = true, forceSkip = true, forceDirectory = true, noDirectory = true, noRecursion = true, copyTime = true, quiet = true, password = "", passwordEncoding = "", encoding = "", indexes = [], files = []) {
        this.callback = callback;
        this.targetDir = targetDir;
        this.unar = unar;
        this.randomTargetSubDir = randomTargetSubDir;
        this.forceOverwrite = forceOverwrite;
        this.forceRename = forceRename;
        this.forceSkip = forceSkip;
        this.forceDirectory = forceDirectory;
        this.noDirectory = noDirectory;
        this.noRecursion = noRecursion;
        this.copyTime = copyTime;
        this.quiet = quiet;
        this.password = password;
        this.passwordEncoding = passwordEncoding;
        this.encoding = encoding;
        this.indexes = indexes;
        this.files = files;
    }
}
exports.UnpackOptions = UnpackOptions;


/***/ }),

/***/ "./apps/api/src/app/config/app-config.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppConfigController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const app_config_service_1 = __webpack_require__("./apps/api/src/app/config/app-config.service.ts");
const config_1 = __webpack_require__("./libs/config/src/index.ts");
let AppConfigController = class AppConfigController {
    constructor(appConfigService) {
        this.appConfigService = appConfigService;
    }
    getConfig() {
        return this.appConfigService.getConfig();
    }
};
tslib_1.__decorate([
    (0, common_1.UseInterceptors)(common_1.CacheInterceptor),
    (0, common_1.CacheKey)('config'),
    (0, common_1.CacheTTL)(120),
    (0, common_1.Get)("config"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_a = typeof config_1.ConfigIf !== "undefined" && config_1.ConfigIf) === "function" ? _a : Object)
], AppConfigController.prototype, "getConfig", null);
AppConfigController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof app_config_service_1.AppConfigService !== "undefined" && app_config_service_1.AppConfigService) === "function" ? _b : Object])
], AppConfigController);
exports.AppConfigController = AppConfigController;


/***/ }),

/***/ "./apps/api/src/app/config/app-config.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppConfigModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const config_1 = __webpack_require__("@nestjs/config");
const configuration_1 = __webpack_require__("./apps/api/src/config/configuration.ts");
const app_config_controller_1 = __webpack_require__("./apps/api/src/app/config/app-config.controller.ts");
const app_config_service_1 = __webpack_require__("./apps/api/src/app/config/app-config.service.ts");
let AppConfigModule = class AppConfigModule {
};
AppConfigModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                load: [configuration_1.default]
            })
        ],
        controllers: [
            app_config_controller_1.AppConfigController
        ],
        providers: [
            app_config_service_1.AppConfigService
        ],
        exports: [
            app_config_service_1.AppConfigService
        ]
    })
], AppConfigModule);
exports.AppConfigModule = AppConfigModule;


/***/ }),

/***/ "./apps/api/src/app/config/app-config.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppConfigService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const config_1 = __webpack_require__("@nestjs/config");
const fs = __webpack_require__("fs");
let AppConfigService = class AppConfigService {
    constructor(configService) {
        this.configService = configService;
    }
    getConfig() {
        const configUrl = this.configService.get("configUrl");
        const rawdata = fs.readFileSync(configUrl, "utf8");
        return JSON.parse(rawdata.toString());
    }
};
AppConfigService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], AppConfigService);
exports.AppConfigService = AppConfigService;


/***/ }),

/***/ "./apps/api/src/app/files/app-content-type.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppContentTypeService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const path = __webpack_require__("path");
let AppContentTypeService = class AppContentTypeService {
    constructor() {
        this.fileSuffixMimeTypeMap = new Map([
            ["323", "text/h323"],
            ["acx", "application/internet-property-stream"],
            ["ai", "application/postscript"],
            ["aif", "audio/x-aiff"],
            ["aifc", "audio/x-aiff"],
            ["aiff", "audio/x-aiff"],
            ["asf", "video/x-ms-asf"],
            ["asr", "video/x-ms-asf"],
            ["asx", "video/x-ms-asf"],
            ["au", "audio/basic"],
            ["avi", "video/x-msvideo"],
            ["axs", "application/olescript"],
            ["bas", "text/plain"],
            ["bcpio", "application/x-bcpio"],
            ["bin", "application/octet-stream"],
            ["bmp", "image/bmp"],
            ["c", "text/plain"],
            ["cat", "application/vnd.ms-pkiseccat"],
            ["cdf", "application/x-cdf"],
            ["cer", "application/x-x509-ca-cert"],
            ["class", "application/octet-stream"],
            ["clp", "application/x-msclip"],
            ["cmx", "image/x-cmx"],
            ["cod", "image/cis-cod"],
            ["cpio", "application/x-cpio"],
            ["crd", "application/x-mscardfile"],
            ["crl", "application/pkix-crl"],
            ["crt", "application/x-x509-ca-cert"],
            ["csh", "application/x-csh"],
            ["css", "text/css"],
            ["dcr", "application/x-director"],
            ["der", "application/x-x509-ca-cert"],
            ["dir", "application/x-director"],
            ["dll", "application/x-msdownload"],
            ["dms", "application/octet-stream"],
            ["doc", "application/msword"],
            ["dot", "application/msword"],
            ["dvi", "application/x-dvi"],
            ["dxr", "application/x-director"],
            ["eps", "application/postscript"],
            ["etx", "text/x-setext"],
            ["evy", "application/envoy"],
            ["exe", "application/octet-stream"],
            ["fif", "application/fractals"],
            ["flr", "x-world/x-vrml"],
            ["gif", "image/gif"],
            ["gtar", "application/x-gtar"],
            ["gz", "application/x-gzip"],
            ["h", "text/plain"],
            ["hdf", "application/x-hdf"],
            ["hlp", "application/winhlp"],
            ["hqx", "application/mac-binhex40"],
            ["hta", "application/hta"],
            ["htc", "text/x-component"],
            ["htm", "text/html"],
            ["html", "text/html"],
            ["htt", "text/webviewhtml"],
            ["ico", "image/x-icon"],
            ["ief", "image/ief"],
            ["iii", "application/x-iphone"],
            ["ins", "application/x-internet-signup"],
            ["isp", "application/x-internet-signup"],
            ["jfif", "image/pipeg"],
            ["jpe", "image/jpeg"],
            ["jpeg", "image/jpeg"],
            ["jpg", "image/jpeg"],
            ["js", "application/x-javascript"],
            ["latex", "application/x-latex"],
            ["lha", "application/octet-stream"],
            ["lsf", "video/x-la-asf"],
            ["lsx", "video/x-la-asf"],
            ["lzh", "application/octet-stream"],
            ["m13", "application/x-msmediaview"],
            ["m14", "application/x-msmediaview"],
            ["m3u", "audio/x-mpegurl"],
            ["man", "application/x-troff-man"],
            ["mdb", "application/x-msaccess"],
            ["me", "application/x-troff-me"],
            ["mht", "message/rfc822"],
            ["mhtml", "message/rfc822"],
            ["mid", "audio/mid"],
            ["mny", "application/x-msmoney"],
            ["mov", "video/quicktime"],
            ["movie", "video/x-sgi-movie"],
            ["mp2", "video/mpeg"],
            ["mp3", "audio/mpeg"],
            ["mpa", "video/mpeg"],
            ["mpe", "video/mpeg"],
            ["mpeg", "video/mpeg"],
            ["mpg", "video/mpeg"],
            ["mpp", "application/vnd.ms-project"],
            ["mpv2", "video/mpeg"],
            ["ms", "application/x-troff-ms"],
            ["mvb", "application/x-msmediaview"],
            ["nws", "message/rfc822"],
            ["oda", "application/oda"],
            ["p10", "application/pkcs10"],
            ["p12", "application/x-pkcs12"],
            ["p7b", "application/x-pkcs7-certificates"],
            ["p7c", "application/x-pkcs7-mime"],
            ["p7m", "application/x-pkcs7-mime"],
            ["p7r", "application/x-pkcs7-certreqresp"],
            ["p7s", "application/x-pkcs7-signature"],
            ["pbm", "image/x-portable-bitmap"],
            ["pdf", "application/pdf"],
            ["pfx", "application/x-pkcs12"],
            ["pgm", "image/x-portable-graymap"],
            ["pko", "application/ynd.ms-pkipko"],
            ["pma", "application/x-perfmon"],
            ["pmc", "application/x-perfmon"],
            ["pml", "application/x-perfmon"],
            ["pmr", "application/x-perfmon"],
            ["pmw", "application/x-perfmon"],
            ["pnm", "image/x-portable-anymap"],
            ["pot,", "application/vnd.ms-powerpoint"],
            ["ppm", "image/x-portable-pixmap"],
            ["pps", "application/vnd.ms-powerpoint"],
            ["ppt", "application/vnd.ms-powerpoint"],
            ["prf", "application/pics-rules"],
            ["ps", "application/postscript"],
            ["pub", "application/x-mspublisher"],
            ["qt", "video/quicktime"],
            ["ra", "audio/x-pn-realaudio"],
            ["ram", "audio/x-pn-realaudio"],
            ["ras", "image/x-cmu-raster"],
            ["rgb", "image/x-rgb"],
            ["rmi", "audio/mid"],
            ["roff", "application/x-troff"],
            ["rtf", "application/rtf"],
            ["rtx", "text/richtext"],
            ["scd", "application/x-msschedule"],
            ["sct", "text/scriptlet"],
            ["setpay", "application/set-payment-initiation"],
            ["setreg", "application/set-registration-initiation"],
            ["sh", "application/x-sh"],
            ["shar", "application/x-shar"],
            ["sit", "application/x-stuffit"],
            ["snd", "audio/basic"],
            ["spc", "application/x-pkcs7-certificates"],
            ["spl", "application/futuresplash"],
            ["src", "application/x-wais-source"],
            ["sst", "application/vnd.ms-pkicertstore"],
            ["stl", "application/vnd.ms-pkistl"],
            ["stm", "text/html"],
            ["svg", "image/svg+xml"],
            ["sv4cpio", "application/x-sv4cpio"],
            ["sv4crc", "application/x-sv4crc"],
            ["swf", "application/x-shockwave-flash"],
            ["t", "application/x-troff"],
            ["tar", "application/x-tar"],
            ["tcl", "application/x-tcl"],
            ["tex", "application/x-tex"],
            ["texi", "application/x-texinfo"],
            ["texinfo", "application/x-texinfo"],
            ["tgz", "application/x-compressed"],
            ["tif", "image/tiff"],
            ["tiff", "image/tiff"],
            ["tr", "application/x-troff"],
            ["trm", "application/x-msterminal"],
            ["tsv", "text/tab-separated-values"],
            ["txt", "text/plain"],
            ["uls", "text/iuls"],
            ["ustar", "application/x-ustar"],
            ["vcf", "text/x-vcard"],
            ["vrml", "x-world/x-vrml"],
            ["wav", "audio/x-wav"],
            ["wcm", "application/vnd.ms-works"],
            ["wdb", "application/vnd.ms-works"],
            ["wks", "application/vnd.ms-works"],
            ["wmf", "application/x-msmetafile"],
            ["wps", "application/vnd.ms-works"],
            ["wri", "application/x-mswrite"],
            ["wrl", "x-world/x-vrml"],
            ["wrz", "x-world/x-vrml"],
            ["xaf", "x-world/x-vrml"],
            ["xbm", "image/x-xbitmap"],
            ["xla", "application/vnd.ms-excel"],
            ["xlc", "application/vnd.ms-excel"],
            ["xlm", "application/vnd.ms-excel"],
            ["xls", "application/vnd.ms-excel"],
            ["xlt", "application/vnd.ms-excel"],
            ["xlw", "application/vnd.ms-excel"],
            ["xof", "x-world/x-vrml"],
            ["xpm", "image/x-xpixmap"],
            ["xwd", "image/x-xwindowdump"],
            ["z", "application/x-compress"],
            ["zip", "application/zip"]
        ]);
    }
    getMimeTypeByFilename(file) {
        const ext = path.extname(file).replace(/\./g, "");
        const ct = this.fileSuffixMimeTypeMap.get(ext);
        if (ct) {
            return ct;
        }
        return "application/octet-stream";
    }
};
AppContentTypeService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], AppContentTypeService);
exports.AppContentTypeService = AppContentTypeService;


/***/ }),

/***/ "./apps/api/src/app/files/app-file-controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppFileController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const app_config_service_1 = __webpack_require__("./apps/api/src/app/config/app-config.service.ts");
// import { AppContentTypeService } from "./app-content-type.service";
const app_file_util_service_1 = __webpack_require__("./apps/api/src/app/common/file/app-file-util.service.ts");
let AppFileController = class AppFileController {
    constructor(appFileUtilService, appConfigService
    // private readonly appContentTypeService: AppContentTypeService
    ) {
        this.appFileUtilService = appFileUtilService;
        this.appConfigService = appConfigService;
        this.config = appConfigService.getConfig();
    }
    getFiles(catIndex) {
        const category = this.config.categories[catIndex];
        return this.appFileUtilService.readDirs(category.baseDir, category.bookExtensions);
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(":catIndex"),
    tslib_1.__param(0, (0, common_1.Param)("catIndex")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Array)
], AppFileController.prototype, "getFiles", null);
AppFileController = tslib_1.__decorate([
    (0, common_1.Controller)("files"),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof app_file_util_service_1.AppFileUtilService !== "undefined" && app_file_util_service_1.AppFileUtilService) === "function" ? _a : Object, typeof (_b = typeof app_config_service_1.AppConfigService !== "undefined" && app_config_service_1.AppConfigService) === "function" ? _b : Object])
], AppFileController);
exports.AppFileController = AppFileController;


/***/ }),

/***/ "./apps/api/src/app/files/app-file.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppFileModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const config_1 = __webpack_require__("@nestjs/config");
const configuration_1 = __webpack_require__("./apps/api/src/config/configuration.ts");
const app_file_controller_1 = __webpack_require__("./apps/api/src/app/files/app-file-controller.ts");
const app_config_module_1 = __webpack_require__("./apps/api/src/app/config/app-config.module.ts");
const app_content_type_service_1 = __webpack_require__("./apps/api/src/app/files/app-content-type.service.ts");
const app_file_util_module_1 = __webpack_require__("./apps/api/src/app/common/file/app-file-util.module.ts");
let AppFileModule = class AppFileModule {
};
AppFileModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                load: [configuration_1.default]
            }),
            app_config_module_1.AppConfigModule,
            app_file_util_module_1.AppFileUtilModule
        ],
        controllers: [
            app_file_controller_1.AppFileController
        ],
        providers: [
            app_content_type_service_1.AppContentTypeService
        ],
        exports: []
    })
], AppFileModule);
exports.AppFileModule = AppFileModule;


/***/ }),

/***/ "./apps/api/src/app/thumbs/app-thumbs.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppThumbsController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const app_config_service_1 = __webpack_require__("./apps/api/src/app/config/app-config.service.ts");
const app_thumbs_service_1 = __webpack_require__("./apps/api/src/app/thumbs/app-thumbs.service.ts");
let AppThumbsController = class AppThumbsController {
    constructor(appConfigService, appThumbsService) {
        this.appConfigService = appConfigService;
        this.appThumbsService = appThumbsService;
        this.config = appConfigService.getConfig();
    }
    generateMissingThumbs(catIndex) {
        const category = this.config.categories[catIndex];
        try {
            return this.appThumbsService.generateMissingThumbs(category);
        }
        catch (e) {
            common_1.Logger.error(e);
        }
    }
};
tslib_1.__decorate([
    (0, common_1.Get)("generate/missing/:catIndex"),
    tslib_1.__param(0, (0, common_1.Param)("catIndex")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)
], AppThumbsController.prototype, "generateMissingThumbs", null);
AppThumbsController = tslib_1.__decorate([
    (0, common_1.Controller)("thumbs"),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof app_config_service_1.AppConfigService !== "undefined" && app_config_service_1.AppConfigService) === "function" ? _b : Object, typeof (_c = typeof app_thumbs_service_1.AppThumbsService !== "undefined" && app_thumbs_service_1.AppThumbsService) === "function" ? _c : Object])
], AppThumbsController);
exports.AppThumbsController = AppThumbsController;


/***/ }),

/***/ "./apps/api/src/app/thumbs/app-thumbs.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppThumbsModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const config_1 = __webpack_require__("@nestjs/config");
const configuration_1 = __webpack_require__("./apps/api/src/config/configuration.ts");
const app_thumbs_controller_1 = __webpack_require__("./apps/api/src/app/thumbs/app-thumbs.controller.ts");
const app_thumbs_service_1 = __webpack_require__("./apps/api/src/app/thumbs/app-thumbs.service.ts");
const app_config_module_1 = __webpack_require__("./apps/api/src/app/config/app-config.module.ts");
const app_file_util_module_1 = __webpack_require__("./apps/api/src/app/common/file/app-file-util.module.ts");
const app_unpack_module_1 = __webpack_require__("./apps/api/src/app/common/unpack/app-unpack.module.ts");
const app_convert_img_module_1 = __webpack_require__("./apps/api/src/app/common/convert-img/app-convert-img.module.ts");
let AppThumbsModule = class AppThumbsModule {
};
AppThumbsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                load: [configuration_1.default]
            }),
            app_config_module_1.AppConfigModule,
            app_file_util_module_1.AppFileUtilModule,
            app_unpack_module_1.AppUnpackModule,
            app_convert_img_module_1.AppConvertImgModule
        ],
        controllers: [
            app_thumbs_controller_1.AppThumbsController
        ],
        providers: [
            app_thumbs_service_1.AppThumbsService
        ],
        exports: [
            app_thumbs_service_1.AppThumbsService
        ]
    })
], AppThumbsModule);
exports.AppThumbsModule = AppThumbsModule;


/***/ }),

/***/ "./apps/api/src/app/thumbs/app-thumbs.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppThumbsService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const app_file_util_service_1 = __webpack_require__("./apps/api/src/app/common/file/app-file-util.service.ts");
const app_unpack_service_1 = __webpack_require__("./apps/api/src/app/common/unpack/app-unpack.service.ts");
const path = __webpack_require__("path");
const fs = __webpack_require__("fs-extra");
const app_convert_img_service_1 = __webpack_require__("./apps/api/src/app/common/convert-img/app-convert-img.service.ts");
const index_and_name_1 = __webpack_require__("./apps/api/src/app/thumbs/index-and-name.ts");
let AppThumbsService = class AppThumbsService {
    constructor(appFileUtilService, appUnpackService, appConvertImgService) {
        this.appFileUtilService = appFileUtilService;
        this.appUnpackService = appUnpackService;
        this.appConvertImgService = appConvertImgService;
        this.thumbSuffix = ".jpg";
    }
    generateMissingThumbs(category) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const missingThumbs = this.findMissingThumbs(category);
            common_1.Logger.log(`${missingThumbs.length} missing thumbs`);
            const thumbs = [];
            for (const f of missingThumbs) {
                const th = yield this.generateMissingThumb(path.join(category.baseDir, f));
                thumbs.push(th);
            }
            return thumbs;
        });
    }
    generateMissingThumb(file) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            common_1.Logger.log('generateMissingThumb()  file:' + file);
            // const innerCoverUrl = await this.findCoverImage(file);
            const innerCoverIndexAndName = yield this.findCoverIndexAndName(file);
            common_1.Logger.log('generateMissingThumb()  innerCoverUrl:' + innerCoverIndexAndName);
            const coverTarget = yield this.extractCover(file, innerCoverIndexAndName);
            common_1.Logger.log('generateMissingThumb()  coverTarget:' + coverTarget);
            return this.resizeExtractedCover(coverTarget);
        });
    }
    findCoverIndexAndName(file) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const contentFiles = yield this.appUnpackService.listSync(file);
            const idx = this.getCoverIndex(contentFiles);
            if (idx < 0) {
                return new index_and_name_1.IndexAndName(-1, '');
            }
            return new index_and_name_1.IndexAndName(idx, contentFiles[idx]);
        });
    }
    extractCover(file, indexAndName) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const targetDir = path.dirname(file);
            const basename = path.basename(file);
            const extname = path.extname(file);
            const name = basename.replace(extname, '');
            const unpackOptions = { targetDir, indexes: [indexAndName.index] };
            yield this.appUnpackService.unpackSync(file, unpackOptions);
            const innerCoverExtname = path.extname(indexAndName.name);
            const tempImg = path.join(targetDir, indexAndName.name);
            const targetImg = path.join(targetDir, name + innerCoverExtname.replace('jpeg', 'jpg'));
            if (fs.existsSync(targetImg)) {
                yield fs.removeSync(targetImg);
            }
            yield fs.moveSync(tempImg, targetImg);
            this.deleteTempDirectory(tempImg, targetDir);
            return targetImg;
        });
    }
    resizeExtractedCover(coverTarget) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.appConvertImgService.resizeImgSync(coverTarget);
        });
    }
    deleteTempDirectory(tempImg, targetDir) {
        const tempImgDir = path.dirname(tempImg);
        const addedTempPath = tempImgDir.replace(targetDir, '');
        const firstAddedTempDir = addedTempPath.split('/')[1];
        if (firstAddedTempDir) {
            const dirForDeletion = path.join(targetDir, firstAddedTempDir);
            const stats2 = fs.statSync(dirForDeletion);
            if (stats2.isDirectory()) {
                fs.removeSync(dirForDeletion);
            }
        }
    }
    getSeparatorCount(s) {
        if (!s) {
            return 0;
        }
        const chars = s.split("");
        let ret = 0;
        for (const item of chars) {
            if (item === "/" || item === "\\") {
                ret++;
            }
        }
        return ret;
    }
    compareEntries(a, b) {
        if (a.indexOf("cover.") > -1) {
            return -1;
        }
        if (b.indexOf("cover.") > -1) {
            return 1;
        }
        const ca = this.getSeparatorCount(a);
        const cb = this.getSeparatorCount(b);
        if (ca !== cb) {
            return ca - cb;
        }
        return a < b ? -1 : 1;
    }
    getCoverIndex(contentFiles) {
        if (!contentFiles || contentFiles.length === 0)
            return -1;
        const clone = contentFiles.slice(0);
        clone.sort(this.compareEntries.bind(this));
        const jpgEntryName = this.getFirstImg(clone);
        if (jpgEntryName === null) {
            return -1;
        }
        return contentFiles.indexOf(jpgEntryName);
    }
    getFirstImg(contentFiles) {
        const imgFilePattern = /\.jpg$|\.JPG$|\.jpeg$|\.JPEG$|\.png$|\.PNG$|\.gif$|\.GIF$/g;
        for (let i = 0; i < contentFiles.length; i++) {
            if (contentFiles[i].match(imgFilePattern))
                return contentFiles[i];
        }
        return null;
    }
    findMissingThumbs(category) {
        const files = this.appFileUtilService
            .readDirs(category.baseDir, [...category.bookExtensions, this.thumbSuffix]);
        const thumbFiles = files.filter(f => f.endsWith(this.thumbSuffix));
        const contentFiles = files.filter(f => !f.endsWith(this.thumbSuffix));
        return contentFiles.filter(f => {
            const thumbFileName = this.getThumbFileName(f);
            return thumbFiles.indexOf(thumbFileName) === -1;
        });
    }
    getThumbFileName(file) {
        return file.replace(/\.[^.]+$/g, ".jpg");
    }
};
AppThumbsService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof app_file_util_service_1.AppFileUtilService !== "undefined" && app_file_util_service_1.AppFileUtilService) === "function" ? _a : Object, typeof (_b = typeof app_unpack_service_1.AppUnpackService !== "undefined" && app_unpack_service_1.AppUnpackService) === "function" ? _b : Object, typeof (_c = typeof app_convert_img_service_1.AppConvertImgService !== "undefined" && app_convert_img_service_1.AppConvertImgService) === "function" ? _c : Object])
], AppThumbsService);
exports.AppThumbsService = AppThumbsService;


/***/ }),

/***/ "./apps/api/src/app/thumbs/index-and-name.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IndexAndName = void 0;
class IndexAndName {
    constructor(index, name) {
        this.index = index;
        this.name = name;
    }
}
exports.IndexAndName = IndexAndName;


/***/ }),

/***/ "./apps/api/src/app/viewer/app-viewer-controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var AppViewerController_1, _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppViewerController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const config_1 = __webpack_require__("./libs/config/src/index.ts");
const app_config_service_1 = __webpack_require__("./apps/api/src/app/config/app-config.service.ts");
const crypto_1 = __webpack_require__("crypto");
const path = __webpack_require__("path");
const app_unpack_service_1 = __webpack_require__("./apps/api/src/app/common/unpack/app-unpack.service.ts");
const app_file_util_service_1 = __webpack_require__("./apps/api/src/app/common/file/app-file-util.service.ts");
const fs = __webpack_require__("fs-extra");
let AppViewerController = AppViewerController_1 = class AppViewerController {
    constructor(appUnpackService, appConfigService, appFileUtilService) {
        this.appUnpackService = appUnpackService;
        this.appConfigService = appConfigService;
        this.appFileUtilService = appFileUtilService;
        this.config = appConfigService.getConfig();
    }
    getHash(body) {
        const category = this.config.categories[body.categoryIndex];
        const source = path.join(category.baseDir, body.file);
        return (0, crypto_1.createHash)("md5", {})
            .update(source)
            .digest("base64url");
    }
    createView(body) {
        const category = this.config.categories[body.categoryIndex];
        const source = path.join(category.baseDir, body.file);
        const h = (0, crypto_1.createHash)("md5", {})
            .update(source)
            .digest("base64url");
        const targetDir = path.join(this.config.tempDir, h);
        let targetExists = fs.existsSync(targetDir);
        let targetTmpExists = fs.existsSync(targetDir + AppViewerController_1.tmpSuffix);
        const unpackNecessary = body.forced || (!targetExists && !targetTmpExists);
        if (unpackNecessary) {
            try {
                this.doUnpack(source, targetDir);
            }
            catch (e) {
                console.error(e);
            }
            targetExists = fs.existsSync(targetDir);
            targetTmpExists = fs.existsSync(targetDir + AppViewerController_1.tmpSuffix);
        }
        if (targetExists && !targetTmpExists) {
            return this.readFiles(targetDir, h);
        }
        return [];
    }
    readView(hash) {
        const targetDir = path.join(this.config.tempDir, hash);
        if (!fs.existsSync(targetDir)) {
            return [];
        }
        return this.readFiles(targetDir, hash);
    }
    readFiles(targetDir, h) {
        return this.appFileUtilService
            .readDirs(targetDir, [".jpg", ".jpeg"])
            .sort()
            .map(f => path.join(h, f));
    }
    doUnpack(source, targetDir) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const tmpTarget = targetDir + AppViewerController_1.tmpSuffix;
            yield this.appUnpackService
                .unpackSync(source, {
                targetDir: tmpTarget,
                forceDirectory: false
            });
            if (fs.existsSync(targetDir)) {
                fs.removeSync(targetDir);
            }
            fs.renameSync(tmpTarget, targetDir);
        });
    }
};
AppViewerController.tmpSuffix = ".tmp";
tslib_1.__decorate([
    (0, common_1.Post)("hash"),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof config_1.ViewBodyData !== "undefined" && config_1.ViewBodyData) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", String)
], AppViewerController.prototype, "getHash", null);
tslib_1.__decorate([
    (0, common_1.Post)("new"),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof config_1.ViewBodyData !== "undefined" && config_1.ViewBodyData) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", Array)
], AppViewerController.prototype, "createView", null);
tslib_1.__decorate([
    (0, common_1.Get)("read/:hash"),
    tslib_1.__param(0, (0, common_1.Param)("hash")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Array)
], AppViewerController.prototype, "readView", null);
AppViewerController = AppViewerController_1 = tslib_1.__decorate([
    (0, common_1.Controller)("view"),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof app_unpack_service_1.AppUnpackService !== "undefined" && app_unpack_service_1.AppUnpackService) === "function" ? _c : Object, typeof (_d = typeof app_config_service_1.AppConfigService !== "undefined" && app_config_service_1.AppConfigService) === "function" ? _d : Object, typeof (_e = typeof app_file_util_service_1.AppFileUtilService !== "undefined" && app_file_util_service_1.AppFileUtilService) === "function" ? _e : Object])
], AppViewerController);
exports.AppViewerController = AppViewerController;


/***/ }),

/***/ "./apps/api/src/app/viewer/app-viewer.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppViewerModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const config_1 = __webpack_require__("@nestjs/config");
const configuration_1 = __webpack_require__("./apps/api/src/config/configuration.ts");
const app_config_module_1 = __webpack_require__("./apps/api/src/app/config/app-config.module.ts");
const app_viewer_controller_1 = __webpack_require__("./apps/api/src/app/viewer/app-viewer-controller.ts");
const app_unpack_module_1 = __webpack_require__("./apps/api/src/app/common/unpack/app-unpack.module.ts");
const app_file_util_module_1 = __webpack_require__("./apps/api/src/app/common/file/app-file-util.module.ts");
let AppViewerModule = class AppViewerModule {
};
AppViewerModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                load: [configuration_1.default]
            }),
            app_config_module_1.AppConfigModule,
            app_unpack_module_1.AppUnpackModule,
            app_file_util_module_1.AppFileUtilModule
        ],
        controllers: [
            app_viewer_controller_1.AppViewerController
        ],
        providers: [],
        exports: []
    })
], AppViewerModule);
exports.AppViewerModule = AppViewerModule;


/***/ }),

/***/ "./apps/api/src/config/configuration.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const path = __webpack_require__("path");
exports["default"] = () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    configUrl: path.join(__dirname, 'assets/config.json')
    /*
    categories: [
      {
        apiUrl: '/api/comics/',
        baseDir: '/Users/marckronberg/Comics.nosync',
        bookExtensions: [
          '.cbz',
          '.cbr'
        ],
        title: 'Comics',
        icon: 'accessibility_new',
        thumbsDims: [
          {
            width: 83,
            height: 150
          },
          {
            width: 196,
            height: 300
          },
          {
            width: 329,
            height: 450
          },
          {
            width: 392,
            height: 600
          }
        ],
        'dimIndex': 1,
        'initialFilter': ''
      },
      {
        apiUrl: '/api/ebooks/',
        baseDir: '/Users/marckronberg/Ebooks.nosync',
        bookExtensions: [
          '.epub'
        ],
        title: 'Ebooks',
        icon: 'star',
        thumbsDims: [
          {
            width: 83,
            height: 150
          },
          {
            width: 392,
            height: 600
          }
        ],
        'dimIndex': 1,
        'initialFilter': ''
      }
    ]
    */
});


/***/ }),

/***/ "./libs/config/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/config/src/lib/data/config.if.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/config/src/lib/data/config.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/config/src/lib/data/category.if.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/config/src/lib/data/category.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/config/src/lib/data/thumbs-dim.if.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/config/src/lib/data/thumbs-dim.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/config/src/lib/data/view-body.data.ts"), exports);


/***/ }),

/***/ "./libs/config/src/lib/data/category.if.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/config/src/lib/data/category.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Category = void 0;
const config_1 = __webpack_require__("./libs/config/src/index.ts");
class Category {
    constructor(apiUrl, baseDir, bookExtensions = [".cbr"], title = "", icon = "", thumbsDims = [new config_1.ThumbsDim(200, 300)], dimIndex = 0, initialFilter = "") {
        this.apiUrl = apiUrl;
        this.baseDir = baseDir;
        this.bookExtensions = bookExtensions;
        this.title = title;
        this.icon = icon;
        this.thumbsDims = thumbsDims;
        this.dimIndex = dimIndex;
        this.initialFilter = initialFilter;
    }
}
exports.Category = Category;


/***/ }),

/***/ "./libs/config/src/lib/data/config.if.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/config/src/lib/data/config.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Config = void 0;
class Config {
    constructor(port = 3333, tempDir = './tmp', categories = []) {
        this.port = port;
        this.tempDir = tempDir;
        this.categories = categories;
    }
}
exports.Config = Config;


/***/ }),

/***/ "./libs/config/src/lib/data/thumbs-dim.if.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/config/src/lib/data/thumbs-dim.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ThumbsDim = void 0;
class ThumbsDim {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
}
exports.ThumbsDim = ThumbsDim;


/***/ }),

/***/ "./libs/config/src/lib/data/view-body.data.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ViewBodyData = void 0;
class ViewBodyData {
    constructor(categoryIndex, file, forced = true) {
        this.categoryIndex = categoryIndex;
        this.file = file;
        this.forced = forced;
    }
}
exports.ViewBodyData = ViewBodyData;


/***/ }),

/***/ "@nestjs/common":
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/serve-static":
/***/ ((module) => {

module.exports = require("@nestjs/serve-static");

/***/ }),

/***/ "fs-extra":
/***/ ((module) => {

module.exports = require("fs-extra");

/***/ }),

/***/ "tslib":
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),

/***/ "child_process":
/***/ ((module) => {

module.exports = require("child_process");

/***/ }),

/***/ "crypto":
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "fs":
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "os":
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ "path":
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const core_1 = __webpack_require__("@nestjs/core");
const app_module_1 = __webpack_require__("./apps/api/src/app/app.module.ts");
const app_service_1 = __webpack_require__("./apps/api/src/app/app.service.ts");
const path = __webpack_require__("path");
const fs = __webpack_require__("fs");
function bootstrap() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const json = fs.readFileSync(path.resolve(__dirname + "/assets/config.json"));
        const config = JSON.parse(json.toString("utf8"));
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        common_1.Logger.log(app);
        const globalPrefix = "api";
        app.setGlobalPrefix(globalPrefix);
        app.enableCors();
        // app.useGlobalFilters(new HttpExceptionFilter());
        // app.useGlobalInterceptors(new ErrorInterceptor());
        // app.useGlobalPipes(new ValidationPipe())
        const port = process.env.PORT || config.port;
        // Handle 404
        // app.use(function (req, res) {
        //   console.info('404', req.originalUrl);
        //   res.sendFile(path.resolve(__dirname + '/assets/empty.gif'));
        // });
        bootstrapStaticAssets(app, config);
        const server = app.getHttpServer();
        const router = server._events.request._router;
        const availableRoutes = router.stack
            .map(layer => {
            if (layer.route) {
                return {
                    path: layer.route.path,
                    method: layer.route.stack[0].method
                };
            }
        })
            .filter(item => item !== undefined);
        app_service_1.AppService.availableRoutes = availableRoutes;
        common_1.Logger.log("Routes:\n\t" +
            availableRoutes
                .map(r => r["method"] + ": " + r["path"])
                .join("\n\t"));
        yield app.listen(port, () => {
            common_1.Logger.log("Listening at http://localhost:" + port + "/" + globalPrefix);
        });
    });
}
function bootstrapStaticAssets(app, config) {
    common_1.Logger.log('Static dirs:');
    config.categories
        .forEach(cat => {
        app.useStaticAssets(cat.baseDir);
        common_1.Logger.log(`    added: ${cat.baseDir}`);
    });
    app.useStaticAssets(config.tempDir);
    common_1.Logger.log(`    added: ${config.tempDir}`);
    // if (fs.existsSync(path.resolve(__dirname, "../comiccommander/index.html"))) {
    //   const ff = path.resolve(__dirname, "../comiccommander")
    //   app.useStaticAssets(ff);
    //   Logger.log(`    added: ${ff}`);
    // }
}
bootstrap();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map