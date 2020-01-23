import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from '../../post.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { CategoryService } from '../../category.service';
import { Category } from './../../category/category';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent implements OnInit {

  postForm: FormGroup;
  category = '';
  id = '';
  postTitle = '';
  postAuthor = '';
  postDescription = '';
  postQualifications = '';
  postReference = '';
  updated: Date = null;
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();
  categories: Category[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: PostService,
    private catApi: CategoryService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getCategories();
    this.getPost(this.route.snapshot.params.id);
    this.postForm = this.formBuilder.group({
      postTitle : [null, Validators.required],
      category : [null, Validators.required],
      postAuthor : [null, Validators.required],
      postDescription : [null, Validators.required],
      postQualifications : [null, Validators.required],
      postReference : [null, Validators.required],
    });
  }

  getPost(id: any) {
    this.api.getPost(id).subscribe((data: any) => {
      this.id = data.id;
      this.postForm.setValue({
        postTitle: data.postTitle,
        category: data.category,
        postAuthor: data.postAuthor,
        postDescription : data.postDescription,
        postQualifications: data.postQualifications,
        postReference: data.postReference,
      });
    });
  }

  getCategories() {
    this.catApi.getCategories()
      .subscribe((res: any) => {
        this.categories = res;
        console.log(this.categories);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.updatePost(this.id, this.postForm.value)
      .subscribe((res: any) => {
          const id = res.id;
          this.isLoadingResults = false;
          this.router.navigate(['/post-details', id]);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

}
