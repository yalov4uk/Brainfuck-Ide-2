import { FileModel, IFileModel } from '../shared/filemodel';

export interface IInterpretManager {
    curFile: IFileModel;
    contentPointer: number;
    memory: number[];
    memoryPointer: number;
    caseStack: number[];
    output: string;
    debug: boolean;
    memoryCell;
    memoryPointerAttr;
}

export class InterpretManager implements IInterpretManager {
    constructor(public curFile: IFileModel = null, public contentPointer: number = 0,
        public memory: number[] = new Array(30000), public memoryPointer: number = 0,
        public caseStack: number[] = [], public output: string = '', public debug: boolean = false) {
        for (let i = 0; i < 30000; i++) {
            this.memory[i] = 0;
        }
    }

    get memoryCell(): string {
        return this.memory[this.memoryPointer].toString();
    }

    set memoryCell(value: string) {
        value[0] != '#' ? this.memory[this.memoryPointer] = +value : value.length > 1 ? this.memory[this.memoryPointer] = value[1].charCodeAt(0) : 0;
    }

    get memoryPointerAttr(): string {
        return this.memoryPointer.toString();
    }

    set memoryPointerAttr(value: string) {
        let intvalue = parseInt(value);
        (Number.isInteger(intvalue) && intvalue >= 0) ? this.memoryPointer = intvalue : 0;
    }
}