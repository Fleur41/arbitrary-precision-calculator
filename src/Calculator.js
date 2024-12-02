import { BigInteger } from './BigInteger.js';

export class Calculator {
  constructor() {
    this.variables = new Map();
  }

  evaluate(expression) {
    try {
      expression = expression.trim();
      
      // Handle variable assignment
      if (expression.includes('=')) {
        const [varName, expr] = expression.split('=').map(s => s.trim());
        if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(varName)) {
          throw new Error('Invalid variable name');
        }
        const result = this.evaluateExpression(expr);
        this.variables.set(varName, result);
        return result;
      }
      
      return this.evaluateExpression(expression);
    } catch (error) {
      return `Error: ${error.message}`;
    }
  }

  evaluateExpression(expr) {
    expr = expr.replace(/\s+/g, '');
    
    // Handle factorial
    if (expr.includes('!')) {
      const base = expr.slice(0, -1);
      return this.parseNumber(base).factorial();
    }

    // Handle power
    if (expr.includes('^')) {
      const [base, exp] = expr.split('^');
      return this.parseNumber(base).power(this.parseNumber(exp));
    }

    // Handle basic arithmetic
    const tokens = expr.match(/[-+]?[a-zA-Z0-9_]+|[\+\-\*\/%]/g) || [];
    if (!tokens.length) return new BigInteger('0');

    let result = this.parseNumber(tokens[0]);
    
    for (let i = 1; i < tokens.length; i += 2) {
      const operator = tokens[i];
      const operand = this.parseNumber(tokens[i + 1]);

      switch (operator) {
        case '+':
          result = result.add(operand);
          break;
        case '-':
          result = result.subtract(operand);
          break;
        case '*':
          result = result.multiply(operand);
          break;
        case '/':
          result = result.divideAndRemainder(operand).quotient;
          break;
        case '%':
          result = result.divideAndRemainder(operand).remainder;
          break;
        default:
          throw new Error(`Unknown operator: ${operator}`);
      }
    }

    return result;
  }

  parseNumber(token) {
    if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(token)) {
      if (!this.variables.has(token)) {
        throw new Error(`Undefined variable: ${token}`);
      }
      return this.variables.get(token);
    }
    return new BigInteger(token);
  }
}