import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Page } from './page/page';

const apiUrl = 'http://localhost:3000/api/page/';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(private http: HttpClient) { }

  getPages(): Observable<Page[]> {
    return this.http.get<Page[]>(apiUrl)
      .pipe(
        tap(_ => this.log('fetched Pages')),
        catchError(this.handleError('getPages', []))
      );
  }

  getPage(id: any): Observable<Page> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Page>(url).pipe(
      tap(_ => console.log(`fetched page by id=${id}`)),
      catchError(this.handleError<Page>(`getPage id=${id}`))
    );
  }

  addPage(page: Page): Observable<Page> {
    return this.http.post<Page>(apiUrl, page).pipe(
      tap((prod: Page) => console.log(`added page w/ id=${page.id}`)),
      catchError(this.handleError<Page>('addPage'))
    );
  }

  updatePage(id: any, page: Page): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, page).pipe(
      tap(_ => console.log(`updated page id=${id}`)),
      catchError(this.handleError<any>('updatePage'))
    );
  }

  deletePage(id: any): Observable<Page> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Page>(url).pipe(
      tap(_ => console.log(`deleted page id=${id}`)),
      catchError(this.handleError<Page>('deletePage'))
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
