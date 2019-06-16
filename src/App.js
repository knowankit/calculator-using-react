import React from 'react';
import './App.scss';

class App extends React.Component {
  constructor() {
    super()
    this.operators = ['/', '*', '+', '-', '%']
    this.numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    this.specialOperators = ['(', ')', '!']
    this.state = {
      isValidExpression: false,
      expression: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.calculate = this.calculate.bind(this)
    this.isOperator = this.isOperator.bind(this)
    this.insert = this.insert.bind(this)
  }

  handleChange(e) {
    this.setState({
      expression: e.target.value
    })
  }

  insert() {
    
  }
  isValidExpression(expression) {
    let isValid = true
    let currentValue = 'number'

    expression.forEach((value, index) => {
      if(currentValue === 'number') {
        let toInt = parseInt(value, 10)
        let isCorrect = this.numbers.includes(toInt)
        if (isCorrect) currentValue = 'numOrOperators'
        else currentValue = 'invalid'
        
      } else if (currentValue === 'numOrOperators') {

        if (this.isOperator(value) && expression[index + 1]) {
          currentValue = 'number'
        } else {
          let toInt = parseInt(value, 10)
          let isCorrect = this.numbers.includes(toInt)

          if (isCorrect) currentValue = 'numOrOperators'
          else isValid = false
        }
      } else {
        isValid = false
      }
    })

    if(isValid) return true
    else return false
  }

  isOperator(operator) {
    if (this.operators.includes(operator)) return true
    else return false
  }

  evaluate (expression) {
    // BDMAS rule ['/', '*', '+', '-', '%']

    let hasSign = null
    for (let index = 0; index < this.operators.length; index++) {
      let operatorIndex = index
      hasSign = expression.includes(this.operators[index])
      while (hasSign) {
        let sign = this.operators[operatorIndex]
        let index = expression.indexOf(sign)
        let exp = [expression[index - 1], sign, expression[index + 1]]
        let v = this.doMaths(exp)
        expression.splice(index - 1, 3, v)
        // console.log(expression)
        hasSign = expression.includes(sign)
      }
    }
    console.log(expression)
    let screen = document.getElementById('result')
    screen.value = expression[0]
  }

  doMaths(e) {
    let firstNum = parseInt(e[0])
    let secondNum = parseInt(e[2])
    let sign = e[1]
    switch (sign) {
      case '*': return firstNum * secondNum
      case '+': return firstNum + secondNum
      case '-': return firstNum - secondNum
      case '/': return firstNum / secondNum
      case '%': return firstNum % secondNum
    
      default:
        break;
    }
    return firstNum * secondNum
  }

  calculate() {
    const expressionArray = this.state.expression.split('')
  
    if (this.isValidExpression(expressionArray)) {
      const mergedArray = []
      let nums = ''

      expressionArray.forEach(value => {
        let numValue = parseInt(value)
        let isNum = this.numbers.includes(numValue)

        if (isNum) {
          nums = nums + numValue
          let lastInsertedNumber = parseInt(mergedArray[mergedArray.length - 1])
          if (!isNaN(lastInsertedNumber)) mergedArray.pop()
          mergedArray.push(nums)
        } else {
          nums = ''
          mergedArray.push(value)
        }
      })

      console.log(mergedArray)
      this.evaluate(mergedArray)
      console.log('Correct')
    } else {
      console.log('error')
    }
    
  }

render() {
    return (
      <div className="App">
        <div className='calculator mx-auto'>
          <div>
            <input type='text' onChange={this.handleChange} id='result'/>
          </div>
          <div className='d-flex'>
            <div className='flex-grow-1'><button>Clear</button></div>
            <div className='flex-grow-1'><button>+</button></div>
          </div>
          <div className='d-flex'> 
            <button onClick={this.insert('1')}>1</button>
            <button>2</button>
            <button>3</button>
            <button>-</button>
          </div>
          <div className='d-flex'>
            <button>4</button>
            <button>5</button>
            <button>6</button>
            <button>*</button>
          </div>
          <div className='d-flex'>
            <button>7</button>
            <button>8</button>
            <button>9</button>
            <button>/</button>
          </div>
          <div className='d-flex'>
            <button>0</button>
            <button>.</button>
            <button onClick={this.calculate}>=</button>
          </div>
        </div>
        <button onClick={this.calculate}>Calculate</button>
      </div>
    )
  }
}

export default App;
