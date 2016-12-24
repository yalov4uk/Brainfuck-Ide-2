import { Component, Input } from '@angular/core';

import { IInterpretManager, InterpretManager } from '../shared/InterpretManager';

@Component({
    selector: 'output',
    templateUrl: './app/output/output.component.html',
    styleUrls: ['./app/output/output.component.css']
})
export class OutputComponent {
    @Input() interpretManager: IInterpretManager;
}