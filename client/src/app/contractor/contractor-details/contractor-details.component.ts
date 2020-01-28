import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContractorService } from '../../contractor.service';
import { Contractor } from '../contractor';
import { PostService } from '../../post.service';
import { Post } from '../../post/post';

@Component({
  selector: 'app-contractor-details',
  templateUrl: './contractor-details.component.html',
  styleUrls: ['./contractor-details.component.scss']
})
export class ContractorDetailsComponent implements OnInit {

    contractor: Contractor = { 
      id: null,
      company: "",
      conName: "",
      conPhone: "",
      conEmail: "",
      conAddress1: "",
      conAddress2: "",
      conMessage: "",
      updated: null
    };

  isLoadingResults = true;
  post: Post[] = [];

  constructor(private route: ActivatedRoute, private api: ContractorService, private router: Router, private postApi: PostService) { }

  ngOnInit() {
    this.getContractorDetails(this.route.snapshot.params.id);
  }

  getContractorDetails(id: any) {
    this.api.getContractor(id)
      .subscribe((data: any) => {
        this.contractor = data;
        this.contractor.id = data._id;
        console.log(this.contractor);
        this.isLoadingResults = false;
      });
  }

  deleteContractor(id: any) {
    this.isLoadingResults = true;
    this.api.deleteContractor(id)
      .subscribe(res => {
        this.isLoadingResults = false;
        this.router.navigate(['/contractor']);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
      );
  }

  
}