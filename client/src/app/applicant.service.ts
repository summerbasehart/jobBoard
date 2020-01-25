import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Applicant } from './applicant/applicant';
import { Post } from './post/post';

const apiUrl = 'http://localhost:3000/api/applicant/';

@Injectable({
    providedIn: 'root'
  })
  export class ApplicantService {

    constructor(private http: HttpClient) { }

    getApplicants(): Observable<Applicant[]> {
        return this.http.get<Applicant[]>(apiUrl)
          .pipe(
            tap(_ => this.log('fetched applicants')),
            catchError(this.handleError('getApplicants', []))
          );
      }
    
      getApplicant(id: any): Observable<Applicant> {
        const url = `${apiUrl}/${id}`;
        return this.http.get<Applicant>(url).pipe(
          tap(_ => console.log(`fetched applicant by id=${id}`)),
          catchError(this.handleError<Applicant>(`getApplicant id=${id}`))
        );
      }
    
      addApplicant(applicant: Applicant): Observable<Applicant> {
        return this.http.post<Applicant>(apiUrl, applicant).pipe(
          tap((prod: Applicant) => console.log(`added applicant w/ id=${applicant.id}`)),
          catchError(this.handleError<Applicant>('addApplicant'))
        );
      }
    
      updateApplicant(id: any, applicant: Applicant): Observable<any> {
        const url = `${apiUrl}/${id}`;
        return this.http.put(url, applicant).pipe(
          tap(_ => console.log(`updated applicant id=${id}`)),
          catchError(this.handleError<any>('updateApplicant'))
        );
      }
    
      deleteApplicant(id: any): Observable<Applicant> {
        const url = `${apiUrl}/${id}`;
        return this.http.delete<Applicant>(url).pipe(
          tap(_ => console.log(`deleted applicant id=${id}`)),
          catchError(this.handleError<Applicant>('deleteApplicant'))
        );
      }

      getPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(apiUrl + 'post')
          .pipe(
            tap(_ => this.log('fetched Posts')),
            catchError(this.handleError('getPosts', []))
          );
      }
    
      getPost(id: any): Observable<Post> {
        return this.http.get<Post>(apiUrl + 'post/' + id).pipe(
          tap(_ => console.log(`fetched post by id=${id}`)),
          catchError(this.handleError<Post>(`getPost id=${id}`))
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

