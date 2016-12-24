import { InterpretManager, IInterpretManager } from '../shared/InterpretManager';

export class Initilizer {
    static getOperations(): { [sym: string]: IOperation; } {
        let operations: { [sym: string]: IOperation } = {};
        operations['>'] = new IncrementPointer();
        operations['<'] = new DecrementPointer();
        operations['+'] = new IncrementValue();
        operations['-'] = new DecrementValue();
        operations['.'] = new OutputOperation();
        operations[','] = new InputOperation();
        operations['['] = new StartCase();
        operations[']'] = new EndCase();
        operations['\n'] = new NewLine();
        operations['!'] = new Debug();
        return operations;
    }
}

export interface IOperation {
    execute(interpretManager: IInterpretManager);
}

class IncrementPointer implements IOperation {
    execute(interpretManager: IInterpretManager): void {
        interpretManager.memoryPointer == interpretManager.memory.length ? interpretManager.memoryPointer = 0 : interpretManager.memoryPointer++;
        interpretManager.contentPointer++;
    }
}

class DecrementPointer implements IOperation {
    execute(interpretManager: IInterpretManager): void {
        interpretManager.memoryPointer == 0 ? interpretManager.memoryPointer = interpretManager.memory.length : interpretManager.memoryPointer--;
        interpretManager.contentPointer++;
    }
}

class IncrementValue implements IOperation {
    execute(interpretManager: IInterpretManager): void {
        interpretManager.memory[interpretManager.memoryPointer]++;      
        interpretManager.contentPointer++;
    }
}

class DecrementValue implements IOperation {
    execute(interpretManager: IInterpretManager): void {
        interpretManager.memory[interpretManager.memoryPointer]--;
        interpretManager.contentPointer++;
    }
}

class OutputOperation implements IOperation {
    execute(interpretManager: IInterpretManager): void {
        interpretManager.contentPointer++;
        interpretManager.output += String.fromCharCode(interpretManager.memory[interpretManager.memoryPointer]);
    }
}

class InputOperation implements IOperation {
    execute(interpretManager: InterpretManager): void {
        interpretManager.memoryCell = prompt('Enter ASCII code as value (use "#" to enter ASCII char)', '0');
        interpretManager.contentPointer++;
    }
}

class StartCase implements IOperation {
    execute(interpretManager: IInterpretManager): void {
        if (interpretManager.memory[interpretManager.memoryPointer] == 0) {
            let stacklen = interpretManager.caseStack.push(interpretManager.contentPointer) - 1;
            while (interpretManager.contentPointer++ + 1) {
                if (interpretManager.curFile.Content[interpretManager.contentPointer] == ']') {
                    interpretManager.caseStack.pop();
                    if (stacklen == interpretManager.caseStack.length) {
                        interpretManager.contentPointer++;
                        break;
                    }
                }
                else if (interpretManager.curFile.Content[interpretManager.contentPointer] == '[')
                    interpretManager.caseStack.push(interpretManager.contentPointer);
            }
        }
        else {
            interpretManager.caseStack.push(interpretManager.contentPointer);
            interpretManager.contentPointer++;
        }
    }
}

class EndCase implements IOperation {
    execute(interpretManager: IInterpretManager): void {
            interpretManager.contentPointer = interpretManager.caseStack.pop();
    }
}

class NewLine implements IOperation {
    execute(interpretManager: IInterpretManager): void {
        interpretManager.contentPointer++;
    }
}

class Debug implements IOperation {
    execute(interpretManager: IInterpretManager): void {
        interpretManager.debug = true;
        interpretManager.contentPointer++;
    }
}