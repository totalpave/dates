
import {DateFormatter} from '../src/DateFormatter';

describe('DateFormatter', () => {
    let date = new Date(2018, 0, 1, 0, 0, 0, 0);
    let expectation = 'Jan 1, 2018';

    it('formats short dates (static)', () => {
        expect(DateFormatter.format(date, DateFormatter.SHORT_DATE)).toBe(expectation);
    });

    it('format short dates', () => {
        let formatter = new DateFormatter();
        expect(formatter.format(date)).toBe(expectation);
    });

    it('formats datetime', () => {
        expect(DateFormatter.format(date, DateFormatter.DATETIME)).toBe('2018/01/01 - 00:00:00');
    });

    it('formats datetime for csv', () => {
        expect(DateFormatter.format(date, DateFormatter.DATETIME_CSV)).toBe('2018-01-01 00:00:00');
    });

    it('Instance vs static default formats are the same', () => {
        let formatter = new DateFormatter();
        let instanceFormat = formatter.format(date);
        let staticFormat = DateFormatter.format(date);
        expect(instanceFormat).toBe(staticFormat);
    });
});
