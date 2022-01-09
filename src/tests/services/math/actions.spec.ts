import { Expression } from "src/models/math-object/factor/expression.model";
import { Power } from "src/models/math-object/factor/power.model";
import { Rational } from "src/models/math-object/factor/rational.model";
import { MathObject } from "src/models/math-object/math-object.model";
import { Term } from "src/models/math-object/term.model";
import { Actions, ActionTypes } from "src/models/services/math/actions.model";
import { ChangeContext } from "src/models/services/math/chainer.model";

export class ActionTest {
    mo!: MathObject;
    finalResult: string = '';
    beforeHighlights: string[][] = [];
    afterHighlights: string[][] = [];
    actions: ActionTypes[] = [];
    previousChanges: ChangeContext[] = []; // to test concatinating results


    constructor(props: Partial<ActionTest>) {
        Object.assign(this, props);
    }
}

describe('Mathobject Actions', () => {

    describe('removeZeroFactor', () => {
        const tests: ActionTest[] = [
            new ActionTest({ mo: new Expression('a+0'), finalResult: '(a+0)' }),
            new ActionTest({ mo: new Expression('a-0'), finalResult: '(a-0)' }),
            new ActionTest({ mo: new Expression('0'), finalResult: '(0)' }),
            new ActionTest({ mo: new Expression('-0'), finalResult: '(-0)' }),
            new ActionTest({ mo: new Rational('0/x'), finalResult: '(0/x)' }),
            new ActionTest({ mo: new Expression('a^(3*0)'), finalResult: '(a^(0))', beforeHighlights: [['0']], afterHighlights: [['0']], actions: [ ActionTypes.removeZeroFactor ] }),
            new ActionTest({ mo: new Expression('a^(-3*0)'), finalResult: '(a^(-0))', beforeHighlights: [['0']], afterHighlights: [['-0']], actions: [ ActionTypes.removeZeroFactor ] }),
            new ActionTest({ mo: new Expression('a+3*0'), finalResult: '(a+0)', beforeHighlights: [['0']], afterHighlights: [['0']], actions: [ ActionTypes.removeZeroFactor ] }),
            new ActionTest({ mo: new Expression('a+3*-0'), finalResult: '(a+0)', beforeHighlights: [['-0']], afterHighlights: [['0']], actions: [ ActionTypes.removeZeroFactor ] }),
            new ActionTest({ mo: new Expression('a-3*-0'), finalResult: '(a-0)', beforeHighlights: [['-0']], afterHighlights: [['-0']], actions: [ ActionTypes.removeZeroFactor ] }),
            new ActionTest({ mo: new Expression('-x*0'), finalResult: '(-0)', beforeHighlights: [['0']], afterHighlights: [['-0']], actions: [ ActionTypes.removeZeroFactor ] }),
            new ActionTest({ mo: new Expression('a-3*0'), finalResult: '(a-0)', beforeHighlights: [['0']], afterHighlights: [['-0']], actions: [ ActionTypes.removeZeroFactor ] }),
            new ActionTest({ mo: new Expression('a-0*3'), finalResult: '(a-0)', beforeHighlights: [['-0']], afterHighlights: [['-0']], actions: [ ActionTypes.removeZeroFactor ] }),
            new ActionTest({ mo: new Expression('a+3*(b+c*0)*0'), finalResult: '(a+0)', beforeHighlights: [['0']], afterHighlights: [['0']], actions: [ ActionTypes.removeZeroFactor ] }),
        ];

        actionTester('Turn any terms with zero factors to a zero', tests, Actions.removeZeroFactor);
    });

    describe('removeZeroTerm', () => {
        const tests: ActionTest[] = [
            new ActionTest({ mo: new Expression('0'), finalResult: '(0)' }),
            new ActionTest({ mo: new Expression('-0'), finalResult: '(-0)' }),
            new ActionTest({ mo: new Power('a^-0'), finalResult: 'a^-0' }),
            new ActionTest({ mo: new Rational('(a/(b+(0)))'), finalResult: '(a/(b+(0)))' }),
            new ActionTest({ mo: new Rational('(a/(b+(-0)))'), finalResult: '(a/(b+(-0)))' }),
            new ActionTest({ mo: new Expression('a+0'), finalResult: '(a)', beforeHighlights: [['0']], actions: [ ActionTypes.removeZeroTerm ] }),
            new ActionTest({ mo: new Expression('a-0'), finalResult: '(a)', beforeHighlights: [['-0']], actions: [ ActionTypes.removeZeroTerm ]  }),
            new ActionTest({ mo: new Expression('a^(3+0)'), finalResult: '(a^(3))', beforeHighlights: [['0']], actions: [ ActionTypes.removeZeroTerm ] }),
            new ActionTest({ mo: new Rational('(a/(x+0*(b^(2+0))))'), finalResult: '(a/(x+0*(b^(2))))', beforeHighlights: [['0']], actions: [ ActionTypes.removeZeroTerm ] }),
            new ActionTest({ mo: new Rational('(a/(x+0*(b^(2-0))))'), finalResult: '(a/(x+0*(b^(2))))', beforeHighlights: [['-0']], actions: [ ActionTypes.removeZeroTerm ] }),
            new ActionTest({ mo: new Rational('(a/(x+0*(b^(2+0+log[y+0,10]))))'), finalResult: '(a/(x+0*(b^(2+log[(y+0),10]))))', beforeHighlights: [['0']], actions: [ ActionTypes.removeZeroTerm ] }),
            new ActionTest({ mo: new Rational('(a/(x+0*(b^(2-0+log[y+0,10]))))'), finalResult: '(a/(x+0*(b^(2+log[(y+0),10]))))', beforeHighlights: [['-0']], actions: [ ActionTypes.removeZeroTerm ] }),
        ];

        actionTester('Remove the first zero term it finds', tests, Actions.removeZeroTerm);
    });

    describe('constantMultiplication', () => {
        const tests: ActionTest[] = [
            new ActionTest({ mo: new Expression('0'), finalResult: '(0)' }),
            new ActionTest({ mo: new Expression('0.0'), finalResult: '(0)' }),
            new ActionTest({ mo: new Expression('-0.0'), finalResult: '(-0)' }),
            new ActionTest({ mo: new Term('-1*b'), finalResult: '-1*b' }),
            new ActionTest({ mo: new Term('2^2'), finalResult: '2^2' }),
            new ActionTest({ mo: new Term('-0*sin[y]*2'), finalResult: '-0*sin[y]', beforeHighlights: [['-0', '2']], afterHighlights: [['-0']], actions: [ActionTypes.constantMultiplication] }),
            new ActionTest({ mo: new Term('-2*sin[y]*0'), finalResult: '-0*sin[y]', beforeHighlights: [['-2', '0']], afterHighlights: [['-0']], actions: [ActionTypes.constantMultiplication] }),
            new ActionTest({ mo: new Term('0*-2'), finalResult: '0', beforeHighlights: [['0', '-2']], afterHighlights: [['0']], actions: [ActionTypes.constantMultiplication] }),
            new ActionTest({ mo: new Term('2*-0'), finalResult: '0', beforeHighlights: [['2', '-0']], afterHighlights: [['0']], actions: [ActionTypes.constantMultiplication] }),
            new ActionTest({ mo: new Term('2*3'), finalResult: '6', beforeHighlights: [['2', '3']], afterHighlights: [['6']], actions: [ActionTypes.constantMultiplication] }),
            new ActionTest({ mo: new Term('2.9*t*.7'), finalResult: '2.03*t', beforeHighlights: [['2.9', '0.7']], afterHighlights: [['2.03']], actions: [ActionTypes.constantMultiplication] }),
            new ActionTest({ mo: new Term('-2*3'), finalResult: '-6', beforeHighlights: [['-2', '3']], afterHighlights: [['-6']], actions: [ActionTypes.constantMultiplication] }),
            new ActionTest({ mo: new Term('-2*x*-3'), finalResult: '6*x', beforeHighlights: [['-2', '-3']], afterHighlights: [['6']], actions: [ActionTypes.constantMultiplication] }),
            new ActionTest({ mo: new Term('-2*x*-3*(x*4*-2)'), finalResult: '-2*x*-3*(x*-8)', beforeHighlights: [['4', '-2']], afterHighlights: [['-8']], actions: [ActionTypes.constantMultiplication] }),
            new ActionTest({ mo: new Term('-2*x*(-p*10.5*-6)*-3*(x*4*-2)'), finalResult: '-2*x*(-p*-63)*-3*(x*4*-2)', beforeHighlights: [['10.5', '-6']], afterHighlights: [['-63']], actions: [ActionTypes.constantMultiplication] }),
        ];

        actionTester('Remove the first constant multiplication found, child first', tests, Actions.constantMultiplication);
    });
});

export function actionTester<TTest extends ActionTest>(
    additionalLabel: string,
    tests: TTest[],
    action: (mo: MathObject, currentChanges: ChangeContext[]) => ChangeContext[] | null
): void {

    describe(`Action should: ${additionalLabel}`, () => {
        tests.forEach((test: TTest) => {
            it(`'${test.mo.toString()}' => should result in correct changes`, () => {
                const mo = test.mo;
                const allChangeCtxs = action(mo, test.previousChanges);
                // console.log(test);
                // console.log(mo);
                // console.log('toString', mo.toString());
                // console.log(result);

                if (allChangeCtxs?.length) {
                    const finalMo = allChangeCtxs[allChangeCtxs.length - 1].newMathObject;
                    // console.log('finalMo toString', finalMo.toString());
                    // console.log('allChangeCtxs', allChangeCtxs);

                    expect(finalMo.toString()).toEqual(test.finalResult);
                    
                    allChangeCtxs.forEach((changeCtx: ChangeContext, ci: number) => {
                        // console.log('ChangeContext', changeCtx);
                        
                        const prevHighlightStrs = test.beforeHighlights[ci];
                        const newHighlightStrs = test.afterHighlights[ci];

                        expect(changeCtx.previousHighlightObjects.length).toEqual(prevHighlightStrs ? prevHighlightStrs.length: 0);
                        expect(changeCtx.newHighlightObjects.length).toEqual(newHighlightStrs ? newHighlightStrs.length : 0);
                        expect(changeCtx.action).toEqual(test.actions[ci]);

                        changeCtx.previousHighlightObjects.forEach((prevHighlightMo: MathObject, hi: number) => {
                            const highlightStr = prevHighlightStrs[hi];
                            expect(prevHighlightMo.toString()).toEqual(highlightStr);
                            const prevHighlightCtx = mo.find(MathObject, (child) => child.id === prevHighlightMo.id);
                            expect(prevHighlightCtx?.target).toBeTruthy();
                            expect(prevHighlightCtx?.target.toString()).toEqual(highlightStr);
                        });

                        changeCtx.newHighlightObjects.forEach((newHighlightMO: MathObject, hi: number) => {
                            const highlightStr = newHighlightStrs[hi];
                            expect(newHighlightMO.toString()).toEqual(highlightStr);
                            const newHighlightCtx = changeCtx.newMathObject.find(MathObject, (child) => child.id === newHighlightMO.id);
                            expect(newHighlightCtx?.target).toBeTruthy();
                            expect(newHighlightCtx?.target.toString()).toEqual(highlightStr);
                        });
                    });
                } else {
                    expect(mo.toString()).toEqual(test.finalResult);
                }
            });
        });
    });
}