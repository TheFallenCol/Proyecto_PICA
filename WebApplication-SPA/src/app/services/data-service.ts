import { BadRequestError } from '../common/badRequest-error';
import { NotFoundError } from '../common/notFound-error';
import { AppError } from '../common/app-error';
import { catchError, retryWhen, delay, mergeMap, finalize } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableInput, of, throwError, timer } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class DataService{
  constructor(private url, private http : HttpClient) { }
  
  get serviceUrl(){
    return this.url;
  }

  get httpClient(){
    return this.http;
  }

  getAll(){
    return this.http.get(this.url)
    .pipe(
      catchError(this.handleError)
    );
  }

  create(resource){
    return this.http.post(this.url, JSON.stringify(resource))
    .pipe(
      catchError(this.handleError)
    );
  }

  update(resource){
    return this.http.patch(this.url + '/' + resource.id, JSON.stringify({isRead: true}))
    .pipe(
      catchError(this.handleError)
    );
  }

  delete(id : number){    
    return this.http.delete(this.url + '/' + id)
    .pipe(
      catchError(this.handleError)
    );
  }

   handleError(error: Response): ObservableInput<any>{
    let appError = new AppError(error);
    
    if(error.status === 404 )
      throw new NotFoundError(error);    
    
      if(error.status === 400)
        throw new BadRequestError(error);

    throw appError;
  }
}

export const genericRetryStrategy = ({
  maxRetryAttempts = 3,
  scalingDuration = 1000,
  excludedStatusCodes = []
}: {
  maxRetryAttempts?: number,
  scalingDuration?: number,
  excludedStatusCodes?: number[]
} = {}) => (attempts: Observable<any>) => {
  return attempts.pipe(
    mergeMap((error, i) => {
      const retryAttempt = i + 1;
      if (
        retryAttempt > maxRetryAttempts ||
        excludedStatusCodes.find(e => e === error.status)
      ) {
        return throwError(error);
      }
      console.log(
        `Intento ${retryAttempt}: Reintentando en ${retryAttempt *
          scalingDuration}ms`
      );
      return timer(retryAttempt * scalingDuration);
    }),
    finalize(() => console.log('Reintentos finalizados!'))
  );
};