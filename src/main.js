import readline from 'readline';
import { Calculator } from './Calculator.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const calculator = new Calculator();

console.log('Arbitrary Precision Calculator');
console.log('Enter expressions or "exit" to quit');
console.log('Supported operations: +, -, *, /, %, ^, !');
console.log('Example: 123456789 * 987654321');

function prompt() {
  rl.question('> ', (input) => {
    if (input.toLowerCase() === 'exit') {
      rl.close();
      return;
    }

    const result = calculator.evaluate(input);
    console.log(result.toString());
    prompt();
  });
}

prompt();