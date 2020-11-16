import { environment } from './../../environments/environment';
import { BadRequestError } from './../common/badRequest-error';
import { NotFoundError } from './../common/notFound-error';
import { AppError } from './../common/app-error';
import { Role } from './role.enum';
import { Injectable } from '@angular/core';
import { Observable, ObservableInput } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import jwt_decoded from 'jwt-decode';

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

  private userAuthProvider(nicknameValue : string, passwordValue: string) : Observable<IServerAuthResponse>{
    return this.httpClient.post<IServerAuthResponse>(
        `${environment.urlServiceAuth}/token`, 
        {nickname : nicknameValue, password : passwordValue}
      )
      .pipe(
        catchError(this.handleError)
      );
  }

  login(nickname : string, password: string) : Observable<IAuthStatus>{
    this.logout();
    const loginResponse = this.authProvider(nickname, password).pipe(
      map(value => {
        const result = jwt_decoded(value.access_Token);
        return result as IAuthStatus;
      })
    );
    return loginResponse;
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

