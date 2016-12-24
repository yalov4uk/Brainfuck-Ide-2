"use strict";
var Initilizer = (function () {
    function Initilizer() {
    }
    Initilizer.getOperations = function () {
        var operations = {};
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
    };
    return Initilizer;
}());
exports.Initilizer = Initilizer;
var IncrementPointer = (function () {
    function IncrementPointer() {
    }
    IncrementPointer.prototype.execute = function (interpretManager) {
        interpretManager.memoryPointer == interpretManager.memory.length ? interpretManager.memoryPointer = 0 : interpretManager.memoryPointer++;
        interpretManager.contentPointer++;
    };
    return IncrementPointer;
}());
var DecrementPointer = (function () {
    function DecrementPointer() {
    }
    DecrementPointer.prototype.execute = function (interpretManager) {
        interpretManager.memoryPointer == 0 ? interpretManager.memoryPointer = interpretManager.memory.length : interpretManager.memoryPointer--;
        interpretManager.contentPointer++;
    };
    return DecrementPointer;
}());
var IncrementValue = (function () {
    function IncrementValue() {
    }
    IncrementValue.prototype.execute = function (interpretManager) {
        interpretManager.memory[interpretManager.memoryPointer]++;
        interpretManager.contentPointer++;
    };
    return IncrementValue;
}());
var DecrementValue = (function () {
    function DecrementValue() {
    }
    DecrementValue.prototype.execute = function (interpretManager) {
        interpretManager.memory[interpretManager.memoryPointer]--;
        interpretManager.contentPointer++;
    };
    return DecrementValue;
}());
var OutputOperation = (function () {
    function OutputOperation() {
    }
    OutputOperation.prototype.execute = function (interpretManager) {
        interpretManager.contentPointer++;
        interpretManager.output += String.fromCharCode(interpretManager.memory[interpretManager.memoryPointer]);
    };
    return OutputOperation;
}());
var InputOperation = (function () {
    function InputOperation() {
    }
    InputOperation.prototype.execute = function (interpretManager) {
        interpretManager.memoryCell = prompt('Enter ASCII code as value (use "#" to enter ASCII char)', '0');
        interpretManager.contentPointer++;
    };
    return InputOperation;
}());
var StartCase = (function () {
    function StartCase() {
    }
    StartCase.prototype.execute = function (interpretManager) {
        if (interpretManager.memory[interpretManager.memoryPointer] == 0) {
            var stacklen = interpretManager.caseStack.push(interpretManager.contentPointer) - 1;
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
    };
    return StartCase;
}());
var EndCase = (function () {
    function EndCase() {
    }
    EndCase.prototype.execute = function (interpretManager) {
        interpretManager.contentPointer = interpretManager.caseStack.pop();
    };
    return EndCase;
}());
var NewLine = (function () {
    function NewLine() {
    }
    NewLine.prototype.execute = function (interpretManager) {
        interpretManager.contentPointer++;
    };
    return NewLine;
}());
var Debug = (function () {
    function Debug() {
    }
    Debug.prototype.execute = function (interpretManager) {
        interpretManager.debug = true;
        interpretManager.contentPointer++;
    };
    return Debug;
}());
//# sourceMappingURL=OperationModel.js.map