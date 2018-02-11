import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import Todo from './todo';
//RxJS operator for mapping the observable
import 'rxjs/add/operator/map';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};



@Injectable()
export class TodosService {

  private todosUrl:string = "http://localhost:3000/api/todos"

  constructor(private http: HttpClient) { }

  /** GET todos from the server */
  getTodos (): Observable<Todo[]> {
     return this.http.get<Todo[]>(this.todosUrl)
      .pipe(
        tap(todos => console.log(`fetched taodo` + todos)),
        catchError(this.handleErrorAndContinue('getTodos', []))
     ).map(res => { return res["data"].docs as Todo[]; })
  }

   /** GET hero by id. Will 404 if id not found */
   getTodo(id: string): Observable<Todo> {
    const url = `${this.todosUrl}/${id}`;
    return this.http.get<Todo>(url).pipe(
      tap(_ => console.log(`fetched todo id=${id}`)),
      catchError(this.handleErrorAndContinue<Todo>(`getTodo id=${id}`))
    ).map(res => { return res["data"] as Todo; })
  }
 
   /** UPDATE hero by id. Will 404 if id not found */
  updateTodo(todo:Todo): Observable<any> {
    return this.http.put(this.todosUrl,todo).pipe(
      tap(_ => console.log(`updated todo id=${todo._id}`)),
      catchError(this.handleErrorAndThrow<any>(`updateTodo id=${todo._id}`))
    )
  }

  /** DELETE hero by id. Will 404 if id not found */
  deleteTodo(id:String): Observable<any> {
    const url = `${this.todosUrl}/asdf${id}`;
    return this.http.delete(url).pipe(
      tap(_ => console.log(`deleted todo id=${id}`)),
      catchError(this.handleErrorAndThrow<any>(`deleted Todo id=${id}`))
    )
  }

  /** CREATE hero by id. Will 404 if id not found */
  createTodo(todo:Todo): Observable<any> {
    return this.http.post(this.todosUrl,todo).pipe(
      tap(res => console.log(`created todo id=${res["data"]._id}`)),
      catchError(this.handleErrorAndThrow<any>(`not possible to create todo`))
    )
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleErrorAndContinue<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.error(`${operation} failed: ${error.message}`);
      
      return of(result as T);
    }
  }

  private handleErrorAndThrow<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
  
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
  
        // TODO: better job of transforming error for user consumption
        console.error(`${operation} failed: ${error.message}`);
        
        throw Error(error.error.message);
      };
  }

}
