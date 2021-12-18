import { Term } from "src/models/math-object/term.model";
import { Factory } from "src/models/services/factory.service";
import { StringFormatter } from "src/models/services/string-formatter.service";
import { mathObjectConstructorTests } from "./math-object.spec";

export function termConstructorTests<TTerm extends Term>(
    additionalLabel: string,
    tests: { input: string, children: string[], toString: string }[],
    builder: (input: string) => TTerm
): void {

    describe(`Term Constructor Tests => ${additionalLabel}`, () => {
        tests.forEach(test => {
            it(`'${test.input}' => should populate base properties correctly`, () => {
                const mo: TTerm = builder(test.input);

                expect(mo.factors.map(c => c.toString())).toEqual(test.children);
                expect(mo.factorCount).toEqual(test.children.length);
                expect(mo.isSingleFactor).toEqual(test.children.length === 1);
            });
        });
    });
}

describe('Term', () => {

    describe('Constructor Tests', () => {
        const constructorTests: { input: string, children: string[], toString: string }[] = [
            { input: 'a', children: ['a'], toString: 'a' },
            { input: 'a*b', children: ['a', 'b'], toString: 'a*b' },
            { input: '-a-b', children: ['(-a-b)'], toString: '(-a-b)' },
            { input: 'a*b^c', children: ['a', 'b^c'], toString: 'a*b^c' },
            { input: 'a*-b^c', children: ['a', '-b^c'], toString: 'a*-b^c' },
            { input: '-cot[x-b]^(c)*((e)/(f))', children: ['-cot[x-b]^(c)', '((e)/(f))'], toString: '-cot[x-b]^(c)*((e)/(f))'},
            { input: '-cot[x-b]^(c)-log[a-b, -x]', children: ['(-cot[x-b]^(c)-log[a-b,-x])'], toString: '(-cot[x-b]^(c)-log[a-b,-x])'}
        ];
    
        mathObjectConstructorTests('STANDARD Constructor', constructorTests, (input: string) => new Term(input));
        mathObjectConstructorTests('STATIC Constructor', constructorTests, (input: string) => {
            const factors = StringFormatter.parseFactorStrings(input).map(f => Factory.buildFactor(f));
            return Term.fromFactors(...factors)
        });

        termConstructorTests('STANDARD CONSTRUCTOR', constructorTests, (input: string) => new Term(input))
        termConstructorTests('STATIC Constructor', constructorTests, (input: string) => {
            const factors = StringFormatter.parseFactorStrings(input).map(f => Factory.buildFactor(f));
            return Term.fromFactors(...factors)
        });
    });

    describe('Individual Methods', () => {
        describe('adsf', () => {
        });
    });
});