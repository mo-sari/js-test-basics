import { describe, test, it, expect} from 'vitest'
import {getCoupons, calculateDiscount} from '../src/core';

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