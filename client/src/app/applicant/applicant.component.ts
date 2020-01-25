import { Component, OnInit } from '@angular/core';
import { ApplicantService } from '../applicant.service';
import { Applicant } from './applicant';

@Component({
  selector: 'app-applicant',
  templateUrl: './applicant.component.html',
  styleUrls: ['./applicant.component.scss']
})
export class ApplicantComponent implements OnInit {

  data: Applicant[] = [];
  isLoadingResults = true;

  constructor(private api: ApplicantService) { }

  ngOnInit() {
    this.api.getApplicants()
      .subscribe((res: any) => {
        this.data = res;
        console.log(this.data);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

}