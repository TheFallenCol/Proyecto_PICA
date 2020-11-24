import { BadRequestError } from '../common/badRequest-error';
import { NotFoundError } from '../common/notFound-error';
import { AppError } from '../common/app-error';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObservableInput } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class DataService{
  constructor(private url, private http : HttpClient) { }
  
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

  private handleError(error: Response): ObservableInput<any>{
    let appError = new AppError(error);
    
    if(error.status === 404 )
      throw new NotFoundError(error);    
    
      if(error.status === 400)
        throw new BadRequestError(error);

    throw appError;
  }    
}