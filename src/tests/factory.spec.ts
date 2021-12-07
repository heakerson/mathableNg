import { Factory } from "src/models/factory.model";

describe('Factory', () => {

    describe('parseTermStrings', () => {
        const inputs: { input: string, expectedResult: string[] }[] = [
            { input: 'a+b+c', expectedResult: ['a', 'b', 'c'] },
            { input: '-a+b+c', expectedResult: ['-a', 'b', 'c'] },
            { input: '1-2-3', expectedResult: ['1', '-2', '-3'] },
            { input: '(1+2)+3-x*4', expectedResult: ['(1+2)', '3', '-x*4'] },
            { input: '-(1+2)+3-x*4', expectedResult: ['-(1+2)', '3', '-x*4'] },
            { input: 'a+-b+c', expectedResult: ['a', '-b', 'c'] },

            // { input: ' a +b=c', expectedResult: ['a+b', 'c'] },
            // { input: '1+2=- 3   ', expectedResult: ['1+2', '-3'] },
            // { input: ' 1  +2   =3  =x*   4 ', expectedResult: ['1+2', '3', 'x*4'] },
            // { input: 'a+b<=c', expectedResult: ['a+b', 'c'] },
            // { input: '1+2<=3', expectedResult: ['1+2', '3'] },
            // { input: '1+2< =3=x*-4', expectedResult: ['1+2', '3', 'x*-4'] },
            // { input: ' a +b  <=c', expectedResult: ['a+b', 'c'] },
            // { input: '1-2>=3   ', expectedResult: ['1-2', '3'] },
            // { input: ' 1  +2   > = 3  =x*   4 ', expectedResult: ['1+2', '3', 'x*4'] },
            // { input: 'a+b> =c', expectedResult: ['a+b', 'c'] },
            // { input: '-1+2>3', expectedResult: ['-1+2', '3'] },
            // { input: '1+2> =3=x*4', expectedResult: ['1+2', '3', 'x*4'] },
            // { input: ' a +b  >c', expectedResult: ['a+b', 'c'] },
            // { input: '1+2<3   ', expectedResult: ['1+2', '3'] },
            // { input: ' 1  +2   < = 3  >=x*   4 ', expectedResult: ['1+2', '3', 'x*4'] },
            // { input: '  a* b', expectedResult: ['a*b'] },
            // { input: '  ', expectedResult: [''] },
        ];

        inputs.forEach((test) => {
            it(`Should parse '${test.input}' as ${test.expectedResult}`, () => {
                const result = Factory.parseTermStrings(test.input);
                expect(result).toEqual(test.expectedResult);
            });
        });
    });

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
            { input: ' 1  +2   < = 3  >=x*   4 ', expectedResult: ['1+2', '3', 'x*4'] },
            { input: '  a* b', expectedResult: ['a*b'] },
            { input: '  ', expectedResult: [''] },
        ];

        inputs.forEach((test) => {
            it(`Should parse '${test.input}' as ${test.expectedResult}`, () => {
                const result = Factory.parseExpressionStrings(test.input);
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
                const result = Factory.removeEmptySpace(test.input);
                expect(result).toEqual(test.expectedResult);
            });
        });
    });
});