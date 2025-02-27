import {formatCurrency} from '../scripts/utils/money.js'


describe('test suite:formatCurrency',()=>{

    describe('round off',()=>{
        it('rounds of ',()=>{
            expect(formatCurrency(100.01)).toEqual('1.00');
        });
    });

    it('convert cents into dollars',()=>{
        expect(formatCurrency(2095)).toEqual('20.95');
    });

    it('works with zero',()=>{
        expect(formatCurrency(0)).toEqual('0.00');
    });
});