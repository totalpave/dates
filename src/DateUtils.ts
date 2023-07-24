
import Math from '@totalpave/math';

const DAY_IN_MS: number = 8.64e+7;
const DAYS_IN_YEAR: number = 365;
const RELATIVE_YEAR: number = 31536000000; // ts / 1000ms / 60s / 60m / 24h / 365d

const UNIT_DAY_IN_SECONDS: number = 86400;
const UNIT_HOUR_IN_SECONDS: number = 3600;
const UNIT_MINUTE_IN_SECONDS: number = 60;

/**
 * Utilities for comparing and doing arithmetic for dates
 * @since 1.0
 */
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

    public static getStartOfYearDate(year: number): Date {
        return new Date(year, 0, 1, 0, 0, 0, 0);
    }

    public static getEndOfYearDate(year: number): Date {
        // Create a Date for the very start of the (year + 1); because, this is easier than creating an Date at the end of the year. 
        // Then take the date we created and -1 milliseconds on it to go back to the previous year by 1 millisecond.
        return new Date(DateUtils.getStartOfYearDate(year + 1).setMilliseconds(-1));
    }

    /**
     * Converts seconds to a human readable text: e.g. "1h 30m"
     * @since 2.2.0
     * @param seconds 
     * @returns {string}
     */
    public static elapsedTimeToString(seconds: number): string {
        let parts: Array<string> = [];

        if (seconds >= UNIT_DAY_IN_SECONDS) {
            let days: number = Math.floor(seconds / UNIT_DAY_IN_SECONDS);
            seconds -= days * UNIT_DAY_IN_SECONDS;
            parts.push(`${days}d`);
        }

        if (seconds >= UNIT_HOUR_IN_SECONDS) {
            let hours: number = Math.floor(seconds / UNIT_HOUR_IN_SECONDS);
            seconds -= hours * UNIT_HOUR_IN_SECONDS;
            parts.push(`${hours}h`);
        }

        if (seconds >= UNIT_MINUTE_IN_SECONDS) {
            let minutes: number = Math.floor(seconds / UNIT_MINUTE_IN_SECONDS);
            seconds -= minutes * UNIT_MINUTE_IN_SECONDS;
            parts.push(`${minutes}m`);
        }

        if (seconds > 0) {
            parts.push(`${seconds}s`);
        }

        return parts.join(' ');
    }

    /**
     * Applies a timezone offset to the given date.
     * This method will return a new date instance and leave the given data untouched.
     * 
     * This is to avoid confusion with Date nuances, which always assumes the Date
     * is relative to the system clock/timezone, which is no longer true once
     * you have applied the timezone offset.
     * 
     * The offset number is expected to be a value given from date.getTimezoneOffset().
     * The value represents the number of minutes to UTC. So for -3 GMT dates, the
     * timezone offset will be 180. For +3 GMT dates, then the offset will be -180.
     * 
     * @param date 
     * @param offset 
     * @param mutable 
     * @since 2.4.0
     */
    public static applyTimezoneOffset(date: Date, offset: number) {
        let tzDate = new Date(date);
        tzDate.setMinutes(tzDate.getMinutes() + offset);
        return tzDate;
    }
}
