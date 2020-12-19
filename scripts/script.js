class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.previousOperand = "";
    this.currentOperand = "";
    this.operation = null;
    this.isComputed = false;
  }

  delete() {
    if (this.isComputed === true) {
      this.clear();
    }
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (this.currentOperand.toString().length >= 42) return;
    if (this.isComputed === true || this.currentOperand === "Undefined") {
      this.clear();
    }
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  choseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    if (this.currentOperand === Infinity || isNaN(this.currentOperand)) return;
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
    this.isComputed = false;
  }

  compute() {
    let computation;
    const previous = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(previous) || isNaN(current)) return;
    switch (this.operation) {
      case "/":
        computation = previous / current;
        break;
      case "x":
        computation = previous * current;
        break;
      case "+":
        computation = previous + current;
        break;
      case "-":
        computation = previous - current;
        break;
      default:
        return;
    }
    if (isNaN(computation)) {
      this.currentOperand = "Undefined";
    } else {
      this.currentOperand = computation;
    }

    this.previousOperand = "";
    this.operation = null;
    this.isComputed = true;
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperand;
    if (this.operation !== null) {
      this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }
}

const previousOperandTextElement = document.querySelector(".previous-operand");
const currentOperandTextElement = document.querySelector(".current-operand");
const numberButtons = document.querySelectorAll(".number");
const operationButtons = document.querySelectorAll(".operation");
const allClearButton = document.querySelector(".all-clear");
const deleteButton = document.querySelector(".delete");
const equalsButton = document.querySelector(".equals");

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.choseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
