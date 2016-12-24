"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var main_service_1 = require('../shared/main.service');
var FileManagerComponent = (function () {
    function FileManagerComponent(mainService) {
        this.mainService = mainService;
        this.choosed = new core_1.EventEmitter();
    }
    FileManagerComponent.prototype.choose = function (file) {
        this.choosed.emit(file);
    };
    FileManagerComponent.prototype.close = function (file) {
        this.mainService.close(file, this.files, this.interpretManager);
    };
    FileManagerComponent.prototype.create = function () {
        var _this = this;
        var name = prompt('Enter file name', '');
        if (name)
            this.mainService.create(name).subscribe(function (curFile) {
                _this.files.push(curFile);
                _this.interpretManager.curFile = curFile;
            });
    };
    FileManagerComponent.prototype.open = function (id) {
        var _this = this;
        this.mainService.open(id).subscribe(function (curFile) {
            _this.files.push(curFile);
            _this.interpretManager.curFile = curFile;
            console.log(curFile);
        });
    };
    FileManagerComponent.prototype.save = function () {
        var _this = this;
        if (this.interpretManager.curFile) {
            this.mainService.save(this.interpretManager.curFile).
                subscribe(function (body) { return body == true ?
                _this.interpretManager.output += _this.interpretManager.curFile.Name + ' saved\n' :
                _this.interpretManager.output += 'Failed\n'; });
            if (!this.curUserFiles.find(function (f) { return f.Id == _this.interpretManager.curFile.Id; }))
                this.curUserFiles.push(this.interpretManager.curFile);
        }
    };
    FileManagerComponent.prototype.getFiles = function () {
        var _this = this;
        this.mainService.getFiles().subscribe(function (files) {
            var _loop_1 = function(file) {
                if (!_this.curUserFiles.find(function (f) { return f.Id == file.Id; }))
                    _this.curUserFiles.push(file);
            };
            for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
                var file = files_1[_i];
                _loop_1(file);
            }
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], FileManagerComponent.prototype, "files", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], FileManagerComponent.prototype, "curUserFiles", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], FileManagerComponent.prototype, "interpretManager", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], FileManagerComponent.prototype, "choosed", void 0);
    FileManagerComponent = __decorate([
        core_1.Component({
            selector: 'filemanager',
            templateUrl: './app/filemanager/filemanager.component.html',
            styleUrls: ['./app/filemanager/filemanager.component.css']
        }), 
        __metadata('design:paramtypes', [main_service_1.MainService])
    ], FileManagerComponent);
    return FileManagerComponent;
}());
exports.FileManagerComponent = FileManagerComponent;
//# sourceMappingURL=filemanager.component.js.map