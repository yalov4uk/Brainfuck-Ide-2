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
var OperationModel_1 = require('./OperationModel');
var main_service_1 = require('../shared/main.service');
var TextWindowComponent = (function () {
    function TextWindowComponent(mainService) {
        this.mainService = mainService;
        this.operations = OperationModel_1.Initilizer.getOperations();
        this.outputed = new core_1.EventEmitter();
    }
    TextWindowComponent.prototype.run = function () {
        if (this.interpretManager.curFile)
            this.mainService.run(this.interpretManager, this.operations);
    };
    TextWindowComponent.prototype.step = function () {
        if (this.interpretManager.curFile)
            this.mainService.step(this.interpretManager, this.operations);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TextWindowComponent.prototype, "interpretManager", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TextWindowComponent.prototype, "outputed", void 0);
    TextWindowComponent = __decorate([
        core_1.Component({
            selector: 'textwindow',
            templateUrl: './app/textwindow/textwindow.component.html',
            styleUrls: ['./app/textwindow/textwindow.component.css']
        }), 
        __metadata('design:paramtypes', [main_service_1.MainService])
    ], TextWindowComponent);
    return TextWindowComponent;
}());
exports.TextWindowComponent = TextWindowComponent;
//# sourceMappingURL=textwindow.component.js.map