import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Contractor } from './contractor/contractor';

const apiUrl = 'http://localhost:3000/api/contractor/';

@Injectable({
  providedIn: 'root'
})
export class ContractorService {

  constructor(private http: HttpClient) { }

  getApplicants(): Observable<Contractor[]> {
    return this.http.get<Contractor[]>(apiUrl)
      .pipe(
        tap(_ => this.log('fetched contractors')),
        catchError(this.handleError('getContractors', []))
      );
  }

  getApplicant(id: any): Observable<Contractor> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Contractor>(url).pipe(
      tap(_ => console.log(`fetched contractor by id=${id}`)),
      catchError(this.handleError<Contractor>(`getContractor id=${id}`))
    );
  }

  addApplicant(applicant: Contractor): Observable<Contractor> {
    return this.http.post<Contractor>(apiUrl, applicant).pipe(
      tap((prod: Contractor) => console.log(`added contractor w/ id=${contractor.id}`)),
      catchError(this.handleError<Contractor>('addContractor'))
    );
  }

  deleteApplicant(id: any): Observable<Contractor> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Contractor>(url).pipe(
      tap(_ => console.log(`deleted contractor id=${id}`)),
      catchError(this.handleError<Contractor>('deleteContractor'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }

}