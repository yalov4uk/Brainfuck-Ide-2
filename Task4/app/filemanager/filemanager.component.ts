import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Response } from '@angular/http';

import { IFileModel, FileModel } from '../shared/filemodel'
import { MainService } from '../shared/main.service';
import { IInterpretManager } from '../shared/InterpretManager';

@Component({
    selector: 'filemanager',
    templateUrl: './app/filemanager/filemanager.component.html',
    styleUrls: ['./app/filemanager/filemanager.component.css']
})
export class FileManagerComponent {
    @Input() files: IFileModel[];
    @Input() curUserFiles: IFileModel[];
    @Input() interpretManager: IInterpretManager;
    @Output() choosed: EventEmitter<IFileModel>;

    constructor(private mainService: MainService) {
        this.choosed = new EventEmitter();
    }

    choose(file: IFileModel): void {
        this.choosed.emit(file);
    }

    close(file: IFileModel): void {
        this.mainService.close(file, this.files, this.interpretManager);
    }

    create(): void {
        let name = prompt('Enter file name', '');
        if (name)
            this.mainService.create(name).subscribe((curFile) => {
                this.files.push(curFile);
                this.interpretManager.curFile = curFile;
            });
    }

    open(id: number): void {
        this.mainService.open(id).subscribe((curFile) => {
            this.files.push(curFile);
            this.interpretManager.curFile = curFile;
            console.log(curFile);
        }); 
    }

    save(): void {
        if (this.interpretManager.curFile) {
            this.mainService.save(this.interpretManager.curFile).
                subscribe((body) => body == true ?
                    this.interpretManager.output += this.interpretManager.curFile.Name + ' saved\n' :
                    this.interpretManager.output += 'Failed\n');
            if (!this.curUserFiles.find(f => f.Id == this.interpretManager.curFile.Id))
                this.curUserFiles.push(this.interpretManager.curFile);
        }
    }

    getFiles(): void {
        this.mainService.getFiles().subscribe((files) => {
            for (let file of files) {
                if (!this.curUserFiles.find(f => f.Id == file.Id))
                    this.curUserFiles.push(file)
            }
        });
    }
}