import { Component, OnInit } from '@angular/core';
import { ContractorService } from '../contractor.service';
import { Contractor } from './contractor';


@Component({
  selector: 'app-contractor',
  templateUrl: './contractor.component.html',
  styleUrls: ['./contractor.component.scss']
})
export class ContractorComponent implements OnInit {

  // displayedColumns: string[] = ['appName', 'updated'];
  data: Contractor[] = [];
  isLoadingResults = true;

  constructor(private api: ContractorService) { }

  ngOnInit() {
    this.api.getContractors()
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