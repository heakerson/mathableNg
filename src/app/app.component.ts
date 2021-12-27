import { Component, OnInit } from '@angular/core';
import { Expression } from 'src/models/math-object/factor/expression.model';
import { Variable } from 'src/models/math-object/factor/variable.model';
import { Term } from 'src/models/math-object/term.model';
import { Factory } from 'src/models/services/factory.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'MathableNG';

  ngOnInit(): void {
    const expression = new Expression('(a+b+c*(e+f))');
    const thing = new Variable('-');
    console.log(thing);
    // const type = Term;
    // console.log('traverse for', type);
  
    expression.travsere(Term, (term: Term) => {
      // console.log('FOUND TERM', term);
    });

    // console.log(Factory.buildFactor('-sin[(x)]'));
  }
}
