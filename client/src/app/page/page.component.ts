import { Component, OnInit } from '@angular/core';
import { PageService } from '../page.service';
import { Page } from './page';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  displayedColumns: string[] = ['pageName', 'pageContent'];
  data: Page[] = [];
  isLoadingResults = true;

  constructor(private api: PageService) { }

  ngOnInit() {
    this.api.getPages()
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