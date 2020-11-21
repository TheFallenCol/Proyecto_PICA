import { environment } from './../../environments/environment';
import { BadRequestError } from './../common/badRequest-error';
import { NotFoundError } from './../common/notFound-error';
import { AppError } from './../common/app-error';
import { Role } from './role.enum';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ObservableInput, throwError} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import jwt_decoded from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly authProvider : (nickname:string, password:string) => Observable<IServerAuthResponse>;
  authStatus = new BehaviorSubject<IAuthStatus>(defaulthAuthStatus);
  authStatusObserver: Observable<IAuthStatus>;

  constructor(private httpClient : HttpClient) {
    this.authProvider = this.userAuthProvider;
    this.authStatusObserver = this.authStatus.asObservable();
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
 
    loginResponse.subscribe(
      res => {
        this.authStatus.next(res);
      },
      err => {
        this.logout();
        return throwError(err);
      });

    return loginResponse;
  }

  logout(){
    this.authStatus.next(defaulthAuthStatus);
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
  unique_name: string,
  role : Role,
  primarysid : number,
  SrcImg : string;
}

interface IServerAuthResponse {
  access_Token: string;
}

const defaulthAuthStatus : IAuthStatus = {
  role: Role.Anonymous,
  primarysid : null,
  unique_name: 'Anonymous',
  SrcImg: "../../../assets/images/TouresBalon/default-profile.png"
}