export function infixToRPN(input) {
  const precedence = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2,
  };

  const output = [];
  const operators = [];

  const tokens = input.match(/\d+|[()+\-*/]/g);

  for (const token of tokens) {
    if (!isNaN(token)) {
      output.push(token);
    } else if (token === "(") {
      operators.push(token);
    } else if (token === ")") {
      while (operators.length && operators[operators.length - 1] !== "(") {
        output.push(operators.pop());
      }
      operators.pop();
    } else {
      while (operators.length && precedence[operators[operators.length - 1]] >= precedence[token]) {
        output.push(operators.pop());
      }
      operators.push(token);
    }
  }

  while (operators.length) {
    output.push(operators.pop());
  }

  return output.join(" ");
}

export function calculateRPN(rpn) {
  const tokens = rpn.split(" ");
  const stack = [];

  for (const token of tokens) {
    if (!isNaN(token)) {
      stack.push(Number(token));
    } else {
      const b = stack.pop();
      const a = stack.pop();
      switch (token) {
        case "+":
          stack.push(a + b);
          break;
        case "-":
          stack.push(a - b);
          break;
        case "*":
          stack.push(a * b);
          break;
        case "/":
          if (b === 0) {
            throw new Error("Деление на 0");
          }
          stack.push(a / b);
          break;
        default:
          throw new Error("Неверный оператор");
      }
    }
  }

  if (stack.length !== 1) {
    throw new Error("Invalid expression");
  }

  return stack[0];
}