const startVal = document.querySelector('.display');
const previousAns = document.querySelector('.previousAns');
const numsInput = document.querySelectorAll('.nums');
const opsInput = document.querySelectorAll(".ops");
const clearButton = document.querySelector('#clears');
const equalsButton = document.querySelector('#equals');
const delButton = document.querySelector('#delete');

const test = document.querySelectorAll("button");

let tempVal1 = '';
let tempVal2 = '';
let tempOp = null;
let shouldResetDisplay = false;

numsInput.forEach(button => {
    button.addEventListener('click', () => {updateDisplay(button)})
})
opsInput.forEach(button => {
    button.addEventListener('click', () => {setOp(button.textContent)})
})
delButton.addEventListener('click', () => {
    if (startVal.textContent !== "0"){
        startVal.textContent = startVal.textContent.slice(0 , -1)
    }
})

clearButton.addEventListener('click', () => {
    //reset the screen
    startVal.textContent = "0"
    previousAns.textContent = ""
    tempVal1 = ""
    tempVal2 = ""
    tempOp = null
})
equalsButton.addEventListener('click', () => {
    evaluate()
})
function updateDisplay(button){
    if (startVal.textContent === "0" || shouldResetDisplay === true){resetDisplay()}
    startVal.textContent += button.textContent
}
function resetDisplay(){
    startVal.textContent = ""
    shouldResetDisplay = false
}
function setOp(operator){
    if (tempOp !== null) {
    evaluate()
    }
    tempVal1 = startVal.textContent
    tempOp = operator
    previousAns.textContent = `${tempVal1} ${tempOp}`
    shouldResetDisplay = true
}
function evaluate() {
    if (tempOp === null || shouldResetDisplay) return
    tempVal2 = startVal.textContent
    startVal.textContent = operate(tempOp, tempVal1, tempVal2)
    previousAns.textContent = `${tempVal1} ${tempOp} ${tempVal2} = `
    tempOp = null;
    shouldResetDisplay = true;
}
function add(num1, num2) {return num1 + num2}
function sub(num1, num2) {return (num1) - (num2)}
function mult(num1, num2) {return num1 * num2}
function div(num1, num2) {return num1 / num2}
function operate(operator, num1, num2) {
    num1 = Number(num1)
    num2 = Number(num2)

    switch (operator) {
        case "+":
            return add(num1, num2)
        case "-":
            return sub(num1, num2)
        case "÷":
            if (num2 === 0) return 0
            else return div(num1, num2)
        case "×":
            return mult(num1, num2)
    }
}

test.forEach(button => {
    button.addEventListener('click', () => {
        console.log(`values: 
                            startVal = ${startVal.textContent}
                            tempOp = ${tempOp}
                            tempVal1 = ${tempVal1}
                            tempVal2 = ${tempVal2}`)
    })
})
