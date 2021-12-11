import { StringFormatter } from "../string-formatter.model";
import { Expression } from "./factor/expression.model";
import { MathObject } from "./math-object.model";

export class Equation extends MathObject {

    get expressions(): Expression[] {
        return this.children as Expression[];
    }

    get expressionCount(): number {
        return this.children.length;
    }

    get isSingleExpression(): boolean {
        return this.expressionCount === 1;
    }

    constructor(input: string) {
        super(input);
    }

    public copy(): Equation {
        return new Equation(this.toString());
    }

    protected override setChildren(): Expression[] {
        return StringFormatter.parseExpressionStrings(this.formattedInput).map(e => new Expression(e));
    }
}