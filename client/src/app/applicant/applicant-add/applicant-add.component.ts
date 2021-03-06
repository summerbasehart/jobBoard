import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicantService } from '../../applicant.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Post } from '../../post/post';
import { PostService } from '../../post.service';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { AlertService } from '../../_alert';


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
  public message = "Thank you for applying to OST! You will now be redirected back to the job board..";

  @ViewChild(ToastContainerDirective, {static: true}) toastContainer: ToastContainerDirective;

  constructor(
    private router: Router,
    private api: ApplicantService,
    private postService: PostService,
    private toastr: ToastrService,
    private alertService: AlertService,
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

  public myFunc() {
    alert(this.message);
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
          this.alertService.success(this.message);
          setTimeout(() => {
            this.router.navigate(['/home']);
        }, 5000);  //5s
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }
}