import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContractorService } from '../../applicant.service';
import { Contractor } from '../contractor';
import { PostService } from '../../post.service';
import { Post } from '../../post/post';

@Component({
  selector: 'app-applicant-details',
  templateUrl: './applicant-details.component.html',
  styleUrls: ['./applicant-details.component.scss']
})
export class ContractorDetailsComponent implements OnInit {

    applicant: Contractor = { 
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
  post: Post[] = [];

  constructor(private route: ActivatedRoute, private api: ApplicantService, private router: Router, private postApi: PostService) { }

  ngOnInit() {
    this.getPost()
    this.getApplicantDetails(this.route.snapshot.params.id);
  }

  getApplicantDetails(id: any) {
    this.api.getApplicant(id)
      .subscribe((data: any) => {
        this.applicant = data;
        this.applicant.id = data._id;
        console.log(this.applicant);
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

  getPost() {
    this.postApi.getPost(this.post)
      .subscribe((res: any) => {
        this.post = res.id;
        console.log(this.post);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  
}