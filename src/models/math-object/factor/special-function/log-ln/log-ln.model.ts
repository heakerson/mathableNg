import { LogTypes, Sign } from "src/models/math-object/enums.model";
import { Expression } from "../../expression.model";
import { SpecialFunction } from "../special-function.model";

export abstract class LogLn extends SpecialFunction {

    get functionString(): string {
        return this.logType;
    }

    get expression(): Expression {
        return this.getChild<Expression>(0)
    }

    abstract readonly logType: LogTypes;
    public abstract override copy(): LogLn;

    constructor(expressionString: string, sign: Sign, public readonly base: number) {
        super(expressionString, sign);
    }
}