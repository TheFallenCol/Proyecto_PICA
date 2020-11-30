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
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends CacheService{

  private readonly authProvider : (nickname:string, password:string) => Observable<IServerAuthResponse>;
  authStatus = new BehaviorSubject<IAuthStatus>(this.getItem('authStatus') || defaulthAuthStatus);
  
  constructor(private httpClient : HttpClient) {
    super();
    this.authStatus.subscribe(authStatus => {
      this.setItem('authStatus', authStatus);
    });
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
        this.setToken(value.access_Token);
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
    this.clearToken();
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

  private setToken(jwt:string){
    this.setItem('jwt', jwt);
  }

  getToken():string{
    return this.getItem('jwt') || '';
  }

  private clearToken(){
    this.removeItem('jwt');
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
  unique_name: '',
  SrcImg: "../../../assets/images/TouresBalon/default-profile.png"
}