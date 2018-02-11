import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import Status from './status';
//RxJS operator for mapping the observable
import 'rxjs/add/operator/map';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class StatusesService {

  private statusesUrl: string = "http://localhost:3000/api/statuses"

  constructor(private http: HttpClient) { }

  /*GET*/
  getStatuses(): Observable<Status[]> {
    return this.http.get<Status[]>(this.statusesUrl)
      .pipe(
      tap(statuses => console.log(`fetched statuses`)),
      catchError(this.handleErrorAndContinue('getStatuses', []))
      ).map(res => { return res["data"] as Status[]; })
  }

  /*CREATE status*/
  createStatus(status: Status): Observable<any> {
    return this.http.post(this.statusesUrl, status).pipe(
      tap(res => console.log(`created status id=${res["data"]._id}`)),
      catchError(this.handleErrorAndThrow<any>(`not possible to create status`))
    )
  }

  /*GET*/
  getStatus(id: string): Observable<Status> {
    const url = `${this.statusesUrl}/${id}`;
    return this.http.get<Status>(url).pipe(
      tap(_ => console.log(`fetched status id=${id}`)),
      catchError(this.handleErrorAndContinue<Status>(`getStatus id=${id}`))
    ).map(res => { return res["data"] as Status; })
  }

  /*UPDATE*/
  updateStatus(status: Status): Observable<any> {
    return this.http.put(this.statusesUrl, status).pipe(
      tap(_ => console.log(`updated status id=${status._id}`)),
      catchError(this.handleErrorAndThrow<any>(`updated status id=${status._id}`))
    )
  }

  /*DELETE*/
  deleteStatus(id: String): Observable<any> {
    const url = `${this.statusesUrl}/${id}`;
    return this.http.delete(url).pipe(
      tap(_ => console.log(`deleted status id=${id}`)),
      catchError(this.handleErrorAndThrow<any>(`deleted Status id=${id}`))
    )
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleErrorAndContinue<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.error(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private handleErrorAndThrow<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.error(`${operation} failed: ${error.message}`);

      throw Error("Error processing " + operation);
    };
  }
}
