// Since Objects are not primitive types if they change then the things pointing to it will also see the changes!
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
    calculator(this.id);
}

function calculator(input) {
    assign(input);
    display.textContent = state.display;
}

function assign(input) {
    let ops = ['+', '-', 'x', '÷'];
    if (ops.includes(input)) {
        if (input === '*') {
            input = 'x';
        } else if (input === '/') {
            input = '÷';
        }
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
    setDisplay();

}

function setDisplay() {
    state.display = `${state.leftOp}${state.op}${state.rightOp}`;
}

function operator() {
    switch (state.op) {
        case '+':
            add();
            break;
        case '-':
            subtract();
            break;
        case 'x':
            multiply();
            break;
        case '÷':
            divide();
            break;
        default:
            state.display = 'please enter a valid expression';
            break;
    }
}

const add = () => {
    console.log('add: ', `${parseInt(state.leftOp) + parseInt(state.rightOp)}`);
    state.result = Number(state.leftOp) + Number(state.rightOp);
    state.leftOp = `${state.result}`;
    state.op = state.buffer;
    state.rightOp = '';
    state.display = `${state.result}${state.op}`;
}

const subtract = () => {
    state.result = Number(state.leftOp) - Number(state.rightOp);
    state.leftOp = `${state.result}`;
    state.op = state.buffer;
    state.rightOp = '';
    state.display = `${state.result}${state.op}`;
}

const multiply = () => {
    state.result = Number(state.leftOp) * Number(state.rightOp);
    state.leftOp = `${state.result}`;
    state.op = state.buffer;
    state.rightOp = '';
    state.display = `${state.result}${state.op}`;
}

const divide = () => {
    state.result = Number(state.leftOp) / Number(state.rightOp);
    state.leftOp = `${state.result}`;
    state.op = state.buffer;
    state.rightOp = '';
    state.display = `${state.result}${state.op}`;
}

function clear() {
    state.display = '';
    state.leftOp = '';
    state.op = '';
    state.rightOp = '';
    state.buffer = '';
    display.textContent = state.display;
}

const equalsTo = () => {
    if (state.isExpression) {
        operator();
        console.log(state.display);
        state = { 
            ...state,
            'op': '',
            'rightOp': '',
            'result': 0,
            'isExpression': false,
        };
        display.textContent = state.display;
    }    
}

// Previous Approach without BackSpace logic:
// let leftOp = '';
// let op = '';
// let rightOp = '';
// let display = document.querySelector('.display-text');
// display.textContent = '';
// let expressionMap = { leftOp, op, rightOp };
// let buffer = '';
// const body = document.querySelector('body');

// document.querySelectorAll('button').forEach(
//     button => button.addEventListener('click', buttonClick)
// );

// function buttonClick() {
//     console.log(this.id);
//     if (this.id === 'clear') {
//         clear();
//         return;
//     } else if(this.id === '=') {
//         equalsTo();
//         return;
//     }
//     calculator(this.id);
// }

// function calculator(input) {
//     // console.log('input: ', input);
//     expressionMap = assign(input);
//     // console.log('expressionMap: ', expressionMap);
//     leftOp = expressionMap.leftOp;
//     op = expressionMap.op;
//     rightOp = expressionMap.rightOp;
//     display.textContent = expressionMapToExpression(expressionMap);
//     // console.log('display: ', display.textContent);
// }

// function assign(input) {
//     let ops = ['+', '-', '*', '/'];
//     if (ops.includes(input)) {
//         let isExpression = expressionCheck(leftOp, op, rightOp);
//         if (isExpression) {
//             buffer = input;
//             leftOp = operator(op);
//             // console.log('leftop: ', leftOp);
//             return { leftOp, op: '', rightOp: '' };
//         }
//         if (input === '*') {
//             input = 'x';
//         } else if (input === '/') {
//             input = '÷';
//         }
//         op = input;
//     } else if (leftOp && op) {
//         rightOp += input;
//     } else {
//         leftOp += input;
//     }
//     // console.log('assign: ',leftOp, rightOp, op, input);
//     return { leftOp, op, rightOp };
// }

// function expressionCheck(leftOp, op, rightOp) {
//     // console.log('expressioncheck: ', ((leftOp && op) && rightOp));
//     return (leftOp && op && rightOp);
// }

// function expressionMapToExpression(expressionMap) {
//     let expression = '';
//     if (expressionMap.leftOp) {
//         expression += `${expressionMap.leftOp}`;
//     }
//     if (expressionMap.op) {
//         expression += `${expressionMap.op}`;
//     }
//     if (expressionMap.rightOp) {
//         expression += `${expressionMap.rightOp}`;
//     }
//     // console.log('expression: ', expression);
//     return expression;
// }

// function operator(op) {
//     let result = '';
//     // console.log(op);
//     switch (op) {
//         case '+':
//             result = add();
//             break;
//         case '-':
//             result = subtract();
//             break;
//         case 'x':
//             result = multiply();
//             break;
//         case '÷':
//             result = divide();
//             break;
//         default:
//             display.textContent = 'please enter a valid expression';
//             break;
//     }
//     return result;
// }

// const add = () => {
//     // console.log('add: ', `${parseInt(leftOp) + parseInt(rightOp)}`);
//     return `${Number(leftOp) + Number(rightOp)}`;
// }

// const subtract = () => {
//     return `${Number(leftOp) - Number(rightOp)}`;
// }

// const multiply = () => {
//     return `${Number(leftOp) * Number(rightOp)}`;
// }

// const divide = () => {
//     return `${Number(leftOp) / Number(rightOp)}`;
// }

// const clear = () => {
//     display.textContent = '';
//     expressionMap.leftOp = '';
//     expressionMap.op = '';
//     expressionMap.rightOp = '';
//     leftOp = '';
//     op = '';
//     rightOp = '';
// }

// const equalsTo = () => {
//     leftOp = operator(op);
//     expressionMap = { leftOp, op: '', rightOp: '' };
//     leftOp = expressionMap.leftOp;
//     op = expressionMap.op;
//     rightOp = expressionMap.rightOp;
//     display.textContent = expressionMapToExpression(expressionMap);
// }
