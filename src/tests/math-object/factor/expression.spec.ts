import { Sign } from "src/models/math-object/enums.model";
import { Expression } from "src/models/math-object/factor/expression.model";
import { Term } from "src/models/math-object/term.model";
import { StringFormatter } from "src/models/services/string-formatter.service";
import { mathObjectConstructorTests } from "../math-object.spec";
import { factorConstructorTests } from "./factor.spec";

export function expressionConstructorTests<TExpression extends Expression>(
    additionalLabel: string,
    tests: { input: string, children: string[], toString: string, sign: Sign }[],
    builder: (input: string) => TExpression
): void {

    describe(`Expression Constructor Tests => ${additionalLabel}`, () => {
        tests.forEach(test => {
            it(`'${test.input}' => should populate base properties correctly`, () => {
                const mo: TExpression = builder(test.input);
                // console.log(mo);
                // console.log(mo.toString());
                expect(mo.terms.map(c => c.toString())).toEqual(test.children);
                expect(mo.termCount).toEqual(test.children.length);
                expect(mo.isSingleTerm).toEqual(test.children.length === 1);
            });
        });
    });
}

describe('Expression', () => {

    describe('Constructor', () => {
        const constructorTests: { input: string, children: string[], toString: string, sign: Sign }[] = [
            { input: '(a-b)', children: ['a', '-b'], toString: '(a-b)', sign: Sign.Positive },
            { input: '-(a-b)', children: ['a', '-b'], toString: '-(a-b)', sign: Sign.Negative },
            { input: '-(a+b)', children: ['a', 'b'], toString: '-(a+b)', sign: Sign.Negative },
            { input: '(a+b)', children: ['a', 'b'], toString: '(a+b)', sign: Sign.Positive },
            { input: ' a +b', children: ['a', 'b'], toString: '(a+b)', sign: Sign.Positive },
            { input: ' -a +b', children: ['-a', 'b'], toString: '(-a+b)', sign: Sign.Positive },
            { input: '(a+  b) ^(x)', children: ['(a+b)^(x)'], toString: '((a+b)^(x))', sign: Sign.Positive },
            { input: '-(a+  b) ^(x)', children: ['-(a+b)^(x)'], toString: '(-(a+b)^(x))', sign: Sign.Positive },
            { input: '-(a+b)^-(x)', children: ['-(a+b)^-(x)'], toString: '(-(a+b)^-(x))', sign: Sign.Positive },
            { input: '-(a+-b)', children: ['a', '-b'], toString: '-(a+-b)', sign: Sign.Negative },
            { input: '-(a--b)', children: ['a', '-b'], toString: '-(a--b)', sign: Sign.Negative },
            { input: 'a--b', children: ['a', '-b'], toString: '(a--b)', sign: Sign.Positive },
            { input: '(a+b)(x+y)', children: ['(a+b)*(x+y)'], toString: '((a+b)*(x+y))', sign: Sign.Positive },
            { input: '(a+b)(x+y)-sin[a^b]', children: ['(a+b)*(x+y)', '-sin[a^b]'], toString: '((a+b)*(x+y)-sin[a^b])', sign: Sign.Positive },
            // { input: '-(a+b)^(x)', toString: '(-(a+b)^(x))' },
            // { input: '-(a+b)^-(x)', toString: '(-(a+b)^-(x))' },
            // { input: '(a+b)  -(x+y)', toString: '((a+b)-(x+y))' },
            // { input: '-(a+b)(x+y)', toString: '(-(a+b)*(x+y))' },
            // { input: '-(a+b)/(x+y)', toString: '(-(a+b)/(x+y))' },
            // { input: 'a/b', toString: '(a/b)' },
            // { input: '-a/b', toString: '(-a/b)' },
            // { input: '-a^b', toString: '(-a^b)' },
        ];

        mathObjectConstructorTests('STANDARD Constructor', constructorTests, (input: string) => new Expression(input));
        mathObjectConstructorTests('STATIC Constructor', constructorTests, (input: string) => {
            const terms = StringFormatter.parseTermStrings(input).map(t => new Term(t));
            return Expression.fromTerms(...terms);
        });

        factorConstructorTests('STANDARD Constructor', constructorTests, (input: string) => new Expression(input));
        factorConstructorTests('STATIC Constructor', constructorTests, (input: string) => {
            const terms = StringFormatter.parseTermStrings(input).map(t => new Term(t));
            return Expression.fromTerms(...terms);
        });

        expressionConstructorTests('STANDARD Constructor', constructorTests, (input: string) => new Expression(input));
        expressionConstructorTests('STATIC Constructor', constructorTests, (input: string) => {
            const terms = StringFormatter.parseTermStrings(input).map(t => new Term(t));
            return Expression.fromTerms(...terms);
        });

    });

    describe('Individual Methods', () => {

        describe('', () => {

        });
    });
});