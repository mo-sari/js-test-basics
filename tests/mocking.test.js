import { vi, it, expect, describe } from 'vitest'

describe('test suite', () => {
    it('test case', () => {
        const greet = vi.fn();
        // this below is how to mcok a function which returns a value:
        // greet.mockReturnThis('hello');

        // const result = greet();
        // console.log(result);

        // this below is how to mock a function which returns a promise:
        // greet.mockResolvedValue('hello')().then(res => console.log(res))
        // or
        greet.mockResolvedValue('hello');
        greet().then(res => console.log(res));
    })
})