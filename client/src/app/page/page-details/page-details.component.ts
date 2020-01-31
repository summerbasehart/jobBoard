import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageService } from './../../page.service';
import { Page } from '../page';

@Component({
  selector: 'app-page-details',
  templateUrl: './page-details.component.html',
  styleUrls: ['./page-details.component.scss']
})
export class PageDetailsComponent implements OnInit {

  page: Page = { id: null, pageName: '', pageHeader: '', pageEmpl: '', pageCont: '', updated: null };
  isLoadingResults = true;

  constructor(private route: ActivatedRoute, private api: PageService, private router: Router) { }

  ngOnInit() {
    this.getPageDetails(this.route.snapshot.params.id);
  }

  getPageDetails(id: any) {
    this.api.getPage(id)
      .subscribe((data: any) => {
        this.page = data;
        console.log(this.page);
        this.isLoadingResults = false;
      });
  }

  deletePage(id: any) {
    this.isLoadingResults = true;
    this.api.deletePage(id)
      .subscribe(res => {
        this.isLoadingResults = false;
        this.router.navigate(['/page']);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
      );
  }
}