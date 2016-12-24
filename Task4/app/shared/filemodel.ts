export interface IFileModel {
    Id: number;
    Name: string;
    Content: string;
}

export class FileModel implements IFileModel {
    constructor(public Id: number, public Name: string, public Content: string) { }
}