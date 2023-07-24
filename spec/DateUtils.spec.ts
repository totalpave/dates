
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

    describe('elapsedTimeToString', () => {
        it('30 seconds should be 30s', () => {
            expect(DateUtils.elapsedTimeToString(30)).toBe('30s');
        });

        it('90 seconds should be 1m 30s', () => {
            expect(DateUtils.elapsedTimeToString(90)).toBe('1m 30s');
        });

        it('3600 seconds should be 1h', () => {
            expect(DateUtils.elapsedTimeToString(3600)).toBe('1h');
        });

        it('93785 seconds should be 1d 2h 3m 5s', () => {
            expect(DateUtils.elapsedTimeToString(93785)).toBe('1d 2h 3m 5s');
        });
    });

    describe('Timezones', () => {
        let utc: Date = new Date();
        utc.setHours(0);
        utc.setMinutes(0);
        utc.setSeconds(0);
        utc.setMilliseconds(0);

        let offset: number = 0;

        beforeEach(() => {
            offset = 0;
        });

        it('GMT -3', () => {
            offset = 180;

            let date: Date = DateUtils.applyTimezoneOffset(utc, offset);
            expect(date.getHours()).toBe(21);
            expect(date.getMinutes()).toBe(0);
        });

        it('GMT +3', () => {
            offset = -180;

            let date: Date = DateUtils.applyTimezoneOffset(utc, offset);
            expect(date.getHours()).toBe(3);
            expect(date.getMinutes()).toBe(0);
        });
    });
});
