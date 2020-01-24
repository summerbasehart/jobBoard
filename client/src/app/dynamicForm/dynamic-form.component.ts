import { Component, Input, OnInit }  from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { QuestionBase }              from './question-base';
import { QuestionControlService }    from '../question-control.service';

import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [ QuestionControlService ]
})
export class DynamicFormComponent implements OnInit {

  @Input() questions: QuestionBase<any>[] = [];
  form: FormGroup;
  payLoad = '';

  constructor(private qcs: QuestionControlService) {  }

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);
  }

  onSubmit() {

    
    this.payLoad = JSON.stringify(this.form.value);
  }
}