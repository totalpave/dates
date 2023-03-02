'use strict';

import {IFormatter} from '@totalpave/interfaces';
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
     */
    public static readonly SHORT_DATE = 'MMM D, YYYY';

    /**
     * MMMM D, YYYY
     */
    public static readonly LONG_DATE = 'MMMM D, YYYY';

    /**
     * YYYY/MM/DD - HH:mm:ss
     */
    public static readonly DATETIME = 'YYYY/MM/DD - HH:mm:ss';

    /**
     * Intended to be used for CSV/spreadsheets as spreadsheet
     * software will parse this format over DATETIME format.
     * 
     * YYYY-MM-DD HH:mm:ss
     * 
     * @since 2.1.0
     */
    public static readonly DATETIME_CSV = 'YYYY-MM-DD HH:mm:ss';

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
