import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from './category/category';
import { HomeService } from './home.service';
import { AuthService } from './auth.service';
import { ApplicantService } from './applicant.service';
import { ContractorService } from './contractor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  title = 'client';

  constructor(private api: HomeService, private authService: AuthService, private router: Router, private applicantService: ApplicantService, private contractorService: ContractorService) { }

  categories: Category[] = [];
  loginStatus = false;

  ngOnInit() {
    this.authService.isLoggedIn.subscribe((status: any) => {
      if (status === true) {
        this.loginStatus = true;
        document.getElementById("mainContainer").style.maxWidth = "99%";
        document.getElementById("dashboard").style.minHeight = "700px";
      } else {
        this.loginStatus = false;
      }
    });
    
    this.api.getCategories()
      .subscribe((res: any) => {
        this.categories = res;
        console.log(this.categories);
      }, err => {
        console.log(err);
      });
    // this.applicantService.addApplicant()
  }

  
  logout() {
    this.authService.logout()
      .subscribe((res: any) => {
        this.router.navigate(['/']);
      }, err => {
        console.log(err);
      });
  }
}

