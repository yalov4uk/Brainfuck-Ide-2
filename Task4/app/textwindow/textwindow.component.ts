import { Component, Input, Output, EventEmitter } from '@angular/core';

import { IFileModel, FileModel } from '../shared/filemodel';
import { Initilizer, IOperation } from './OperationModel';
import { InterpretManager, IInterpretManager } from '../shared/InterpretManager';
import { MainService } from '../shared/main.service';

@Component({
    selector: 'textwindow',
    templateUrl: './app/textwindow/textwindow.component.html',
    styleUrls: ['./app/textwindow/textwindow.component.css']
})
export class TextWindowComponent {
    @Input() interpretManager: IInterpretManager;
    @Output() outputed: EventEmitter<number>;
    operations: { [sym: string]: IOperation; };

    constructor(private mainService: MainService) {
        this.operations = Initilizer.getOperations();
        this.outputed = new EventEmitter();
    }

    run(): void {
        if (this.interpretManager.curFile)
            this.mainService.run(this.interpretManager, this.operations);
    }

    step(): void {
        if (this.interpretManager.curFile)
            this.mainService.step(this.interpretManager, this.operations);
    }
}