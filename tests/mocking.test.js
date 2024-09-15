import { vi, it, expect, describe } from 'vitest'
import { getExchangeRate } from '../src/libs/currency';
import { getPriceInCurrency, getShippingInfo } from '../src/mocking';
import { getShippingQuote } from '../src/libs/shipping';
// for mocking a function, we would have to first mock the module that 
// contains that function
vi.mock('../src/libs/currency');
vi.mock('../src/libs/shipping');
describe('test suite', () => {
    it('test case', () => {
        const greet = vi.fn();
        greet.mockImplementation(name => 'hello ' + name);

        const result = greet('ali');

        expect(greet).toHaveBeenCalled();
        expect(greet).toHaveBeenCalledWith('ali');
        expect(greet).toHaveBeenCalledOnce();
    })
});

describe('mocking a function', () => {

    it('should return price in target currency', () => {
        vi.mocked(getExchangeRate).mockReturnValue(1.5);

        const price = getPriceInCurrency(10, 'AUD');

        expect(price).toBe(15);
    });
});

describe('getShippingInfo', () => {

    it('getShippingInfo should return an object is destination is valud', () => {
        vi.mocked(getShippingQuote).mockReturnValue({cost: 10, estimatedDays: 5});

        const result = getShippingInfo('qom');
        expect(result).toMatch(/shipping cost: \$10 \(5 days\)/i);
    });
    it('should return unavailble if destination is not valid', () => {
        vi.mocked(getShippingQuote).mockReturnValue(null);

        const result = getShippingInfo('qom');
        expect(result).toMatch(/unavailable/i);
    });
});

describe('renderPage', () => {
    it('should return correct content', async () => {
      const result = await renderPage();
  
      expect(result).toMatch(/content/i);
    });
  
    it('should call analytics', async () => {
      await renderPage();
  
      expect(trackPageView).toHaveBeenCalledWith('/home');
    });
  });