import { calcProfit, calcGain } from './TableContainer';


describe('Current profit', () => {
    it('will check negative profit', () => {
        expect(calcProfit(5, 10, 10, 2, 2)).toEqual(-53);
    });

    it('will check positive profit', () => {
        // 2.97 - 1.01
        expect(calcProfit(10, 5, 10, 2, 2)).toEqual(47);
    });
});

describe('Current gain', () => {
    // 0
    it('will check 0 profit', () => {
        expect(calcGain(0, 100, 10, 0, 0)).toEqual(-100);
    });

    // -100
    it('will check -25 profit', () => {
        expect(calcGain(25, 100, 10, 0, 0)).toEqual(-75);
    });

    // -100
    it('will check -50 profit', () => {
        expect(calcGain(50, 100, 10, 0, 0)).toEqual(-50);
    });

    // -200
    it('will check 0 profit', () => {
        expect(calcGain(100, 100, 10, 0, 0)).toEqual(0);
    });

    // -400
    it('will check 100 profit', () => {
        expect(calcGain(200, 100, 10, 0, 0)).toEqual(100);
    });

    // 100
    it('will check 200 profit', () => {
        expect(calcGain(300, 100, 10, 0, 0)).toEqual(200);
    });
});