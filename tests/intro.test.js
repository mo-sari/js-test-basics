import { describe, test, it, expect} from 'vitest'
import { fizzBuzz, max } from '../src/intro'

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