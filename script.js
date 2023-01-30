function add(num1, num2) {return num1 + num2}
function sub(num1, num2) {return (num1) - (num2)}
function mult(num1, num2) {return num1 * num2}
function div(num1, num2) {
    if (num2 === 0) {
        alert("No no no u fool, U will break my computer")
        return
    }

    return num1 / num2}
function operate(operator, num1, num2) {return operator(num1, num2)}

function clearOp(){tempOp = undefined;}
function checkOpType(e){
    if (e.target.matches("#add")){
        tempOp = add;
        return
    }
    else if (e.target.matches("#sub")){
        tempOp = sub;
        return
    }
    else if (e.target.matches("#mult")){
        tempOp = mult;
        return
    }
    else if (e.target.matches("#div")){
        tempOp = div;
        return
    }

}

function replaceOp(e){
    clearOp()
    checkOpType(e)
    displayVal.textContent = displayVal.textContent.slice(0, -2) + e.target.textContent
    console.log("u replaced the op w/ ",tempOp)
}

function clear() {
    displayVal.replaceWith(startVal)
    displayVal.textContent = ''
    tempVal1 = ''
    tempVal2 = ''
    clearOp()
}

const startVal = document.querySelector('.display');
const previousAns = document.querySelector('.previousAns');
const btnInput = document.querySelectorAll("button");
const displayVal = document.createElement('h2');

let tempVal1 = '';
let tempVal2 = '';
let parsedVal1 = 0;
let parsedVal2 ;
let tempOp;


btnInput.forEach(button => {
  button.addEventListener('click', (e) => {
    
    //Operation Input
    if (e.target.matches(".ops")){
        //clear button
        if (e.target.id === "clears") {clear()}
        //(4)If the 2nd number is decided, 
        else if (tempVal2 !== ''){

            parsedVal2 = parseFloat(tempVal2, 10)
            displayVal.textContent += e.target.textContent
            const answer = operate(tempOp, parsedVal1, parsedVal2)
            displayVal.textContent = answer
            previousAns.textContent = `${parsedVal1} ${tempOp.name} ${parsedVal2} =`
            console.log(tempOp.name)
            tempVal1 = answer
            tempVal2 = ''
            clearOp();
            console.log(`values: 
                             answer = ${answer}
                             tempOp = ${tempOp}
                             tempVal1 = ${tempVal1}
                             tempVal2 = ${tempVal2}
                             parsedVal1 = ${parsedVal1}
                             parsedVal2 = ${parsedVal2}`)
        return
        }  
        //(2)If the 1st number is decided,
        else if (tempVal1 !== ''){

            //(2.1)save that number (which is temp) into parsed
            parsedVal1 = parseFloat(tempVal1, 10)
            displayVal.textContent += e.target.textContent
            console.log("Now ur number is saved as an actual number",parsedVal1)

            //(2.2)then check for ign input and if there is already a sign replace the sign
            if (typeof tempOp === "function"){
                replaceOp(e)
            }
            else {
                checkOpType(e)
            }
        
        } else {
        //Safeguard users from breaking calc
        console.log("you hit an op but there are no numbers")
        return
        }
    }
    
    //Number input
    else if (e.target.matches(".nums")){
        //breaking my code somehow
    if (parsedVal2 !== undefined) {
            clear()
            parsedVal2 = undefined
    }
      //(3)After an op has been chosen, we can input the 2nd number
      if (typeof tempOp === "function"){
        tempVal2 += e.target.textContent
        displayVal.textContent += e.target.textContent
        console.log(`your current tempVal2 = ${tempVal2}`)
        return
      }
      
      //(1)first value
      displayVal.textContent += e.target.textContent
      tempVal1 = displayVal.textContent
      startVal.replaceWith(displayVal)
      console.log(`your current tempVal1 = ${tempVal1}`)
    }
  })
})

//code breaks when I try to input new numbers after I did a caluclatorion