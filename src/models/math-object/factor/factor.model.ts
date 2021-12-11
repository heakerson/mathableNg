import { Sign } from "../enums.model";
import { MathObject } from "../math-object.model";

export abstract class Factor extends MathObject {
    get sign(): Sign {
        return this.formattedInput[0] === '-' ? Sign.Negative : Sign.Positive;
    }
}