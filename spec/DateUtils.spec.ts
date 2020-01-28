
import {DateUtils} from '../src/DateUtils';

describe('DateUtils', () => {
    describe('getYearDifference', () => {
        it('2018-2019', () => {
            const start: Date = new Date(2018, 1, 1);
            const end: Date = new Date(2019, 1, 1);
    
            expect(DateUtils.getYearDifference(start, end)).toBe(1);
        });
    
        it('2017-05-3 - 2019-06-26', () => {
            const start: Date = new Date(2017, 4, 3);
            const end: Date = new Date(2019, 5, 26);
    
            expect(DateUtils.getYearDifference(start, end, true)).toBe(2.15);
        });
    
        it('1995-06-01 -> 2016-08-12', () => {
            const start: Date = new Date(1995, 5, 1);
            const end: Date = new Date(2016, 7, 12);
            expect(DateUtils.getYearDifference(start, end, true))
        });
    });

    describe('Adding/Subtracting Year Diffs', () => {
        const date: Date = new Date(2018, 1, 1);

        it('add', () => {
            expect(DateUtils.addYearDifference(date, 1).getFullYear()).toBe(2019);
        });

        it('subtract', () => {
            expect(DateUtils.subtractYearDifference(date, 1).getFullYear()).toBe(2017);
        });
    });
});
