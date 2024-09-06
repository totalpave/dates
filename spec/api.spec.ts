
import * as api from '../src/api';
import {DateUtils} from '../src/DateUtils';
import {DateFormatter} from '../src/DateFormatter';
import {JSDateFactory} from '../src/JSDateFactory';

describe('Public API', () => {
    it('DateUtils', () => {
        expect(api.DateUtils).toBe(DateUtils);
    });

    it('DateFormatter', () => {
        expect(api.DateFormatter).toBe(DateFormatter);
    });

    it('JSDateFactory', () => {
        expect(api.JSDateFactory).toBe(JSDateFactory);
    });
});
