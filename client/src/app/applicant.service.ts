import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Applicant } from './applicant/applicant';

const apiUrl = 'http://localhost:3000/api/applicant/';

@Injectable({
    providedIn: 'root'
  })
  export class ApplicantService {
      
  }

