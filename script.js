function add(num1, num2) {return num1 + num2}
function sub(num1, num2) {return (num1) - (num2)}
function mult(num1, num2) {return num1 * num2}
function div(num1, num2) {return num1 / num2}
function operate(operator, num1, num2) {return operator(num1, num2)}

const startVal = document.querySelector('.display');
const btnInput = document.querySelectorAll("button");
const displayVal = document.createElement('h2');

let tempVal1 = '';
let tempVal2 = '';
let parsedVal1 = 0;
let tempOp;

btnInput.forEach(button => {
  button.addEventListener('click', (e) => {
    
    //Operation Input
    if (e.target.matches(".ops")){
      if (!(tempVal2 === '')){
        let parsedVal2 = parseInt(tempVal2, 10)
        displayVal.textContent += e.target.textContent
        console.log("Now, both ur numbers are saved as actual numbers",parsedVal1, parsedVal2)
        const answer = operate(tempOp, parsedVal1, parsedVal2)
        displayVal.textContent = answer
        tempVal1 = answer
        tempVal2 = ''
        console.log(`values: 
                             answer = ${answer}
                             tempVal1 = ${tempVal1}
                             tempVal2 = ${tempVal2}
                             parsedVal1 = ${parsedVal1}
                             parsedVal2 = ${parsedVal2}`)
        return
      }  
      //Check if theres already an tempVal1 assigned
      else if (!(tempVal1 === '')){
        parsedVal1 = parseInt(tempVal1, 10)
        displayVal.textContent += e.target.textContent
        console.log("Now ur number is saved as an actual number",parsedVal1)

        if (e.target.matches("#add")){
          tempOp = add;
          console.log(add)
          return
        }
        else if (e.target.matches("#sub")){
          tempOp = sub;
          console.log(sub)
          return
        }
        else if (e.target.matches("#mult")){
          tempOp = mult;
          console.log(mult)
          return
        }
        else if (e.target.matches("#div")){
          tempOp = div;
          console.log(div)
          return
        }
        
      } 
      else {
        console.log("you hit an op but there are no numbers")
        return
      }
    }
    
    //Number input
    else if (e.target.matches(".nums")){
      
      //second value
      if (typeof tempOp === "function"){
        tempVal2 += e.target.textContent
        displayVal.textContent += e.target.textContent
        console.log(`your current values:
                     tempVal1 = ${tempVal1}
                     tempVal2 = ${tempVal2}
                     parsedVal1 = ${parsedVal1}`)
        return
      }
      
      //first value
      displayVal.textContent += e.target.textContent
      tempVal1 = displayVal.textContent
      startVal.replaceWith(displayVal)
      console.log(`you hit ${e.target.textContent}`)
      console.log(`your current tempVal1 = ${tempVal1}`)
    }
  })
})
