'use strict';

import {IFormatter} from '@totalpave/interfaces';
// eslint-disable-next-line @typescript-eslint/no-require-imports
import moment = require('moment');

/**
 * Utility for formatting dates.
 * 
 * @since 2.0
 */
export class DateFormatter implements IFormatter<Date, string> {
    private $format: string;

    /**
     * MMM D, YYYY
     * Example: Jan 1, 2003
     */
    public static readonly SHORT_DATE = 'MMM D, YYYY';

    /**
     * MMMM D, YYYY
     * Example: January 1, 2003
     */
    public static readonly LONG_DATE = 'MMMM D, YYYY';

    /**
     * YYYY/MM/DD - HH:mm:ss
     * Example: 2003/01/01 - 14:05:02
     */
    public static readonly DATETIME = 'YYYY/MM/DD - HH:mm:ss';

    /**
     * Intended to be used for CSV/spreadsheets as spreadsheet
     * software will parse this format over DATETIME format.
     * 
     * YYYY-MM-DD HH:mm:ss
     * Example: 2003-01-04 15:02:32
     * 
     * @since 2.1.0
     */
    public static readonly DATETIME_CSV = 'YYYY-MM-DD HH:mm:ss';

    /**
     * Intended to be used to tack on a date onto a filename.
     * 
     * YYYYMMDD
     * Example: 20030104
     * 
     * @since 2.3.0
     */
    public static readonly DATE_FILENAME = 'YYYYMMDD';

    constructor(format?: string) {
        this.$format = format || DEFAULT_FORMAT;
    }

    public format(date: Date): string {
        return moment(date).format(this.$format);
    }

    public static format(date: Date, format?: string): string {
        return moment(date).format(format || DEFAULT_FORMAT);
    }
}

const DEFAULT_FORMAT = DateFormatter.SHORT_DATE;
