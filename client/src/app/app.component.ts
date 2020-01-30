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
      } else {
        this.loginStatus = false;
        document.getElementById("mainContainer").style.maxWidth = "1140px";
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

  myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
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

