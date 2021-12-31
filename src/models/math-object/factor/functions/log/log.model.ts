import { Sign } from "src/models/math-object/enums.model";
import { Factor } from "../../factor.model";
import { Integer } from "../../number/integer.model";
import { Function } from "../function.model";

export class Log extends Function {

    public get contents(): Factor {
        return this.getChild<Factor>(0);
    }

    public get base(): Factor {
        return this.getChild<Factor>(1);
    }

    constructor(contentsStr: string, sign: Sign = Sign.Positive, logBase: string = '10') {
        super([contentsStr, logBase].join(','), sign, 'log');
    }

    public static fromFactors(factor: Factor, sign: Sign, base: Factor = new Integer('10')): Log {
        return new Log(factor.toString(), sign, base.toString());
    }

    public replaceChild(newFactor: Factor, previousFactor: Factor): Log {
        const newChildren = this.children.map(c => c.id === previousFactor ? newFactor : c) as Factor[];
        return Log.fromFactors(newChildren[0], this.sign, newChildren[1]);
    }

    public override copy(): Log {
        return Log.fromFactors(this.contents, this.sign, this.base);
    }
}