import { environment } from './../../environments/environment';
import { BadRequestError } from './../common/badRequest-error';
import { NotFoundError } from './../common/notFound-error';
import { AppError } from './../common/app-error';
import { Role } from './role.enum';
import { Injectable } from '@angular/core';
import { Observable, ObservableInput } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

const defaulthAuthStatus : IAuthStatus = {
  role: Role.Anonymous,
  primarySid : null,
  name: null
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly authProvider : (nickname:string, password:string) => Observable<IServerAuthResponse>;

  constructor(private httpClient : HttpClient) { 
    this.authProvider = this.userAuthProvider;
  }

  private userAuthProvider(nickname : string, password: string) : Observable<IServerAuthResponse>{
    return this.httpClient.post<IServerAuthResponse>(
        `${environment.urlServiceAuth}/token`, 
        JSON.stringify({nickname : nickname, password : password})
      )
      .pipe(
        catchError(this.handleError)
      );
  }

  login(nickname : string, password: string) : Observable<IAuthStatus>{
    this.logout();
    return null;
  }

  logout(){
    
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

export interface IAuthStatus {
  name: string,
  role : Role,
  primarySid : number;  
}

interface IServerAuthResponse {
  access_Token: string;
}

