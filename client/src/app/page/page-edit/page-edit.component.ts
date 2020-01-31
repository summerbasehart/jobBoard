import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.scss']
})
export class PageEditComponent implements OnInit {

  pageForm: FormGroup;
  id = '';
  pageName = '';
  pageHeader = '';
  pageEmpl = '';
  pageCont = '';
  updated: Date = null;
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private route: ActivatedRoute, private api: PageService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getPage(this.route.snapshot.params.id);
    this.pageForm = this.formBuilder.group({
      pageName: [null, Validators.required],
      pageHeader: [null, Validators.required],
      pageEmpl: [null, Validators.required],
      pageCont: [null, Validators.required]
    });
  }

  getPage(id: any) {
    this.api.getPage(id).subscribe((data: any) => {
      this.id = data._id;
      this.pageForm.setValue({
        pageName: data.pageName,
        pageContent: data.pageContent
      });
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.updatePage(this.id, this.pageForm.value)
      .subscribe((res: any) => {
          this.isLoadingResults = false;
          this.router.navigate(['/page/']);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  pageDetails() {
    this.router.navigate(['/page-details/', this.id]);
  }

}