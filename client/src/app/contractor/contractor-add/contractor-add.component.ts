import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContractorService } from '../../contractor.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
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
  selector: 'app-contractor-add',
  templateUrl: './contractor-add.component.html',
  styleUrls: ['./contractor-add.component.scss']
})
export class ContractorAddComponent implements OnInit {
  contractorForm: FormGroup;
  company = '';
  conName = '';
  conEmail = '';
  conPhone: '';
  conAddress1 = '';
  conAddress2 = '';
  message = '';
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();
  public alert = "Thank you for your submission! You will now be returned to the main page..";

  constructor(
    private router: Router,
    private api: ContractorService,
    private alertService: AlertService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.contractorForm = this.formBuilder.group({
      company : [null, Validators.required],
      conName : [null, Validators.required],
      conEmail : [null, Validators.required],
      conPhone : [null, Validators.required],
      conAddress1 : [null, Validators.required],
      conAddress2 : [null, Validators.required],
      message : [null, Validators.required],
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.addContractor(this.contractorForm.value)
      .subscribe((res: any) => {
          const id = res.id;
          this.isLoadingResults = false;
          this.alertService.success(this.alert);
          setTimeout(() => {
            this.router.navigate(['/home']);
        }, 5000);  //5s
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }
}