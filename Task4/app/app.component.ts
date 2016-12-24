import { Component } from '@angular/core';

import { IFileModel, FileModel } from './shared/filemodel';
import { InterpretManager, IInterpretManager } from './shared/InterpretManager';
import { MainService } from './shared/main.service';

@Component({
    selector: 'main-app',
    templateUrl: './app/app.component.html',
    styleUrls: ['./app/app.component.css']
})
export class AppComponent {
    files: IFileModel[];
    interpretManager: IInterpretManager;
    curUserFiles: IFileModel[];

    constructor(private mainService: MainService) {
        this.files = [];
        this.interpretManager = new InterpretManager();
        this.curUserFiles = [];
    }

    onChoosing(curFile: IFileModel) {
        this.interpretManager.curFile = curFile;
    }
}