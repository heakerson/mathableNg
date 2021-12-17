import { Sign, TrigTypes } from "src/models/math-object/enums.model";
import { Factory } from "src/models/services/factory.service";
import { Expression } from "../../expression.model";
import { Function } from "../function.model";

export abstract class Trig extends Function {

    get functionString(): string {
        return this.trigType;
    }

    get expression(): Expression {
        return this.getChild<Expression>(0)
    }

    abstract readonly trigType: TrigTypes;

    public abstract override copy(): Trig;

    public static fromExpression<TTrig extends Trig>(expression: Expression, sign: Sign, trigType: TrigTypes): TTrig {
        return Factory.buildFactor(`${sign}${trigType}[${expression}]`) as TTrig;
    }

    public override setChildren(): Expression[] {
        return [ new Expression(this.formattedInput) ];
    }
}