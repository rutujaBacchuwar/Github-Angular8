import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Bug } from './bug';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class BugService {

  // Base url
  baseurl = 'https://api.github.com/repos/rutujaBacchuwar/Github-Angular8/issues';

  constructor(private http: HttpClient) { }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'token cf2333a09906e0946587fa6e51b98000bc44c669',
      'Accept': 'application/json'


    })
    
  }

  // POST
  CreateBug(data): Observable<Bug> {
    return this.http.post<Bug>(this.baseurl, JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }  

  // GET
  GetIssue(id): Observable<Bug> {
    return this.http.get<Bug>(this.baseurl+'/'  + 1)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // GET
  GetIssues(): Observable<Bug> {
    return this.http.get<Bug>(this.baseurl )
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // PUT
  UpdateBug(id, data): Observable<Bug> {
    return this.http.patch<Bug>(this.baseurl +'/'+ 1, JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // DELETE
  DeleteBug(id){
    return this.http.delete<Bug>(this.baseurl + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // Error handling
  errorHandl(error) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     console.log(errorMessage);
     return throwError(errorMessage);
  }

}