import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { TokenResponse } from "./auth.model";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { JwtService } from "../../handler/jwt/jwt.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  // URL
  public urlRegister: string = environment.baseUrl + "auth/registration/";
  public urlPasswordChange: string =
    environment.baseUrl + "auth/password/change/";
  public urlPasswordReset: string = environment.baseUrl + "auth/password/reset";
  public urlTokenObtain: string = environment.baseUrl + "auth/obtain/";
  public urlTokenRefresh: string = environment.baseUrl + "auth/refresh/";
  public urlTokenVerify: string = environment.baseUrl + "auth/verify/";
  public urlUser: string = environment.baseUrl + "v1/users/";

  // Data
  public token: TokenResponse;
  public tokenAccess: string;
  public tokenRefresh: string;
  public email: string;
  public userID: string;
  public username: string;
  public userType: string;
  public userRole: number = 1;

  // Temp
  userDetail: any;
  retrievedUsers: any = [];

  constructor(private jwtService: JwtService, private http: HttpClient) {}

  register(body: Form): Observable<any> {
    return this.http.post<any>(this.urlRegister, body).pipe(
      tap((res) => {
        console.log("Registration: ", res);
      })
    );
  }

  changePassword(body: Form): Observable<any> {
    return this.http.post<any>(this.urlPasswordChange, body).pipe(
      tap((res) => {
        console.log("Change password: ", res);
      })
    );
  }

  resetPassword(body: Form): Observable<any> {
    return this.http.post<any>(this.urlPasswordReset, body).pipe(
      tap((res) => {
        console.log("Reset password: ", res);
      })
    );
  }

  obtainToken(body: Form): Observable<any> {
    let jwtHelper: JwtHelperService = new JwtHelperService();
    console.log("bosy =>", body);
    return this.http.post<any>(this.urlTokenObtain, body).pipe(
      tap((res) => {
        this.token = res;
        this.tokenRefresh = res.refresh;
        this.tokenAccess = res.access;

        let decodedToken = jwtHelper.decodeToken(this.tokenAccess);
        this.email = decodedToken.email;
        this.username = decodedToken.username;
        this.userID = decodedToken.user_id;
        // this.userType = decodedToken.user_type;
        // console.log(this.userType);
        console.log("Decoded token: ", decodedToken);
        // console.log('Post response: ', res)
        // console.log('Refresh token', this.tokenRefresh)
        // console.log('Access token', this.tokenAccess)
        // console.log('Token: ', this.token)
        // console.log('Email: ', this.email)
        // console.log('Username: ', this.username)
        // console.log('User ID: ', this.userID)
        // console.log('User type: ', this.userType)
        this.jwtService.saveToken("accessToken", this.tokenAccess);
        this.jwtService.saveToken("refreshToken", this.tokenRefresh);
      })
    );
  }

  refreshToken(): Observable<any> {
    let refreshToken = this.jwtService.getToken("refreshToken");
    let body = {
      refresh: refreshToken,
    };
    return this.http.post<any>(this.urlTokenRefresh, body).pipe(
      tap((res) => {
        console.log("Token refresh: ", res);
      })
    );
  }

  verifyToken(body: Form): Observable<any> {
    return this.http.post<any>(this.urlTokenVerify, body).pipe(
      tap((res) => {
        console.log("Token verify: ", res);
      })
    );
  }

  getUserDetail(): Observable<any> {
    console.log("getuserdetail");
    let selfInformationUrl = this.urlUser + this.userID + "/";
    return this.http.get<any>(selfInformationUrl).pipe(
      tap((res) => {
        this.userDetail = res;
        // console.log('User detail', this.userDetail)
      })
    );
  }
}
