
import {IDateFactory, TDateConstructorArgs} from '@totalpave/interfaces';

/**
 * @since 2.5.0
 */
export class JSDateFactory implements IDateFactory {
    public create(...args: TDateConstructorArgs): Date {
        if (args.length === 0) {
            return new Date();
        }
        else if (args.length === 1) {
            return new Date(args[0]);
        }
        else {
            return new Date(
                args[0],
                args[1],
                args[2],
                args[3],
                args[4],
                args[5],
                args[6]
            );
        }
    }
}
