
import Math from '@totalpave/math';

const DAY_IN_MS: number = 8.64e+7;
const DAYS_IN_YEAR: number = 365;
const RELATIVE_YEAR: number = 31536000000; // ts / 1000ms / 60s / 60m / 24h / 365d

export class DateUtils {
    private constructor() {}

    public static getYearDifference(start: Date, end: Date, useFractions: boolean = false): number {
        let result: number;

        if (!useFractions) {
            result = end.getFullYear() - start.getFullYear();
        }
        else {
            let startTime: number = start.getTime();
            let endTime: number = end.getTime();
            let time: number = endTime - startTime;
            let days: number = 0;

            while (time >= DAY_IN_MS) {
                days++;
                time -= DAY_IN_MS;
            }

            result = days / DAYS_IN_YEAR;
        }

        return Math.round(result, 2);
    }

    public static addYearDifference(date: Date, yearDiff: number): Date {
        let ts: number = date.getTime();
        let curYear: number = ts / RELATIVE_YEAR;
        return new Date((curYear + yearDiff) * RELATIVE_YEAR);
    }

    public static subtractYearDifference(date: Date, yearDiff: number): Date {
        return DateUtils.addYearDifference(date, yearDiff * -1);
    }
}
