NumberDisplay = 'number-display';
Numbers = {
    0: '0',
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
    6: '6',
    7: '7',
    8: '8',
    9: '9',
};
Dot = '.';
Operation = {
    add: '+',
    sub: '-',
    mul: '*',
    div: '/',
    eq: '=',
};

class Calculator {
    /**
     * ディスプレイに表示されている数字。
     * @type {string}
     */
    displayNumber = '0';
    /**
     * 直前の計算結果。
     * @type {number}
     */
    _lastResult = 0;
    /**
     * 最後に押された四則演算のボタン。
     * @type {string}
     */
    lastOperation = Operation.eq;
    /**
     * 数字を入力している最中かどうか。
     * @type {boolean}
     */
    numberBeingInput = false;

    /**
     * 直前の計算結果を文字列にキャストして取得する。
     * @returns {string}
     */
    get lastResult() {
        return this._lastResult.toString();
    }

    inputNumber(val) {
        if (!this.numberBeingInput || this.displayNumber === Numbers["0"]) {
            this.displayNumber = val;
        } else {
            this.displayNumber += val;
        }
        this.numberBeingInput = true;
    }

    inputDot() {
        if (!this.numberBeingInput) {
            this.displayNumber = Numbers["0"];
        }
        if (this.displayNumber.indexOf(Dot) < 0) {
            this.displayNumber += Dot;
        }
        this.numberBeingInput = true;
    }

    inputOperation(val) {
        // 末尾にドットが入っていても Number への変換でドットがうまいこと削除されるので、手動でドットを取り除かない
        switch (this.lastOperation) {
            case Operation.add:
                this._lastResult += Number(this.displayNumber);
                break;
            case Operation.sub:
                this._lastResult -= Number(this.displayNumber);
                break;
            case Operation.mul:
                this._lastResult *= Number(this.displayNumber);
                break;
            case Operation.div:
                this._lastResult /= Number(this.displayNumber);
                break;
            default: // イコールの場合はここを通る
                this._lastResult = Number(this.displayNumber);
        }
        this.displayNumber = this.lastResult;
        this.lastOperation = val;
        this.numberBeingInput = false;
    }

    /**
     * ボタンを入力する。四則演算のボタンが押された場合は計算する。
     * @param {string} val - ボタンの値
     */
    inputButton(val) {
        // 下の 3 パターンは互いに排反
        if (Object.values(Operation).indexOf(val) >= 0) {
            this.inputOperation(val);
        } else if (val === Dot) {
            this.inputDot();
        } else if (Object.values(Numbers).indexOf(val) >= 0) {
            this.inputNumber(val);
        }
    }
}

calculator = new Calculator();
document.getElementById(NumberDisplay).innerText = Numbers["0"];

/**
 * 何のボタンが押されたかを送信する。
 * その後、電卓で計算がある場合は計算し、結果をディスプレイにセットする。
 * @param {string} val - ボタン
 */
function sendButtonInfo(val) {
    calculator.inputButton(val);
    document.getElementById(NumberDisplay).innerText = calculator.displayNumber;
}
