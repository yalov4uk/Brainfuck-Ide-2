import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { IFileModel, FileModel } from '../shared/filemodel'
import { IInterpretManager } from '../shared/InterpretManager';
import { IOperation } from '../textwindow/OperationModel';

@Injectable()
export class MainService {
    constructor(private http: Http) { }

    close(file: IFileModel, files: IFileModel[], interpretManager: IInterpretManager): void {
        let index = files.indexOf(file);
        if (index > -1) {
            if (interpretManager.curFile == file)
                interpretManager.curFile = null;
            files.splice(index, 1);    
        }
        if (interpretManager.debug)
            this.initInterpretManager(interpretManager);
    }

    run(interpretManager: IInterpretManager, operations: { [sym: string]: IOperation; }): void {
        interpretManager.debug = false;
        try {
            while (interpretManager.contentPointer < interpretManager.curFile.Content.length && !interpretManager.debug)
                operations[interpretManager.curFile.Content[interpretManager.contentPointer]].execute(interpretManager);
        }
        catch (Error) {
            interpretManager.output += '\n' + Error.message;
            interpretManager.contentPointer = interpretManager.curFile.Content.length;
        }
        this.initInterpretManager(interpretManager);
    }

    step(interpretManager: IInterpretManager, operations: { [sym: string]: IOperation; }): void {
        try {
            if (interpretManager.contentPointer < interpretManager.curFile.Content.length && interpretManager.debug)
                operations[interpretManager.curFile.Content[interpretManager.contentPointer]].execute(interpretManager);
        }
        catch (Error) {
            interpretManager.output += '\n' + Error.message;
            interpretManager.contentPointer = interpretManager.curFile.Content.length;
        }
        this.initInterpretManager(interpretManager);
    }

    private initInterpretManager(interpretManager: IInterpretManager): void {
        if (interpretManager.contentPointer == interpretManager.curFile.Content.length) {
            interpretManager.caseStack = [];
            interpretManager.contentPointer = 0;
            interpretManager.debug = false;
            interpretManager.memory = new Array(30000);
            for (let i = 0; i < 30000; i++)
                interpretManager.memory[i] = 0;
            interpretManager.memoryPointer = 0;
            interpretManager.output += '\n';
        }
    }

    create(name: string): Observable<IFileModel> {
        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        return this.http.post('./Home/Create/', JSON.stringify(new FileModel(0, name, '')), { headers: headers })
            .map((resp: Response) => resp.json())
            .catch((error: any) => { return Observable.throw(error); });
    }

    open(id: number): Observable<IFileModel> {
        return this.http.get('./Home/Open?id=' + id)
            .map((resp: Response) => resp.json())
            .catch((error: any) => { return Observable.throw(error); });
    }

    save(curFile: IFileModel): Observable<boolean> {
        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        return this.http.post('./Home/Save/', JSON.stringify(curFile), { headers: headers })
            .map((resp: Response) => resp.json())
            .catch((error: any) => { return Observable.throw(error); });
    }

    getFiles(): Observable<IFileModel[]> {
        return this.http.get('./Home/GetFiles/')
            .map((resp: Response) => {
                let result = [], files = resp.json();
                for (let file of files)
                    result.push(new FileModel(file.Id, file.Name, file.Content));
                return result;
            })
            .catch((error: any) => { return Observable.throw(error); });
    }
}