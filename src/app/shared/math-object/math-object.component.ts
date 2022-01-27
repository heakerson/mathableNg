import { Component, Input, OnInit } from '@angular/core';
import { Operators, Sign } from 'src/models/math-object/enums.model';
import { MathObject } from 'src/models/math-object/math-object.model';
import { Term } from 'src/models/math-object/term.model';
import { Context } from 'src/models/search/context.model';
import { ChangeContext } from 'src/models/services/math/solution/change-context.model';
import { Factor } from 'src/models/math-object/factor/factor.model';
import { Expression } from 'src/models/math-object/factor/expression.model';

@Component({
  selector: 'app-math-object',
  templateUrl: './math-object.component.html',
  styleUrls: ['./math-object.component.scss']
})
export class MathObjectComponent implements OnInit {

  @Input()
  context!: Context;

  @Input()
  changeContext?: ChangeContext;

  get mathObject(): MathObject {
    return this.context?.target;
  }

  get mathObjectType(): string {
    return this.context.target.constructor.name;
  }

  get isFirstSibling(): boolean {
    return this.context.position.index === 0;
  }

  get inFirstTerm(): boolean {
    if (this.mathObject instanceof Factor) {
      if (this.context.parent && this.context.parent instanceof Term) {
        return this.context.parentContext?.position.index === 0;
      }
    }
    return false;
  }

  get isRoot(): boolean {
    return this.context.isRoot;
  }

  get additionalOpString(): string {
    if (this.mathObject instanceof Term && this.context.parentContext) {
      const parent = this.context.parent;

      if (parent instanceof Expression) {
        const termIndex = this.context.position.index;
        const op = parent.getAdditionalOperatorForIndex(termIndex);

        if (op !== Operators.None) {
          return ` ${op} `;
        }
      }
    }

    return '';
  }

  get flippedFactorStr(): string {
    if (this.mathObject instanceof Factor) {
      return this.mathObject.flipSign().toString();
    }

    return '';
  }

  constructor() { }

  getChild(index: number): MathObject {
    return this.context.target.children[index];
  }

  getChildContext(index: number): Context {
    return this.getChild(index).getContext(this.context.root) as Context;
  }

  isPositive(mo: MathObject): boolean {
    if (mo instanceof Term || mo instanceof Factor) {
      return mo.sign === Sign.Positive;
    }
    return false;
  }

  ngOnInit(): void {
  }

}