// Since 'Objects' are not primitive types if they change then the things pointing to it will also see the changes!
let state = {
    'leftOp': '',
    'op': '',
    'rightOp': '',
    'result': 0,
    'display': '0000',
    'buffer': '',
    'isExpression': false,
};

const body = document.querySelector('body');
const display = document.querySelector('.display-text');
display.textContent = state.display;

document.querySelectorAll('button').forEach(
    button => button.addEventListener('click', buttonClick)
);
    
function buttonClick() {
    console.log(this.id);
    if (this.id === 'clear') {
        clear();
        return;
    } else if(this.id === '=') {
        equalsTo();
        return;
    }
    else if (this.id === 'backspace') {
        backspace();
        return;
    }
    calculator(this.id);
}

function calculator(input) {
    assign(input);
}

function assign(input) {
    let ops = ['+', '-', '*', '/'];
    if (ops.includes(input)) {
        if (state.isExpression) {
            state.buffer = input;
            operator();
            return;
        }
        state.op = input;
        state.isExpression = false;
    } else if (state.leftOp && state.op) {
        state.rightOp += input;
        state.isExpression = true;
    } else {
        state.leftOp += input;
        state.isExpression = false;
    }
    setDisplay(`${state.leftOp}${state.op}${state.rightOp}`);
}

function setDisplay(value) {
    state.display = value;
    display.textContent = state.display;
}

function operator() {
    switch (state.op) {
        case '+':
            add();
            break;
        case '-':
            subtract();
            break;
        case '*':
            multiply();
            break;
        case '/':
            divide();
            break;
        default:
            state.display = 'please enter a valid expression';
            break;
    }
    state = { 
        ...state,
        'leftOp': `${state.result}`,
        'op': `${state.buffer}`,
        'buffer': '',
        'rightOp': '',
        'isExpression': false,
    };
    setDisplay(`${state.result}${state.op}`);
}

const add = () => {
    console.log('add: ', `${parseInt(state.leftOp) + parseInt(state.rightOp)}`);
    state.result = Number(state.leftOp) + Number(state.rightOp); //.toFixed(4) would do the job in removing extra values/digits but
    // in floats it also addeds extra 0000 to all the values. Need to look into this later!!
}

const subtract = () => {
    state.result = Number(state.leftOp) - Number(state.rightOp);
}

const multiply = () => {
    state.result = Number(state.leftOp) * Number(state.rightOp);
}

const divide = () => {
    state.result = Number(state.leftOp) / Number(state.rightOp);
}

const clear = () => {
    state.leftOp = '';
    state.op = '';
    state.rightOp = '';
    state.buffer = '';
    setDisplay('');
}

const equalsTo = () => {
    if (state.isExpression) {
        operator();
        console.log(state.display);
        state = { 
            ...state,
            'op': '',
            'buffer': '',
            'rightOp': '',
            'isExpression': false,
        };
        console.log(state);
    }    
}

// Naive approach!
const backspace = () => {
    let length = state.display.length;
    setDisplay(state.display.substring(0, length - 1));
    if (state.isExpression) {
        length = state.rightOp.length;
        state.rightOp = state.rightOp.substring(0, length - 1); 
        if (length - 1 < 1) {
            state.isExpression = false;
        }
    }else if(state.op) {
        state.op = state.op.substring(0,0);
    }else if(state.leftOp) {
        length = state.leftOp.length;
        state.leftOp = state.leftOp.substring(0, length - 1);
    }
    length = undefined;
    console.log(state);
}
