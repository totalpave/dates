
import {JSDateFactory} from '../src/JSDateFactory';

describe('JSDateFactory', () => {
    let factory: JSDateFactory = null;

    beforeEach(() => {
        factory = new JSDateFactory();
    });

    it('can be used with no params', () => {
        let date: Date = factory.create();
        expect(date).toBeInstanceOf(Date);
    });

    it('can be used with a single numeric parameter', () => {
        let d: Date = factory.create(123);
        expect(d.getTime()).toBe(123);
    });

    it('can be used with a single date parameter', () => {
        let source: Date = new Date(123);
        let d: Date = factory.create(source);
        expect(d).not.toBe(source);
        expect(d.getTime()).toBe(123);
    });

    it('can construct 1970-01-05 12:12:12.345', () => {
        let d: Date = factory.create(1970, 0, 5, 12, 12, 12, 345);
        expect(d.toISOString()).toBe('1970-01-05T12:12:12.345Z');
    });
});
