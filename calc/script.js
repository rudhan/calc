class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement
      this.currentOperandTextElement = currentOperandTextElement
      this.silFunciton()
    }
  
    silFunciton() {
      this.currentOperand = ''
      this.previousOperand = ''
      this.operation = undefined
    }
  
    delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    /*sin(number){
        Math.sin(number)
    }*/
  
    recursiveAdd(number) {
      if (number === '.' && this.currentOperand.includes('.')) return
      this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    // her operator eklendiğinde current operand ı alıp tokenlist e pushluyoruz
    chooseOperation(operation) {
      if (this.currentOperand === '') return
      tokenList.push(this.currentOperand)
      tokenList.push(operation)
      this.operation = operation
      this.previousOperand = this.currentOperand
      this.previousOperand = this.operation
      this.currentOperand = ''
    }
    
    getOperator(operation){
      var precendenceID
      switch(this.operation){
        case '+':
          precendenceID = 0 ;
          break
        case '-':
          precendenceID = 0 ;
          break
        case '/':
          precendenceID = 1 ;
          break
        case '*':
          precendenceID = 1 ;
          break
        default:
        return
      }
      this.operation=precendenceID
    }

    //precedence = öncelik 
    //öncelik sırası var mı kontrol edilecek
    //eğer precedenceID düşükse öncelikği daha azdır
    //yüksek değer = yüksek öncelik 
    hasPrecedence(operation1,operation2){
      if(getOperator(operation1) != undefined) // daha sonra sadece tek eleman alan fonksiyonlar eklenirse
         return this.getOperator(this.operation1)>=this.getOperator(this.operation2)
      
    }

    shuntingYard (){
      
      
      for(var i = 0; i < tokenList.length; i++) {
        if(!isNaN(tokenList[i])) {  
          valStack.push(tokenList[i]);
        } else if(tokenList[i] === leftParenthesis) { 
          opStack.push(tokenList[i]);
        } else if(tokenList[i] === rightParenthesis) { 
          while(opStack[opStack.length - 1] !== leftParenthesis) { 
            var operator = getOperator(opStack.pop());
            if(operator.numOperands === 1)
              valStack.push(applyOperator(operator, [valStack.pop()]));
            else
              valStack.push(applyOperator(operator, [valStack.pop(), valStack.pop()]));
            }
          opStack.pop();
        } else {
          while(opStack.length > 0 && hasPrecedence(opStack[opStack.length - 1], tokenList[i])) {
            var operator = getOperator(opStack.pop());
            valStack.push(hesap(operator, [valStack.pop(), valStack.pop()]));
          }
          opStack.push(tokenList[i]);
        }
      }
      
      while(opStack.length > 0) {  
        var operator = getOperator(opStack.pop());
        valStack.push(hesap(operator, [valStack.pop(), valStack.pop()]));
      }
    }
    // son iki değeri ve operatoru alarak hesap
    hesap(operator,valS) {
      var finalize =''
      var prev = parseFloat(vals[0])
      var current = parseFloat(vals[1])
      if (isNaN(prev) || isNaN(current)) return // hata gönderiyor mu
      switch (this.operation) {
        case '+':
          finalize = prev + current
          break
        case '-':
          finalize = prev - current
          break
        case '*':
          finalize = prev * current
          break
        case '÷':
          finalize =  prev / current          
          break
        default:
          return
      }
      this.operation = undefined
      this.previousOperand = ''
      return finalize
    }
  
    getDisplayNumber(character) {
      const stringNumber = character.toString()
      const integerDigits = parseFloat(stringNumber.split('.')[0])
      const decimalDigits = stringNumber.split('.')[1]
      let integerDisplay
      if (isNaN(integerDigits)) {
        integerDisplay = ''
      } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
      }
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
      } else {
        return integerDisplay
      }
    }
    //sıfırıncı elemanı al ve görüntüle 
    updateDisplay() {
      this.currentOperandTextElement.innerText =this.getDisplayNumber(valStack[0])
      if (this.operation != null) {
        this.previousOperandTextElement.innerText =`${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
      } else {
        this.previousOperandTextElement.innerText = ''
      }
    }
  }
  
  
  const numberButtons = document.querySelectorAll('[data-numbers]')
  const operationButtons = document.querySelectorAll('[data-operation]')
  const equalsButton = document.querySelector('[data-equals]')
  const deleteButton = document.querySelector('[data-delete]')
  const allClearButton = document.querySelector('[data-AC]')
  const leftParenthesis = document.querySelector('[data-left-parenthesis]')
  const rightParenthesis = document.querySelector('[data-right-parenthesis]')
  const previousOperandTextElement = document.querySelector('[data-previous-operand]')
  const currentOperandTextElement = document.querySelector('[data-current-operand]')
  const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)
  var tokenList= [] //tüm elemanların listesi
  var valStack = [] //rakamların sadizisi
  var opStack = []   //işlemlerin dizisi
  
  numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.recursiveAdd(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  equalsButton.addEventListener('click', button => {
    calculator.shuntingYard()
    calculator.updateDisplay()
  })
  
  allClearButton.addEventListener('click', button => {
    calculator.silFunciton()
    calculator.updateDisplay()
  })
  
  deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
  })

  leftParenthesis.addEventListener('click', button => {
    calculator.recursiveAdd(button.innerText)
    calculator.updateDisplay()
  })

  rightParenthesis.addEventListener('click', button => {
    calculator.recursiveAdd(button.innerText)
    calculator.updateDisplay()
  })
