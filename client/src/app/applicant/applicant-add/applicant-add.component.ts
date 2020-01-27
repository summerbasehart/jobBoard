import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicantService } from '../../applicant.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Post } from '../../post/post';
import { PostService } from '../../post.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-applicant-add',
  templateUrl: './applicant-add.component.html',
  styleUrls: ['./applicant-add.component.scss']
})
export class ApplicantAddComponent implements OnInit {
  applicantForm: FormGroup;
  appName = '';
  appEmail = '';
  appPhone: '';
  appAddress1 = '';
  appAddress2 = '';
  appResume = '';
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();
  posts: Post[] = [];

  constructor(
    private router: Router,
    private api: ApplicantService,
    private postService: PostService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getPosts();
    this.applicantForm = this.formBuilder.group({
      post : [null, Validators.required],
      appName : [null, Validators.required],
      appEmail : [null, Validators.required],
      appPhone : [null, Validators.required],
      appAddress1 : [null, Validators.required],
      appAddress2 : [null, Validators.required],
      appResume : [null, Validators.required],
    });
  }

  getPosts() {
    this.postService.getPosts()
      .subscribe((res: any) => {
        this.posts = res;
        console.log(this.posts);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.addApplicant(this.applicantForm.value)
      .subscribe((res: any) => {
          const id = res.id;
          this.isLoadingResults = false;
          this.router.navigate(['/home/']);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }
}