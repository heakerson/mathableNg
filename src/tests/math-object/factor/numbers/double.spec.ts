import { Sign } from "src/models/math-object/enums.model";
import { Double } from "src/models/math-object/factor/number/double.model";
import { ErrorCodes } from "src/models/services/error-handler.service";
import { mathObjectConstructorErrorTests, mathObjectConstructorTests, mathObjectTraverseTests } from "src/tests/math-object/math-object.spec";
import { factorConstructorTests } from "../factor.spec";
import { RealNumberConstrTest, realNumberConstructorTests, RealNumberTraverseTest } from "./real-number.spec";

describe('Double', () => {

    describe('Constructor Tests', () => {
        const standardBuilder = (test: RealNumberConstrTest) => new Double(test.input);
        const staticBuilder = (test: RealNumberConstrTest) => Double.fromNumber(test.value);

        describe('Success', () => {
            const constructorTests: RealNumberConstrTest[] = [
                new RealNumberConstrTest({ input: '1', toString: '1', value: 1, sign: Sign.Positive }),
                new RealNumberConstrTest({ input: '.5', toString: '0.5', value: .5, sign: Sign.Positive }),
                new RealNumberConstrTest({ input: '-.5', toString: '-0.5', value: -.5, sign: Sign.Negative }),
                new RealNumberConstrTest({ input: '-.0001000220', toString: '-0.000100022', value: -.000100022, sign: Sign.Negative }),
                new RealNumberConstrTest({ input: '-1', toString: '-1', value: -1, sign: Sign.Negative }),
                new RealNumberConstrTest({ input: '-1.004', toString: '-1.004', value: -1.004, sign: Sign.Negative }),
                new RealNumberConstrTest({ input: '0', toString: '0', value: 0, sign: Sign.Positive }),
                new RealNumberConstrTest({ input: '-37.000000000007', toString: '-37.000000000007', value: -37.000000000007, sign: Sign.Negative }),
            ];
    
            mathObjectConstructorTests('STANDARD Constructor', constructorTests, standardBuilder);
            mathObjectConstructorTests('STATIC Constructor', constructorTests, staticBuilder);
    
            factorConstructorTests('STANDARD Constructor', constructorTests, standardBuilder);
            factorConstructorTests('STATIC Constructor', constructorTests, staticBuilder);
    
            realNumberConstructorTests('STANDARD Constructor', constructorTests, standardBuilder);
            realNumberConstructorTests('STATIC Constructor', constructorTests, staticBuilder);
        });

        describe('Errors', () => {
            const errorTests: { input: string, errorCode: ErrorCodes }[] = [
                { input: '', errorCode: ErrorCodes.EMPTY },
                { input: '  ', errorCode: ErrorCodes.EMPTY },
                { input: 'x', errorCode: ErrorCodes.Number.NOT_A_NUMBER },
                { input: '-x', errorCode: ErrorCodes.Number.NOT_A_NUMBER },
                { input: '-x.7', errorCode: ErrorCodes.Number.NOT_A_NUMBER },
            ]

            const tests = errorTests.map(e => new RealNumberConstrTest({ input: e.input, children: [], toString: '' }));

            mathObjectConstructorErrorTests('STANDARD Constructor', tests, standardBuilder);
        });
    });

    describe('Individual Methods', () => {

        describe('Traverse', () => {
            const standardBuilder = (test: RealNumberTraverseTest) => new Double(test.input);
            const staticBuilder = (test: RealNumberTraverseTest) => Double.fromNumber(test.value);

            const tests: RealNumberTraverseTest[] = [
                new RealNumberTraverseTest({ input: '.5', type: Double, count: 1, firstChild: '0.5', lastChild: '0.5', value: .5}),
                new RealNumberTraverseTest({ input: '-3.777', type: Double, count: 1, firstChild: '-3.777', lastChild: '-3.777', value: -3.777}),
                new RealNumberTraverseTest({ input: '-.0001000220', type: Double, count: 1, firstChild: '-0.000100022', lastChild: '-0.000100022', value: -.0001000220}),
            ];

            const childFirstTests: RealNumberTraverseTest[] = [
                new RealNumberTraverseTest({ input: '.5', type: Double, count: 1, firstChild: '0.5', lastChild: '0.5', value: .5}),
                new RealNumberTraverseTest({ input: '-3.777', type: Double, count: 1, firstChild: '-3.777', lastChild: '-3.777', value: -3.777}),
                new RealNumberTraverseTest({ input: '-.0001000220', type: Double, count: 1, firstChild: '-0.000100022', lastChild: '-0.000100022', value: -.0001000220}),
            ];

            mathObjectTraverseTests('Parent First STANDARD', tests, standardBuilder, false);
            mathObjectTraverseTests('Parent First STATIC', tests, staticBuilder, false);
            mathObjectTraverseTests('Child First STANDARD', childFirstTests, standardBuilder, true);
            mathObjectTraverseTests('Child First STATIC', childFirstTests, staticBuilder, true);
        });
    });
});