import { describe, test, it, expect} from 'vitest'
import { factorial, fizzBuzz, max } from '../src/intro'

describe('max function', () => {
    it('should return the first argument if it is greater', () => {
        expect(max(2, 1)).toBe(2);
    });
    
})
describe('fizzbuzz function', () => {
    it('should return fizzbuzz if it"s devisible by five', ()=>{
        expect(fizzBuzz(15)).toBe('FizzBuzz');
        expect(fizzBuzz(3)).toBe('Fizz');
        expect(fizzBuzz(5)).toBe('Buzz');
        expect(fizzBuzz(2)).toBe('2');
    })
})

describe('Factorial TDD', () => {
    it('should return 1 if it"s passed 0', () => {
        expect(factorial(0)).toBe(1);
    })
    it('should return 1 if it"s passed 1', () => {
        expect(factorial(1)).toBe(1);
    })
    it('should return 2 if it"s passed 2', () => {
        expect(factorial(2)).toBe(2);
    })
    it('should return undefined if it"s passed a negative number', () => {
        expect(factorial(-2)).toBe(undefined);
    })
})