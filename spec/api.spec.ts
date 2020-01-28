
import * as api from '../src/api';
import {DateUtils} from '../src/DateUtils';

describe('Public API', () => {
    it('DateUtils', () => {
        expect(api.DateUtils).toBe(DateUtils);
    });
});
