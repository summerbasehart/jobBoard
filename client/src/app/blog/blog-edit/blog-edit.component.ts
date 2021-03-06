import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogService } from '../../blog.service';
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
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.scss']
})
export class BlogEditComponent implements OnInit {

  blogForm: FormGroup;
  id = '';
  blogTitle = '';
  blogImgUrl: '';
  blogAuthor = '';
  blogContent = '';
  blogPs = '';
  updated: Date = null;
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: BlogService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getBlog(this.route.snapshot.params.id);
    this.blogForm = this.formBuilder.group({
        blogTitle : [null, Validators.required],
        blogImgUrl : [null, Validators.required],
        blogAuthor : [null, Validators.required],
        blogContent : [null, Validators.required],
        blogPs : [null, Validators.required],
    });
  }

  getBlog(id: any) {
    this.api.getBlog(id).subscribe((data: any) => {
      this.id = data._id;
      this.blogForm.setValue({
        blogTitle: data.blogTitle,
        blogImgUrl: data.blogImgUrl,
        blogAuthor: data.blogAuthor,
        blogContent: data.blogContent,
        blogPs: data.blogPs,
      });
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.updateBlog(this.id, this.blogForm.value)
      .subscribe((res: any) => {
          // const id = res.id;
          this.isLoadingResults = false;
          this.router.navigate(['/blog/']);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

}
