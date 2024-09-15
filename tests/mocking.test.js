import { vi, it, expect, describe } from 'vitest'

describe('test suite', () => {
    it('test case', () => {
        const greet = vi.fn();
        greet.mockImplementation(name => 'hello ' + name);

        const result = greet('ali');

        expect(greet).toHaveBeenCalled();
        expect(greet).toHaveBeenCalledWith('ali');
        expect(greet).toHaveBeenCalledOnce();
    })
})