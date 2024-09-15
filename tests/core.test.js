import { describe, it, expect} from 'vitest'
import {getCoupons, calculateDiscount, isPriceInRange, canDrive} from '../src/core';


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