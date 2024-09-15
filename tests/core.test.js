import { describe, it, expect, beforeAll, beforeEach, afterEach, afterAll} from 'vitest'
import {getCoupons, calculateDiscount, isPriceInRange, canDrive, fetchData} from '../src/core';
import { Stack } from '../src/core';


describe('Core.getCoupons', () => {
    it('should not be empty', () => {
        const result = getCoupons()
        expect(result.length).toBeGreaterThan(0);
        expect(Array.isArray(result)).toBeTruthy();
    })
    it('should return an array with two object elements in it', () => {
        const result = getCoupons();
        result.forEach(res =>{
            expect(res).toHaveProperty('code');
            expect(res.code).toBeTruthy();
        })
    });
    it('should hava a valid discount property', () => {
        const result = getCoupons();
        result.forEach(res=>{
            expect(res).toHaveProperty('discount');
            expect(res.discount).toBeGreaterThan(0);
        })
    })
});

describe('Core.calculateDiscount', () => {
    it('should return a valid output if correct inputs passed', () => {
        expect(calculateDiscount(10, 'SAVE10')).toBe(9);
        expect(calculateDiscount(10, 'SAVE20')).toBe(8);
    });
    it('should return an error if wrong price type passed', () => {
        expect(calculateDiscount('10', 'SAVE10')).toMatch(/invalid/i);
    });
    it('should return an error if wrong discount type passed', () => {
        expect(calculateDiscount(10, {name:'ali'})).toMatch(/invalid/i);
    });
    it('should work regularly if wrong discount value passed', () => {
        expect(calculateDiscount(10, 'Not Valid')).toBe(10);
    })
})

describe('Core.isPriceInRange', () => {
    it('shoulk return true if price between min and max', () => {
        expect(isPriceInRange(50, 0, 100)).toBe(true);
    });
    it('should return false if price less than min or more than max', () => {
        expect(isPriceInRange(-10, 0, 100)).toBe(false);
        expect(isPriceInRange(200, 0, 100)).toBe(false);
    })
    it('should return true if price is on the edge', () => {
        expect(isPriceInRange(100, 0, 100)).toBe(true);
        expect(isPriceInRange(0, 0, 100)).toBe(true);
    })
})

describe('Core.canDrive', () => {
    it('remember all these epxectations are supposed to be in different d"s', () => {
        expect(canDrive(15, 'IR')).toMatch(/invalid/i);
        
        // right on the edge
        expect(canDrive(16, 'US')).toBeTruthy();
        expect(canDrive(17, 'UK')).toBeTruthy();
        
        // under the limit
        expect(canDrive(15, 'US')).toBeFalsy();
        expect(canDrive(16, 'UK')).toBeFalsy();
        
        // above the limit
        expect(canDrive(17, 'US')).toBeTruthy();
        expect(canDrive(18, 'UK')).toBeTruthy();
    })
})

describe('Core.canDrive', () => {
    it.each([
        {age: 15, country: 'US', result: false},
        {age: 16, country: 'US', result: true},
        {age: 17, country: 'US', result: true},
        {age: 16, country: 'UK', result: false},
        {age: 17, country: 'UK', result: true},
        {age: 18, country: 'UK', result: true},
    ])('should return $result for ($age, $country)', ({age, country, result})=>{
        expect(canDrive(age, country)).toBe(result);
    });
})

describe('Core.isPriceInRange.Parameterizing', () => {
    it.each([
        {scenario: 'price < min',price: -10, result: false},
        {scenario: 'price = min', price: 0, result: true},
        {scenario: 'price between min and max',price: 50, result: true},
        {scenario: 'price = max', price: 100, result: true},
        {scenario: 'price > max', price: 200, result: false},
    ])('should return $result if $scenario', ({ price, result})=>{
        expect(isPriceInRange(price, 0, 100)).toBe(result);
    })
})

describe('fetchData', () => {
    it('should return a promise the will resolve an array of numbers', () => {
        fetchData().then((res)=>{
            expect(Array.isArray(res)).toBe(true);
            expect(res.length).toBeGreaterThan(0);
        }).catch((err)=>{
            expect(err).toHaveProperty('reason');
            expect(err.reason).toMatch(/fail/i)
        })
    })
    it('should return a promise the will resolve an array of numbers',async () => {
        try{
            const response = await fetchData();
            expect(Array.isArray(response)).toBe(true);
            expect(response.length).toBeGreaterThan(0);
        }
        catch(err){
            expect(err).toHaveProperty('reason');
            expect(err.reason).toMatch(/fail/i);
        }
    })
})

describe('Setup and Teardown', () => {
    beforeAll(()=>{
        console.log('beforeAll called');
    });
    beforeEach(()=>{
        console.log('beforeEach called');
    });
    afterEach(()=>{
        console.log('afterEach called');
    });
    afterAll(()=>{
        console.log('afterAll called');
    });
    it('test 1', () => {

    });
    it('test 2', () => {
        
    })
})


describe('Stack', () => {
    let stack;
  
    beforeEach(() => {
      stack = new Stack();
    });
  
    it('push should add an item to the stack', () => {
      stack.push(1);
  
      expect(stack.size()).toBe(1);
    });
  
    it('pop should remove and return the top item from the stack', () => {
      stack.push(1);
      stack.push(2);
  
      const poppedItem = stack.pop();
  
      expect(poppedItem).toBe(2);
      expect(stack.size()).toBe(1);
    });
  
    it('pop should throw an error if stack is empty', () => {
      expect(() => stack.pop()).toThrow(/empty/i);
    });
  
    it('peek should return the top item from the stack without removing it', () => {
      stack.push(1);
      stack.push(2);
  
      const peekedItem = stack.peek();
  
      expect(peekedItem).toBe(2);
      expect(stack.size()).toBe(2);
    });
  
    it('peek should throw an error if stack is empty', () => {
      expect(() => stack.peek()).toThrow(/empty/i);
    });
  
    it('isEmpty should return true if stack is empty', () => {
      expect(stack.isEmpty()).toBe(true);
    });
  
    it('isEmpty should return false if stack is not empty', () => {
      stack.push(1);
  
      expect(stack.isEmpty()).toBe(false);
    });
  
    it('size should return the number of items in the stack', () => {
      stack.push(1);
      stack.push(2);
  
      expect(stack.size()).toBe(2);
    });
  
    it('clear should remove all items from the stack', () => {
      stack.push(1);
      stack.push(2);
  
      stack.clear();
  
      expect(stack.size()).toBe(0);
    });
  });
  