import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageService } from '../../page.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-page-add',
  templateUrl: './page-add.component.html',
  styleUrls: ['./page-add.component.scss']
})
export class PageAddComponent implements OnInit {

  pageForm: FormGroup;
  pageName = '';
  pageContent = '';
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private api: PageService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.pageForm = this.formBuilder.group({
        pageName : [null, Validators.required],
        pageContent : [null, Validators.required]
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.addPage(this.pageForm.value)
      .subscribe((res: any) => {
          const id = res._id;
          this.isLoadingResults = false;
          this.router.navigate(['/page/']);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }

}
