
import {DateUtils} from '../src/DateUtils';

describe('DateUtils', () => {
    describe('getYearDifference', () => {
        it('2018-2019', () => {
            let start: Date = new Date(2018, 1, 1);
            let end: Date = new Date(2019, 1, 1);
    
            expect(DateUtils.getYearDifference(start, end)).toBe(1);
        });
    
        it('2017-05-3 - 2019-06-26', () => {
            let start: Date = new Date(2017, 4, 3);
            let end: Date = new Date(2019, 5, 26);
    
            expect(DateUtils.getYearDifference(start, end, true)).toBe(2.15);
        });
    
        it('1995-06-01 -> 2016-08-12', () => {
            let start: Date = new Date(1995, 5, 1);
            let end: Date = new Date(2016, 7, 12);
            expect(DateUtils.getYearDifference(start, end, true))
        });
    });

    describe('Adding/Subtracting Year Diffs', () => {
        let date: Date = new Date(2018, 1, 1);

        it('add', () => {
            expect(DateUtils.addYearDifference(date, 1).getFullYear()).toBe(2019);
        });

        it('subtract', () => {
            expect(DateUtils.subtractYearDifference(date, 1).getFullYear()).toBe(2017);
        });
    });

    describe('getStartOfYearDate', () => {
        let year: number = 2015;

        it('returns date with correct year', () => {
            expect(DateUtils.getStartOfYearDate(year).getFullYear()).toBe(year);
        });

        it('will never be greater than an date of the same year', () => {
            let date = DateUtils.getStartOfYearDate(year);
            let startOfYearDate = new Date(year, 0, 1, 0, 0, 0, 0);
            let almostStartOfYearDate = new Date(new Date(year, 0, 1, 0, 0, 0, 0).setMilliseconds(1));

            expect(date.getTime()).toBe(startOfYearDate.getTime());
            expect(date.getTime() < almostStartOfYearDate.getTime()).toBe(true);
        });
    });

    describe('getEndOfYearDate', () => {
        let year: number = 2015;

        it('returns date with correct year', () => {
            expect(DateUtils.getEndOfYearDate(year).getFullYear()).toBe(year);
        });

        it('will never be less than an date of the same year', () => {
            let date = DateUtils.getEndOfYearDate(year);
            let endOfYearDate = new Date(new Date(year + 1, 0, 1, 0, 0, 0, 0).setMilliseconds(-1));
            let almostEndOfYearDate = new Date(new Date(year + 1, 0, 1, 0, 0, 0, 0).setMilliseconds(-2));

            expect(date.getTime()).toBe(endOfYearDate.getTime());
            expect(date.getTime() > almostEndOfYearDate.getTime()).toBe(true);
        });
    });
});
