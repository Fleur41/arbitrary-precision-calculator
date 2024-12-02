# Arbitrary Precision Integer Calculator

This is an implementation of an arbitrary precision integer calculator that supports basic arithmetic operations without relying on any external libraries for the core functionality.

## Features

- Arbitrary precision integer arithmetic
- Supported operations:
  - Addition (+)
  - Subtraction (-)
  - Multiplication (*)
  - Division (/)
  - Modulo (%)
  - Exponentiation (^)
  - Factorial (!)
- Variable assignment and usage
- Interactive REPL interface

## Usage

Start the calculator:

```bash
npm start
```

Example operations:

```
> 123456789 * 987654321
121932631112635269
> 5!
120
> 2^10
1024
> x = 1234567890
1234567890
> y = x * 2
2469135780
> x + y
3703703670
```

Type 'exit' to quit the calculator.

## Implementation Details

The calculator is implemented in pure JavaScript without using any external libraries for the arithmetic operations. It uses the following key components:

- `BigInteger.js`: Core implementation of arbitrary precision integer arithmetic
- `Calculator.js`: Expression parser and evaluator
- `main.js`: REPL interface

The implementation stores numbers as arrays of digits and performs operations digit by digit, similar to how we do arithmetic by hand.

## Testing

Run the tests:

```bash
npm test
```

## License

MIT