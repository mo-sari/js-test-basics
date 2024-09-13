import { describe, test, it, expect, isFirstRun} from 'vitest'
import {getCoupons, calculateDiscount, isPriceInRange} from '../src/core';

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