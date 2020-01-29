import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicantService } from './../../applicant.service';
import { Applicant } from '../applicant';
import { PostService } from '../../post.service';
import { Post } from '../../post/post';

@Component({
  selector: 'app-applicant-details',
  templateUrl: './applicant-details.component.html',
  styleUrls: ['./applicant-details.component.scss']
})
export class ApplicantDetailsComponent implements OnInit {

  applicant: Applicant = {
    id: null,
    appPhone: '',
    appEmail: '',
    appName: '',
    appAddress1: '',
    appAddress2: '',
    post: '',
    appResume: '',
    updated: null
  };
  isLoadingResults = true;
  post: Post[] = []

  constructor(private route: ActivatedRoute, private api: ApplicantService, private router: Router, private postApi: PostService) { }

  ngOnInit() {
    this.getApplicantDetails(this.route.snapshot.params.id);
    this.route.params.subscribe(params => {
      this.getApplicantsByPost(this.route.snapshot.params.post);
    });
  }

  getApplicantDetails(id: any) {
    this.api.getApplicant(id)
      .subscribe((app: any) => {
        this.applicant = app;
        this.applicant.id = app._id;
        console.log(this.applicant);
        this.isLoadingResults = false;
      });
  }

  getApplicantsByPost(id: any) {
    this.post = [];
    var x = this.applicant.post;
    this.api.getApplicantsByPost(x)
      .subscribe((res: any) => {
        this.post = res;
        console.log(this.post);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  deleteApplicant(id: any) {
    this.isLoadingResults = true;
    this.api.deleteApplicant(id)
      .subscribe(res => {
        this.isLoadingResults = false;
        this.router.navigate(['/applicant']);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
      );
  }

  // getPostDetails(id: any) {
  //   this.postApi.getPost(Post)
  //     .subscribe((data: any) => {
  //       this.post = data;
  //       this.post.id = data._id;
  //       console.log(this.post);
  //       this.isLoadingResults = false;
  //     });
  // }

  // getPost() {
  //   var x = this.applicant.post
  //   this.postApi.getPost(x)
  //     .subscribe((res: any) => {
  //       this.post = res;
  //       console.log(this.post);
  //       this.isLoadingResults = false;
  //     }, err => {
  //       console.log(err);
  //       this.isLoadingResults = false;
  //     });
  // }

}