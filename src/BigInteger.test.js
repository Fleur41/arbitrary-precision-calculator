import { test } from 'node:test';
import assert from 'node:assert';
import { BigInteger } from './BigInteger.js';

test('BigInteger - Addition', (t) => {
  const num1 = new BigInteger('123456789');
  const num2 = new BigInteger('987654321');
  assert.strictEqual(num1.add(num2).toString(), '1111111110');
});

test('BigInteger - Multiplication', (t) => {
  const num1 = new BigInteger('123456789');
  const num2 = new BigInteger('987654321');
  assert.strictEqual(num1.multiply(num2).toString(), '121932631112635269');
});

test('BigInteger - Factorial', (t) => {
  const num = new BigInteger('5');
  assert.strictEqual(num.factorial().toString(), '120');
});

test('BigInteger - Power', (t) => {
  const base = new BigInteger('2');
  const exp = new BigInteger('10');
  assert.strictEqual(base.power(exp).toString(), '1024');
});