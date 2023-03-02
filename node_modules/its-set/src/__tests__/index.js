/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import itsSet from '../';
const { it } = global;

it('value is set', () => {
  expect(itsSet('im set')).to.be.true;
  expect(itsSet(false)).to.be.true;
  expect(itsSet(33)).to.be.true;
});

it('value is not set', () => {
  expect(itsSet(undefined)).to.be.false;
  expect(itsSet(null)).to.be.false;
});

it('nested value is set', () => {
  expect(itsSet({foo: {bar: {baz: 'im set'}}}, 'foo.bar.baz')).to.be.true;
});

it('nested value is not set', () => {
  expect(itsSet({ foo: { bar: {} } }, 'foo.bar.baz')).to.be.false;
  expect(itsSet({ foo: { bar: { baz: null } } }, 'foo.bar.baz')).to.be.false;
});
