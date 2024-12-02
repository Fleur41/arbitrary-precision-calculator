export class BigInteger {
  constructor(value = '0') {
    // Store digits in reverse order for easier arithmetic
    this.digits = String(value).replace(/^-/, '').split('').reverse().map(Number);
    this.isNegative = String(value).startsWith('-');
  }

  static fromArray(digits, isNegative = false) {
    const num = new BigInteger('0');
    num.digits = digits;
    num.isNegative = isNegative;
    return num;
  }

  toString() {
    if (this.digits.length === 1 && this.digits[0] === 0) return '0';
    let result = this.digits.reverse().join('');
    return this.isNegative ? '-' + result : result;
  }

  add(other) {
    if (this.isNegative !== other.isNegative) {
      if (this.isNegative) {
        const positive = new BigInteger(this.toString().slice(1));
        return other.subtract(positive);
      } else {
        const positive = new BigInteger(other.toString().slice(1));
        return this.subtract(positive);
      }
    }

    const maxLength = Math.max(this.digits.length, other.digits.length);
    const result = [];
    let carry = 0;

    for (let i = 0; i < maxLength || carry; i++) {
      const sum = (this.digits[i] || 0) + (other.digits[i] || 0) + carry;
      result.push(sum % 10);
      carry = Math.floor(sum / 10);
    }

    return BigInteger.fromArray(result, this.isNegative);
  }

  subtract(other) {
    if (this.isNegative !== other.isNegative) {
      const otherPositive = new BigInteger(other.toString().slice(1));
      return this.add(otherPositive);
    }

    let comparison = this.compareAbsolute(other);
    if (comparison === 0) return new BigInteger('0');

    let greater, smaller, resultNegative;
    if (comparison > 0) {
      greater = this;
      smaller = other;
      resultNegative = this.isNegative;
    } else {
      greater = other;
      smaller = this;
      resultNegative = !this.isNegative;
    }

    const result = [];
    let borrow = 0;

    for (let i = 0; i < greater.digits.length; i++) {
      let diff = greater.digits[i] - (smaller.digits[i] || 0) - borrow;
      if (diff < 0) {
        diff += 10;
        borrow = 1;
      } else {
        borrow = 0;
      }
      result.push(diff);
    }

    // Remove trailing zeros
    while (result.length > 1 && result[result.length - 1] === 0) {
      result.pop();
    }

    return BigInteger.fromArray(result, resultNegative);
  }

  multiply(other) {
    if (this.isZero() || other.isZero()) return new BigInteger('0');

    const result = new Array(this.digits.length + other.digits.length).fill(0);

    for (let i = 0; i < this.digits.length; i++) {
      let carry = 0;
      for (let j = 0; j < other.digits.length || carry; j++) {
        const product = result[i + j] + this.digits[i] * (other.digits[j] || 0) + carry;
        result[i + j] = product % 10;
        carry = Math.floor(product / 10);
      }
    }

    // Remove trailing zeros
    while (result.length > 1 && result[result.length - 1] === 0) {
      result.pop();
    }

    return BigInteger.fromArray(result, this.isNegative !== other.isNegative);
  }

  divideAndRemainder(divisor) {
    if (divisor.isZero()) {
      throw new Error('Division by zero');
    }

    if (this.compareAbsolute(divisor) < 0) {
      return {
        quotient: new BigInteger('0'),
        remainder: new BigInteger(this.toString())
      };
    }

    let quotient = new BigInteger('0');
    let remainder = new BigInteger(this.toString());
    remainder.isNegative = false;
    const divisorAbs = new BigInteger(divisor.toString());
    divisorAbs.isNegative = false;

    const divisorShifted = new BigInteger(divisorAbs.toString());
    let shift = remainder.digits.length - divisorAbs.digits.length;
    
    for (let i = 0; i < shift; i++) {
      divisorShifted.digits.unshift(0);
    }

    while (shift >= 0) {
      while (remainder.compareAbsolute(divisorShifted) >= 0) {
        remainder = remainder.subtract(divisorShifted);
        quotient.digits[shift] = (quotient.digits[shift] || 0) + 1;
      }
      divisorShifted.digits.shift();
      shift--;
    }

    // Set correct signs
    quotient.isNegative = this.isNegative !== divisor.isNegative;
    remainder.isNegative = this.isNegative;

    return { quotient, remainder };
  }

  factorial() {
    if (this.isNegative) {
      throw new Error('Factorial is not defined for negative numbers');
    }
    if (this.isZero()) return new BigInteger('1');
    
    let result = new BigInteger('1');
    let current = new BigInteger(this.toString());
    
    while (!current.isZero()) {
      result = result.multiply(current);
      current = current.subtract(new BigInteger('1'));
    }
    
    return result;
  }

  power(exponent) {
    if (exponent.isNegative) {
      throw new Error('Negative exponents are not supported');
    }
    if (exponent.isZero()) return new BigInteger('1');
    if (this.isZero()) return new BigInteger('0');

    let result = new BigInteger('1');
    let base = new BigInteger(this.toString());
    let exp = new BigInteger(exponent.toString());

    while (!exp.isZero()) {
      if (exp.digits[0] % 2 === 1) {
        result = result.multiply(base);
      }
      base = base.multiply(base);
      exp = exp.divideAndRemainder(new BigInteger('2')).quotient;
    }

    return result;
  }

  isZero() {
    return this.digits.length === 1 && this.digits[0] === 0;
  }

  compareAbsolute(other) {
    if (this.digits.length !== other.digits.length) {
      return this.digits.length - other.digits.length;
    }
    
    for (let i = this.digits.length - 1; i >= 0; i--) {
      if (this.digits[i] !== other.digits[i]) {
        return this.digits[i] - other.digits[i];
      }
    }
    
    return 0;
  }
}