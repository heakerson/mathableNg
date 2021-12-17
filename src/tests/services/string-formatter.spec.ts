import { StringFormatter } from "src/models/services/string-formatter.service";

describe('StringFormatter', () => {

    describe('parseExpressionStrings', () => {
        const inputs: { input: string, expectedResult: string[] }[] = [
            { input: 'a+b=c', expectedResult: ['a+b', 'c'] },
            { input: '1-2=3', expectedResult: ['1-2', '3'] },
            { input: '1+2=3=-x*4', expectedResult: ['1+2', '3', '-x*4'] },
            { input: ' a +b=c', expectedResult: ['a+b', 'c'] },
            { input: '1+2=- 3   ', expectedResult: ['1+2', '-3'] },
            { input: ' 1  +2   =3  =x*   4 ', expectedResult: ['1+2', '3', 'x*4'] },
            { input: 'a+b<=c', expectedResult: ['a+b', 'c'] },
            { input: '1+2<=3', expectedResult: ['1+2', '3'] },
            { input: '1+2< =3=x*-4', expectedResult: ['1+2', '3', 'x*-4'] },
            { input: ' a +b  <=c', expectedResult: ['a+b', 'c'] },
            { input: '1-2>=3   ', expectedResult: ['1-2', '3'] },
            { input: ' 1  +2   > = 3  =x*   4 ', expectedResult: ['1+2', '3', 'x*4'] },
            { input: 'a+b> =c', expectedResult: ['a+b', 'c'] },
            { input: '-1+2>3', expectedResult: ['-1+2', '3'] },
            { input: '1+2> =3=x*4', expectedResult: ['1+2', '3', 'x*4'] },
            { input: ' a +b  >c', expectedResult: ['a+b', 'c'] },
            { input: '1+2<3   ', expectedResult: ['1+2', '3'] },
            { input: '(1+2)<3   ', expectedResult: ['(1+2)', '3'] },
            { input: ' 1  +2   < = 3  >=x*   4 ', expectedResult: ['1+2', '3', 'x*4'] },
            { input: '  a* b', expectedResult: ['a*b'] },
            { input: '  ', expectedResult: [''] },
        ];

        inputs.forEach((test) => {
            it(`Should parse '${test.input}' as ${test.expectedResult}`, () => {
                const result = StringFormatter.parseExpressionStrings(test.input);
                expect(result).toEqual(test.expectedResult);
            });
        });
    });

    describe('parseTermStrings', () => {
        const inputs: { input: string, expectedResult: string[] }[] = [
            { input: 'a+b+c', expectedResult: ['a', '+b', '+c'] },
            { input: '-a+b+c', expectedResult: ['-a', '+b', '+c'] },
            { input: '1-2-3', expectedResult: ['1', '-2', '-3'] },
            { input: '(1+2)+3-x*4', expectedResult: ['(1+2)', '+3', '-x*4'] },
            { input: '-(1+2)+3-x*4', expectedResult: ['-(1+2)', '+3', '-x*4'] },
            { input: '-(1+2+sin[x])+3-x*4', expectedResult: ['-(1+2+sin[x])', '+3', '-x*4'] },
            { input: '-(1+2)+3-x*4*sin[x]', expectedResult: ['-(1+2)', '+3', '-x*4*sin[x]'] },
            { input: 'a+-b*x+c', expectedResult: ['a', '+-b*x', '+c'] },
            { input: 'a+ -b*x - -c', expectedResult: ['a', '+-b*x', '--c'] },
            { input: '+a+ -b*(x+ y*z*(b*(1+2))) - -c', expectedResult: ['+a', '+-b*(x+y*z*(b*(1+2)))', '--c'] },
            { input: '+a+ -b*(tan[x]+ y*z*(b*(1+2))) - -c', expectedResult: ['+a', '+-b*(tan[x]+y*z*(b*(1+2)))', '--c'] },
            { input: 'x^a/b', expectedResult: ['x^a/b'] },
            { input: 'x^-a/b', expectedResult: ['x^-a/b'] },
            { input: 'x^a/b/c', expectedResult: ['x^a/b/c'] },
            { input: 'x^-a/b/c', expectedResult: ['x^-a/b/c'] },
            { input: 'x^-a/-b/c', expectedResult: ['x^-a/-b/c'] },
            { input: 'x*-a/b/c', expectedResult: ['x*-a/b/c'] },
            { input: 'x*-a/-b/c', expectedResult: ['x*-a/-b/c'] },
            { input: '-a^(b)', expectedResult: ['-a^(b)'] },
            { input: '-a^-(b)', expectedResult: ['-a^-(b)'] },
            { input: '-a^-(b)*x', expectedResult: ['-a^-(b)*x'] },
            { input: '-a^-(b)(x)', expectedResult: ['-a^-(b)(x)'] },
            { input: '-(b)-(x)', expectedResult: ['-(b)', '-(x)'] },
            { input: 'a^b*c', expectedResult: ['a^b*c'] },
            { input: '-a^b*c', expectedResult: ['-a^b*c'] },
            { input: 'a^-b*c', expectedResult: ['a^-b*c'] },
            { input: '((a)/(b))', expectedResult: ['((a)/(b))'] },
            { input: 'x*((a)/(b))', expectedResult: ['x*((a)/(b))'] },
            { input: 'x*-((a)/(b))', expectedResult: ['x*-((a)/(b))'] },
            { input: 'x^((a)/(b))', expectedResult: ['x^((a)/(b))'] },
            { input: 'x^-((a)/(b))', expectedResult: ['x^-((a)/(b))'] },
            { input: 'a/b', expectedResult: ['a/b'] },
            { input: 'a/b*x', expectedResult: ['a/b*x'] },
            { input: 'a/-b*x', expectedResult: ['a/-b*x'] },
            { input: '(a)/(b)', expectedResult: ['(a)/(b)'] },
            { input: 'x*(a)/(b)', expectedResult: ['x*(a)/(b)'] },
            { input: 'x-(a)/(b)', expectedResult: ['x', '-(a)/(b)'] },
            { input: 'x+(a)/(b)', expectedResult: ['x', '+(a)/(b)'] },
            { input: 'x-a/b', expectedResult: ['x', '-a/b'] },
            { input: 'x*-(a)/(b)', expectedResult: ['x*-(a)/(b)'] },
            { input: 'x*(a)/(b)/c', expectedResult: ['x*(a)/(b)/c'] },
            { input: 'x*(a)/(b)/csc[c]', expectedResult: ['x*(a)/(b)/csc[c]'] },
            { input: 'x*-(a)/(b)/c', expectedResult: ['x*-(a)/(b)/c'] },
            { input: 'x^(a)/(b)', expectedResult: ['x^(a)/(b)'] },
            { input: 'x^-(a)/(b)', expectedResult: ['x^-(a)/(b)'] },
            { input: 'x*-(a)/(b)-a/(b)', expectedResult: ['x*-(a)/(b)', '-a/(b)'] },
            { input: 'x*(a)/(b)/c+a/b', expectedResult: ['x*(a)/(b)/c', '+a/b'] },
        ];

        inputs.forEach((test) => {
            it(`Should parse '${test.input}' as ${test.expectedResult}`, () => {
                const result = StringFormatter.parseTermStrings(test.input);
                expect(result).toEqual(test.expectedResult);
            });
        });
    });

    describe('parseRationalExpressions', () => {
        const inputs: { input: string, expectedNum: string, expectedDenom: string }[] = [
            { input: '((a)/(b))', expectedNum: '(a)', expectedDenom: '(b)'},
            { input: '((a)/(sin[b/c]))', expectedNum: '(a)', expectedDenom: '(sin[b/c])'},
            { input: '((-a)/(b))', expectedNum: '(-a)', expectedDenom: '(b)'},
            { input: '((a)/(-b))', expectedNum: '(a)', expectedDenom: '(-b)'},
            { input: '(-(a)/(b))', expectedNum: '-(a)', expectedDenom: '(b)'},
            { input: '((a)/-(b))', expectedNum: '(a)', expectedDenom: '-(b)'},
            { input: '-((a)/(b))', expectedNum: '(a)', expectedDenom: '(b)'},
            { input: '-((-a)/(b))', expectedNum: '(-a)', expectedDenom: '(b)'},
            { input: '-((a)/(-b))', expectedNum: '(a)', expectedDenom: '(-b)'},
            { input: '-(-(a)/(b))', expectedNum: '-(a)', expectedDenom: '(b)'},
            { input: '-((a)/-(b))', expectedNum: '(a)', expectedDenom: '-(b)'},
            { input: '(a)/(b)', expectedNum: '(a)', expectedDenom: '(b)'},
            { input: '(-a)/(b)', expectedNum: '(-a)', expectedDenom: '(b)'},
            { input: '(a)/(-b)', expectedNum: '(a)', expectedDenom: '(-b)'},
            { input: '-(a)/(b)', expectedNum: '-(a)', expectedDenom: '(b)'},
            { input: '-(a)/tan[b]', expectedNum: '-(a)', expectedDenom: 'tan[b]'},
            { input: '-(a)/-tan[b/c]', expectedNum: '-(a)', expectedDenom: '-tan[b/c]'},
            { input: '-tan[b/c]/-(a)', expectedNum: '-tan[b/c]', expectedDenom: '-(a)'},
            { input: '-tan[(b/c)]/-(a)', expectedNum: '-tan[(b/c)]', expectedDenom: '-(a)'},
            { input: '-tan[(b/c)]/-(a)/d', expectedNum: '-tan[(b/c)]', expectedDenom: '-(a)/d'},
            { input: '(a)/-(b)', expectedNum: '(a)', expectedDenom: '-(b)'},
            { input: 'a/(b)', expectedNum: 'a', expectedDenom: '(b)'},
            { input: '-a/(b)', expectedNum: '-a', expectedDenom: '(b)'},
            { input: '(a)/-b', expectedNum: '(a)', expectedDenom: '-b'},
            { input: 'a/b', expectedNum: 'a', expectedDenom: 'b'},
            { input: '-a/b', expectedNum: '-a', expectedDenom: 'b'},
            { input: 'a/b/c', expectedNum: 'a', expectedDenom: 'b/c'},
            { input: 'a/-b/c', expectedNum: 'a', expectedDenom: '-b/c'},
            { input: '-a/b/(c)', expectedNum: '-a', expectedDenom: 'b/(c)'},
            { input: 'a/(b/c)', expectedNum: 'a', expectedDenom: '(b/c)'},
            { input: 'a/-(b/c)', expectedNum: 'a', expectedDenom: '-(b/c)'},
            { input: '-a/b/(c)', expectedNum: '-a', expectedDenom: 'b/(c)'},
            { input: 'a/(b/c)', expectedNum: 'a', expectedDenom: '(b/c)'},
            { input: 'a/-(b/c)', expectedNum: 'a', expectedDenom: '-(b/c)'},
            { input: '-(a/b)/c', expectedNum: '-(a/b)', expectedDenom: 'c'},
            { input: '(a/b)/c', expectedNum: '(a/b)', expectedDenom: 'c'},
            { input: '(a/-b)/(c)', expectedNum: '(a/-b)', expectedDenom: '(c)'},
            { input: 'a/-(b/d)/c', expectedNum: 'a', expectedDenom: '-(b/d)/c'},
            { input: 'a', expectedNum: '', expectedDenom: ''},
            { input: '(a+b/c)', expectedNum: '', expectedDenom: ''},
            { input: 'a+b/c', expectedNum: '', expectedDenom: ''},
            { input: '(a/b+c)', expectedNum: '', expectedDenom: ''},
            { input: 'a^(b/c)', expectedNum: '', expectedDenom: ''},
            { input: 'sin[a/b]', expectedNum: '', expectedDenom: ''},
            { input: 'cot[a/b/c]', expectedNum: '', expectedDenom: ''},
            { input: 'a*cot[a/b/c]', expectedNum: '', expectedDenom: ''},
            { input: 'a/cot[a/b/c]', expectedNum: 'a', expectedDenom: 'cot[a/b/c]'},
            { input: 'a-cot[a/b/c]', expectedNum: '', expectedDenom: ''},
            { input: '(a*b/c)', expectedNum: '', expectedDenom: ''},
            { input: 'a/b*x/c', expectedNum: '', expectedDenom: ''},
        ];

        inputs.forEach((test) => {
            it(`Should parse ${test.input} in to '${test.expectedNum}' and '${test.expectedDenom}'`, () => {
                const result = StringFormatter.parseRationalExpressions(test.input);
                expect(result.numerator).toEqual(test.expectedNum);
                expect(result.denominator).toEqual(test.expectedDenom);
            });
        });
    });

    describe('parsePowerFactor', () => {
        const inputs: { input: string, expectedBase: string, expectedExponent: string }[] = [
            { input: 'a^b', expectedBase: 'a', expectedExponent: 'b' },
            { input: '-a^b', expectedBase: '-a', expectedExponent: 'b' },
            { input: 'a^-b', expectedBase: 'a', expectedExponent: '-b' },
            { input: 'a^(-b)', expectedBase: 'a', expectedExponent: '(-b)' },
            { input: 'a^-(-b)', expectedBase: 'a', expectedExponent: '-(-b)' },
            { input: '-(a+b)^(b/c)', expectedBase: '-(a+b)', expectedExponent: '(b/c)' },
            { input: '-(a+b)^b/c', expectedBase: '', expectedExponent: '' },
            { input: '-(a+b)^b/sin[x^y]', expectedBase: '', expectedExponent: '' },
            { input: '-(a+b)^(b/sin[x^y])', expectedBase: '-(a+b)', expectedExponent: '(b/sin[x^y])' },
            { input: '-(a+b)^b/c*x', expectedBase: '', expectedExponent: '' },
            { input: '-a^b^-c', expectedBase: '-a', expectedExponent: 'b^-c' },
            { input: '-(a^b)^-c', expectedBase: '-(a^b)', expectedExponent: '-c' },
            { input: 'cos[a^b]', expectedBase: '', expectedExponent: '' },
            { input: 'cos[a^b]^c', expectedBase: 'cos[a^b]', expectedExponent: 'c' },
            { input: 'a', expectedBase: '', expectedExponent: '' },
            { input: 'a/b^x', expectedBase: '', expectedExponent: '' },
            { input: 'x^b/c', expectedBase: '', expectedExponent: '' },
            { input: 'a*b^c', expectedBase: '', expectedExponent: '' },
            { input: 'b^c+a', expectedBase: '', expectedExponent: '' },
        ];

        inputs.forEach((test) => {
            it(`Should parse '${test.input}' => base: '${test.expectedBase}' and expression: '${test.expectedExponent}'`, () => {
                const result = StringFormatter.parsePowerFactor(test.input);
                expect(result.base).toEqual(test.expectedBase);
                expect(result.exponent).toEqual(test.expectedExponent);
            });
        });
    });

    describe('parseFactorStrings', () => {
        const inputs: { input: string, expectedResult: string[] }[] = [
            { input: 'a', expectedResult: ['a']},
            { input: '-a', expectedResult: ['-a']},
            { input: '(-a)', expectedResult: ['(-a)']},
            { input: 'a*b', expectedResult: ['a', 'b'] },
            { input: 'sin[a]*b', expectedResult: ['sin[a]', 'b'] },
            { input: '-a*-b', expectedResult: ['-a', '-b'] },
            { input: '-bob*-fred', expectedResult: ['-bob', '-fred'] },
            { input: '-(x+y)*-a*-b', expectedResult: ['-(x+y)','-a', '-b'] },
            { input: '-(x+y)*-(r)*-a*-b', expectedResult: ['-(x+y)','-(r)','-a', '-b'] },
            { input: '(x+y)*-a*-b', expectedResult: ['(x+y)','-a', '-b'] },
            { input: 'a^(b)', expectedResult: ['a^(b)'] },
            { input: '-a^(b)', expectedResult: ['-a^(b)'] },
            { input: '-a^-(b)', expectedResult: ['-a^-(b)'] },
            { input: '-a^-(b)*x', expectedResult: ['-a^-(b)', 'x'] },
            { input: 'a^b*c', expectedResult: ['a^b', 'c'] },
            { input: '-a^b*c', expectedResult: ['-a^b', 'c'] },
            { input: 'a^-b*c', expectedResult: ['a^-b', 'c'] },
            { input: '((a)/(b))', expectedResult: ['((a)/(b))'] },
            { input: 'x*((a)/(b))', expectedResult: ['x','((a)/(b))'] },
            { input: 'x*-((a)/(b))', expectedResult: ['x','-((a)/(b))'] },
            { input: 'x^((a)/(b))', expectedResult: ['x^((a)/(b))'] },
            { input: 'x^-((a)/(b))', expectedResult: ['x^-((a)/(b))'] },
            { input: 'a/b', expectedResult: ['a/b'] },
            { input: 'a/b*x', expectedResult: ['a/b', 'x'] },
            { input: 'a/-b*x', expectedResult: ['a/-b', 'x'] },
            { input: '(a)/(b)', expectedResult: ['(a)/(b)'] },
            { input: 'x*(a)/(b)', expectedResult: ['x','(a)/(b)'] },
            { input: 'x*-(a)/(b)', expectedResult: ['x','-(a)/(b)'] },
            { input: 'x^(a)/(b)', expectedResult: ['x^(a)/(b)'] },
            { input: 'x^-(a)/(b)', expectedResult: ['x^-(a)/(b)'] },
            { input: 'x^(a)/(b)/c', expectedResult: ['x^(a)/(b)/c'] },
            { input: 'x^-(a)/(b)/c', expectedResult: ['x^-(a)/(b)/c'] },
            { input: 'x^a/b', expectedResult: ['x^a/b'] },
            { input: 'x^-a/b', expectedResult: ['x^-a/b'] },
            { input: 'x^a/b/c', expectedResult: ['x^a/b/c'] },
            { input: 'x^-a/b/c', expectedResult: ['x^-a/b/c'] },
            { input: 'x^-a/-b/c', expectedResult: ['x^-a/-b/c'] },
            { input: 'x*-a/b/c', expectedResult: ['x','-a/b/c'] },
            { input: 'x*-a/-b/c', expectedResult: ['x','-a/-b/c'] },
            { input: 'ln[x]*-a/-b/c', expectedResult: ['ln[x]','-a/-b/c'] },
            { input: '-a/-b/c*ln[x]', expectedResult: ['-a/-b/c', 'ln[x]'] },
            { input: '(a)*b', expectedResult: ['(a)','b'] },
            { input: '(a)*(b)', expectedResult: ['(a)','(b)'] },
            { input: '-(a)*-(b)', expectedResult: ['-(a)','-(b)'] },
            { input: '-tan[x*log[y]]',expectedResult: ['-tan[x*log[y]]']},
            { input: '-sec[ln[x]*log[y]]',expectedResult: ['-sec[ln[x]*log[y]]']},
            { input: '-sec[ln[x]]*log[y]',expectedResult: ['-sec[ln[x]]','log[y]']}
        ];

        inputs.forEach((test) => {
            it(`Should parse '${test.input}' as ${test.expectedResult}`, () => {
                const result = StringFormatter.parseFactorStrings(test.input);
                expect(result).toEqual(test.expectedResult);
            });
        });
    });

    describe('getMatchingParenthesisIndex', () => {
        const inputs: { input: string, start: number; expectedResult: number }[] = [
            { input: '(a)', start: 0, expectedResult: 2 },
            { input: '(a)', start: 2, expectedResult: 0 },
            { input: '(a)*3', start: 0, expectedResult: 2 },
            { input: '(a)*3', start: 2, expectedResult: 0 },
            { input: 'x*(a)', start: 2, expectedResult: 4 },
            { input: 'x*(a)', start: 4, expectedResult: 2 },
            { input: '(a )* 3', start: 0, expectedResult: 3 },
            { input: '(a )* 3', start: 3, expectedResult: 0 },
            { input: '(a)*3', start: 1, expectedResult: -1 },
            { input: '(a)*3', start: 3, expectedResult: -1 },
            { input: '(a)*3', start: 4, expectedResult: -1 },
            { input: 'x*(-a*((b)/(a)))*3', start: 7, expectedResult: 9 },
            { input: 'x*(-a*((b)/(a)))*3', start: 9, expectedResult: 7 },
            { input: 'x*(-a*((b)/(a)))*3', start: 2, expectedResult: 15 },
            { input: 'x*(-a*((b)/(a)))*3', start: 15, expectedResult: 2 },
            { input: '', start: 3, expectedResult: -1 },
            { input: '(a)*x^-(y+(r -q))', start: 7, expectedResult: 16 },
            { input: '(a)*x^-(y+(r -q))', start: 16, expectedResult: 7 },
            { input: 'sin[(a)]', start: 4, expectedResult: 6 },
            { input: 'sin[(a)]', start: 6, expectedResult: 4 },
        ];

        inputs.forEach((test) => {
            it(`Should return index ${test.expectedResult}, start: ${test.start} in '${test.input}'`, () => {
                const result = StringFormatter.getMatchingParenthesisIndex(test.input, test.start);
                expect(result).toEqual(test.expectedResult);
            });
        });
    });

    describe('getMatchingBracketIndex', () => {
        const inputs: { input: string, start: number; expectedResult: number }[] = [
            { input: 'sin[a]', start: 3, expectedResult: 5 },
            { input: 'sin[a]', start: 5, expectedResult: 3 },
            { input: 'sin[a]', start: 1, expectedResult: -1 },
            { input: 'cos[a]*3', start: 3, expectedResult: 5 },
            { input: 'cos[a]*3', start: 3, expectedResult: 5 },
            { input: 'x*tan[a]', start: 5, expectedResult: 7 },
            { input: 'x*tan[a]', start: 5, expectedResult: 7 },
            { input: 'csc[a ]* 3', start: 3, expectedResult: 6 },
            { input: 'csc[a ]* 3', start: 6, expectedResult: 3 },
            { input: 'cos[a]*3', start: 0, expectedResult: -1 },
            { input: 'cos[a]*3', start: 0, expectedResult: -1 },
            { input: 'cos[a]*3', start: 0, expectedResult: -1 },
            { input: 'cos[(b+sin[a^tan[x]])]*3', start: 10, expectedResult: 19 },
            { input: 'cos[(b+sin[a^tan[x]])]*3', start: 19, expectedResult: 10 },
            { input: 'cos[(b+sin[a^tan[x]])]*3', start: 16, expectedResult: 18 },
            { input: 'cos[(b+sin[a^tan[x]])]*3', start: 18, expectedResult: 16 },
            { input: 'cos[(b+sin[a^tan[x]])]*3', start: 1, expectedResult: -1 },
        ];

        inputs.forEach((test) => {
            it(`Should return index ${test.expectedResult}, start: ${test.start} in '${test.input}'`, () => {
                const result = StringFormatter.getMatchingBracketIndex(test.input, test.start);
                expect(result).toEqual(test.expectedResult);
            });
        });
    });

    describe('ensureSurroundingParenthesis', () => {
        const inputs: { input: string, expectedResult: string }[] = [
            { input: '', expectedResult: '()' },
            { input: '   a', expectedResult: '(   a)' },
            { input: '   a)', expectedResult: '(   a))' },
            { input: '(   a', expectedResult: '((   a)' },
            { input: 'a', expectedResult: '(a)' },
            { input: '(a)', expectedResult: '(a)' },
            { input: '-(a)', expectedResult: '(-(a))' },
            { input: '((((a))))', expectedResult: '((((a))))' },
            { input: '(a+b)*(x-y)^(t)', expectedResult: '((a+b)*(x-y)^(t))' },
            { input: '-(a+b)*(x-y)^(t)', expectedResult: '(-(a+b)*(x-y)^(t))' },
            { input: '(a)/b', expectedResult: '((a)/b)' },
            { input: '(a)/(b)', expectedResult: '((a)/(b))' },
        ];

        inputs.forEach((test) => {
            it(`Should transform '${test.input}' to '${test.expectedResult}'`, () => {
                const result = StringFormatter.ensureSurroundingParenthesis(test.input);
                expect(result).toEqual(test.expectedResult);
            });
        });
    });

    describe('stripSurroundingParenthesis', () => {
        const inputs: { input: string, expectedResult: string }[] = [
            { input: '(a)', expectedResult: 'a' },
            { input: '-(a)', expectedResult: 'a' },
            { input: '-(-a)', expectedResult: '-a' },
            { input: '(a)*a', expectedResult: '(a)*a' },
            { input: '(ln[(a+b)])', expectedResult: 'ln[(a+b)]' },
            { input: 'ln[(a+b)]', expectedResult: 'ln[(a+b)]' },
            { input: '(a*sin[(a+b)])', expectedResult: 'a*sin[(a+b)]' },
            { input: '-(a*sin[(a+b)])', expectedResult: 'a*sin[(a+b)]' },
            { input: '-(a)(b)', expectedResult: '-(a)(b)' },
            { input: '-(a)*(b)', expectedResult: '-(a)*(b)' },
            { input: '(a)^(b)', expectedResult: '(a)^(b)' },
            { input: '(a)/(b)', expectedResult: '(a)/(b)' },
            { input: '((a)/(b))', expectedResult: '(a)/(b)' },
            { input: '-((a)/(b))', expectedResult: '(a)/(b)' },
        ];

        inputs.forEach((test) => {
            it(`Should remove () appropriately: '${test.input}' => '${test.expectedResult}'`, () => {
                const result = StringFormatter.stripSurroundingParenthesis(test.input);
                expect(result).toEqual(test.expectedResult);
            });
        });
    });

    describe('getFunctionContents', () => {
        const inputs: { input: string, expectedResult: string[] }[] = [
            { input: 'sin[x]', expectedResult: ['x']},
            { input: '-sin[x]', expectedResult: ['x']},
            { input: 'sin[(x)]', expectedResult: ['(x)']},
            { input: '-ln[x]', expectedResult: ['x']},
            { input: '-log[x,3]', expectedResult: ['x', '3']},
            { input: '-log[log[a],3]', expectedResult: ['log[a]', '3']},
            { input: '-log[log[sin[b]],3]', expectedResult: ['log[sin[b]]', '3']},
        ];

        inputs.forEach((test) => {
            it(`Should remove () appropriately: '${test.input}' => '${test.expectedResult}'`, () => {
                const result = StringFormatter.getFunctionContents(test.input);
                expect(result).toEqual(test.expectedResult);
            });
        });
    });

    describe('removeEmptySpace', () => {
        const inputs: { input: string, expectedResult: string }[] = [
            { input: ' a +b=c', expectedResult: 'a+b=c'},
            { input: '1+2=3   ', expectedResult: '1+2=3' },
            { input: ' 1  +2   =3  =x*   4 ', expectedResult: '1+2=3=x*4' },
            { input: 'a+b<=c', expectedResult: 'a+b<=c' }
        ];

        inputs.forEach((test) => {
            it(`Should return '${test.input}' as ${test.expectedResult}`, () => {
                const result = StringFormatter.removeEmptySpace(test.input);
                expect(result).toEqual(test.expectedResult);
            });
        });
    });

    describe('hasParenthesisCountMismatch', () => {
        const inputs: { input: string, expectedResult: boolean }[] = [
            { input: ' a +b=c', expectedResult: false },
            { input: '1+(2)=3   ', expectedResult: false },
            { input: '( 1  +2)   =3  =(x*   4 )', expectedResult: false },
            { input: 'a+b^(x)<=c', expectedResult: false },
            { input: ' a +(b=c', expectedResult: true },
            { input: '1+2)=3   ', expectedResult: true },
            { input: '1  +2)   =3  =(x*   4 )', expectedResult: true },
            { input: 'a+b^(x<=c', expectedResult: true },
        ];

        inputs.forEach((test) => {
            it(`Should return ${test.expectedResult} for '${test.input}'`, () => {
                const result = StringFormatter.hasParenthesisCountMismatch(test.input);
                expect(result).toEqual(test.expectedResult);
            });
        });
    });

    describe('hasBracketCountMismatch', () => {
        const inputs: { input: string, expectedResult: boolean }[] = [
            { input: ' a +b=c', expectedResult: false },
            { input: '1+sin[2]=3   ', expectedResult: false },
            { input: '( 1  +2)   =3  =ln[x*   4*csc[y] ]', expectedResult: false },
            { input: 'a+b^cos[x]<=c', expectedResult: false },
            { input: ' a +tan[b=c', expectedResult: true },
            { input: '1+2]=3   ', expectedResult: true },
            { input: '1  +2]   =3  =(x*   4 )', expectedResult: true },
            { input: 'a+b^log[x<=c', expectedResult: true },
        ];

        inputs.forEach((test) => {
            it(`Should return ${test.expectedResult} for '${test.input}'`, () => {
                const result = StringFormatter.hasBracketCountMismatch(test.input);
                expect(result).toEqual(test.expectedResult);
            });
        });
    });
 
    describe('hasMisorderedClosingParenthesis', () => {
        const inputs: { input: string, expectedResult: boolean }[] = [
            { input: '', expectedResult: false },
            { input: ' ', expectedResult: false },
            { input: '(a)+b', expectedResult: false },
            { input: '(((a)+b))', expectedResult: false },
            { input: '((((x))))', expectedResult: false },
            { input: '(((())))', expectedResult: false },
            { input: '()()()()', expectedResult: false },
            { input: '1+(2)=(3)   ', expectedResult: false },
            { input: '1+)2)=(3)   ', expectedResult: true },
            { input: ')(a)', expectedResult: true },
            { input: ')(', expectedResult: true },
            { input: '())', expectedResult: true },
            { input: '(((a)+b+)))', expectedResult: true },
            { input: '()())()()', expectedResult: true },
        ];

        inputs.forEach((test) => {
            it(`Should return ${test.expectedResult} for '${test.input}'`, () => {
                const result = StringFormatter.hasMisorderedClosingParenthesis(test.input);
                expect(result).toEqual(test.expectedResult);
            });
        });
    });

    describe('hasMisorderedClosingBrackets', () => {
        const inputs: { input: string, expectedResult: boolean }[] = [
            { input: '', expectedResult: false },
            { input: ' ', expectedResult: false },
            { input: 'a', expectedResult: false },
            { input: '(a)', expectedResult: false },
            { input: 'tan[a]+b', expectedResult: false },
            { input: 'tan[a+ ln[y]]+b', expectedResult: false },
            { input: 'sin[sin[sin[a]+b]]', expectedResult: false },
            { input: 'csc[csc[csc[csc[x]]]]', expectedResult: false },
            { input: '[[[[]]]]', expectedResult: false },
            { input: '[][][][]', expectedResult: false },
            { input: '1+tan[2]=-log[3, 5]   ', expectedResult: false },
            { input: '1+]2]=(3)   ', expectedResult: true },
            { input: ']tan[a]', expectedResult: true },
            { input: '][', expectedResult: true },
            { input: '[]]', expectedResult: true },
            { input: 'sec[sec[sec[a]+b+]]]', expectedResult: true },
            { input: '[][]]()()', expectedResult: true },
        ];

        inputs.forEach((test) => {
            it(`Should return ${test.expectedResult} for '${test.input}'`, () => {
                const result = StringFormatter.hasMisorderedClosingBrackets(test.input);
                expect(result).toEqual(test.expectedResult);
            });
        });
    });

    describe('hasEmptyParenthesis', () => {
        const inputs: { input: string, expectedResult: boolean }[] = [
            { input: '', expectedResult: false },
            { input: ' ', expectedResult: false },
            { input: '(a)+b', expectedResult: false },
            { input: '(((a)+b))', expectedResult: false },
            { input: '((((x))))', expectedResult: false },
            { input: '1+(2)=(3)   ', expectedResult: false },
            { input: '( 1  +2)   =3  =(x*   4 )', expectedResult: false },
            { input: 'a+b^(x)<=c', expectedResult: false },
            { input: '()', expectedResult: true },
            { input: '(   )   ', expectedResult: true },
            { input: '()+b', expectedResult: true },
            { input: '((()+b))', expectedResult: true },
            { input: '(((())))', expectedResult: true },
            { input: '1+(2)=()   ', expectedResult: true },
            { input: '( 1  +2)   =3  =( )*(x*   4 )', expectedResult: true },
            { input: 'a+b^()<=c', expectedResult: true },
        ];

        inputs.forEach((test) => {
            it(`Should return ${test.expectedResult} for '${test.input}'`, () => {
                const result = StringFormatter.hasEmptyParenthesis(test.input);
                expect(result).toEqual(test.expectedResult);
            });
        });
    });

    describe('hasEmptyBrackets', () => {
        const inputs: { input: string, expectedResult: boolean }[] = [
            { input: '', expectedResult: false },
            { input: ' ', expectedResult: false },
            { input: 'tan[a]+b', expectedResult: false },
            { input: 'sin[sin[sin[a]+b]]', expectedResult: false },
            { input: 'ln[ln[ln[ln[x]]]]', expectedResult: false },
            { input: '1+log[2]=-scs[(3)]   ', expectedResult: false },
            { input: '( 1  +2)   =3  =cot[x*   4 ]', expectedResult: false },
            { input: 'a+b^cos[(x)]<=c', expectedResult: false },
            { input: '[]', expectedResult: true },
            { input: '[   ]   ', expectedResult: true },
            { input: '[]+b', expectedResult: true },
            { input: '([[]+b])', expectedResult: true },
            { input: '[[[[]]]]', expectedResult: true },
            { input: '1+cos[2]=[]   ', expectedResult: true },
            { input: '( 1  +2)   =3  =[  ]*(x*   4 )', expectedResult: true },
            { input: 'a+b^log[]<=c', expectedResult: true },
        ];

        inputs.forEach((test) => {
            it(`Should return ${test.expectedResult} for '${test.input}'`, () => {
                const result = StringFormatter.hasEmptyBrackets(test.input);
                expect(result).toEqual(test.expectedResult);
            });
        });
    });

    describe('tooManyOperators', () => {
        const inputs: { input: string, expectedResult: string | null }[] = [
            { input: ' a +-b=c--d', expectedResult: null },
            { input: '1+(2)=3   ', expectedResult: null },
            { input: 'x^-y', expectedResult: null },
            { input: '--x*-y', expectedResult: null },
            { input: 'x^-(y)', expectedResult: null },
            { input: 'a+b^(x)<=c/-d', expectedResult: null },
            { input: '1++2=3', expectedResult: '++' },
            { input: '1+-2=3++b', expectedResult: '++' },
            { input: '1+--2=3++b', expectedResult: '+--' },
            { input: '1+-2=3**b', expectedResult: '**' },
            { input: '1/-2=3//b', expectedResult: '//' },
            { input: 'x^*b', expectedResult: '^*' },
            { input: 'x^/b', expectedResult: '^/' },
        ];

        inputs.forEach((test) => {
            it(`Should return ${test.expectedResult} for '${test.input}'`, () => {
                const result = StringFormatter.tooManyOperators(test.input);
                expect(result).toEqual(test.expectedResult);
            });
        });
    });

    describe('hasMisplacedOperators', () => {
        const inputs: { input: string, expectedResult: string | null }[] = [
            { input: 'a+b=c-d', expectedResult: null },
            { input: '()', expectedResult: null },
            { input: '[]', expectedResult: null },
            { input: '(a)', expectedResult: null },
            { input: '(-a)', expectedResult: null },
            { input: '(+a)', expectedResult: null },
            { input: 'cos[+a]', expectedResult: null },
            { input: '(a+b^-(x))', expectedResult: null },
            { input: '(-a+b^-(x))', expectedResult: null },
            { input: '(*', expectedResult: '(*' },
            { input: '(^', expectedResult: '(^' },
            { input: '(*a)', expectedResult: '(*' },
            { input: '(/a)', expectedResult: '(/' },
            { input: '(^a)', expectedResult: '(^' },
            { input: '(a+b^-(/x))', expectedResult: '(/' },
            { input: '(-a+b^-(*x)', expectedResult: '(*' },
            { input: '(-a+b^-(*(x))', expectedResult: '(*' },
            { input: '(a+b^-cos[/x])', expectedResult: '[/' },
            { input: '(-a+b^-cos[*x])', expectedResult: '[*' },
            { input: '(-a+b^-tan[*(x)])', expectedResult: '[*' },
            { input: '*)', expectedResult: '*)' },
            { input: '^)', expectedResult: '^)' },
            { input: '(a*)', expectedResult: '*)' },
            { input: 'tan[(a*)]', expectedResult: '*)' },
            { input: 'sin[a*]', expectedResult: '*]' },
            { input: '(a/)', expectedResult: '/)' },
            { input: '(a^)', expectedResult: '^)' },
            { input: '(a-)', expectedResult: '-)' },
            { input: '(a+)', expectedResult: '+)' },
            { input: '(a+b^-(x/))', expectedResult: '/)' },
            { input: '(-a+b^-(x*)', expectedResult: '*)' },
            { input: '(-a+b^-((x)*)', expectedResult: '*)' },
            { input: '(a+b^-log[x/])', expectedResult: '/]' },
            { input: '(-a+b^-csc[x*])', expectedResult: '*]' },
            { input: '(-a+b^-sec[(x)*])', expectedResult: '*]' },
        ];

        inputs.forEach((test) => {
            it(`Should return ${test.expectedResult} for '${test.input}'`, () => {
                const result = StringFormatter.hasMisplacedOperators(test.input);
                expect(result).toEqual(test.expectedResult);
            });
        });
    });

    describe('hasMissingFunctionName', () => {
        const inputs: { input: string, expectedResult: boolean }[] = [
            { input: '', expectedResult: false },
            { input: 'a + (b-c)', expectedResult: false },
            { input: 'tan[x]', expectedResult: false },
            { input: 'tan[tan[x]]', expectedResult: false },
            { input: 'ln[x + log[b-6, E]]', expectedResult: false },
            { input: 'a-tan[x]', expectedResult: false },
            { input: 'a+tan[tan[x]]', expectedResult: false },
            { input: '3-ln[x + log[b-6, E]]', expectedResult: false },
            { input: '[x]', expectedResult: true },
            { input: 'tan[[x]]', expectedResult: true },
            { input: 'tan[-[x]]', expectedResult: true },
            { input: '[x + log[b-6, E]]', expectedResult: true },
            { input: 'ln[x + [b-6, E]]', expectedResult: true },
            { input: 'a-[x]', expectedResult: true },
            { input: 'a+[tan[x]]', expectedResult: true },
            { input: '3-ln[x ^ [b-6, E]]', expectedResult: true },
        ];

        inputs.forEach((test) => {
            it(`Should return ${test.expectedResult} for '${test.input}'`, () => {
                const result = StringFormatter.hasMissingFunctionName(test.input);
                expect(result).toEqual(test.expectedResult);
            });
        });
    });
});

