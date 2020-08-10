import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { Fail } from "./fail.model";

@Injectable({
  providedIn: "root",
})
export class FailService {
  // URL
  public urlFail: string = environment.baseUrl + "v1/fail/";

  // Data
  public Fail: Fail;
  public FailFiltered: Fail[] = [];

  constructor(private http: HttpClient) {}

  create(body): Observable<Fail> {
    console.log(this.urlFail);
    console.log(body);
    return this.http.post<any>(this.urlFail, body).pipe(
      tap((res) => {
        console.log("Fail: ", res);
      })
    );
  }

  getAll(): Observable<Fail[]> {
    return this.http.get<Fail[]>(this.urlFail).pipe(
      tap((res) => {
        console.log("Fail: ", res);
      })
    );
  }

  getOne(id: String): Observable<Fail> {
    let urlFailOne = this.urlFail + id + "/";
    return this.http.get<Fail>(urlFailOne).pipe(
      tap((res) => {
        console.log("Fail: ", res);
      })
    );
  }

  update(id: String, body: Form): Observable<Fail> {
    let urlFailOne = this.urlFail + id + "/";
    console.log(urlFailOne);
    console.log(body);
    return this.http.put<Fail>(urlFailOne, body).pipe(
      tap((res) => {
        console.log("Fail", res);
      })
    );
  }

  filter(field: String): Observable<Fail[]> {
    let urlFilter = this.urlFail + "?" + field + "/";
    return this.http.get<Fail[]>(urlFilter).pipe(
      tap((res) => {
        console.log("Fail", res);
      })
    );
  }
}
