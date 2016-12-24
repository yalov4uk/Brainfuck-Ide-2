"use strict";
var InterpretManager = (function () {
    function InterpretManager(curFile, contentPointer, memory, memoryPointer, caseStack, output, debug) {
        if (curFile === void 0) { curFile = null; }
        if (contentPointer === void 0) { contentPointer = 0; }
        if (memory === void 0) { memory = new Array(30000); }
        if (memoryPointer === void 0) { memoryPointer = 0; }
        if (caseStack === void 0) { caseStack = []; }
        if (output === void 0) { output = ''; }
        if (debug === void 0) { debug = false; }
        this.curFile = curFile;
        this.contentPointer = contentPointer;
        this.memory = memory;
        this.memoryPointer = memoryPointer;
        this.caseStack = caseStack;
        this.output = output;
        this.debug = debug;
        for (var i = 0; i < 30000; i++) {
            this.memory[i] = 0;
        }
    }
    Object.defineProperty(InterpretManager.prototype, "memoryCell", {
        get: function () {
            return this.memory[this.memoryPointer].toString();
        },
        set: function (value) {
            value[0] != '#' ? this.memory[this.memoryPointer] = +value : value.length > 1 ? this.memory[this.memoryPointer] = value[1].charCodeAt(0) : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InterpretManager.prototype, "memoryPointerAttr", {
        get: function () {
            return this.memoryPointer.toString();
        },
        set: function (value) {
            var intvalue = parseInt(value);
            (Number.isInteger(intvalue) && intvalue >= 0) ? this.memoryPointer = intvalue : 0;
        },
        enumerable: true,
        configurable: true
    });
    return InterpretManager;
}());
exports.InterpretManager = InterpretManager;
//# sourceMappingURL=InterpretManager.js.map