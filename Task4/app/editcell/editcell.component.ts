import { Component, Input, Output, EventEmitter } from '@angular/core';

import { IInterpretManager } from '../shared/InterpretManager';

@Component({
    selector: 'editcell',
    templateUrl: './app/editcell/editcell.component.html',
    styleUrls: ['./app/editcell/editcell.component.css']
})
export class EditCellComponent{
    @Input() interpretManager: IInterpretManager;
}