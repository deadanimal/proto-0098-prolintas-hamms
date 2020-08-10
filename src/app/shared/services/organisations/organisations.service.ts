import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { Organisation } from "./organisations.model";

@Injectable({
  providedIn: "root",
})
export class OrganisationsService {
  // URL
  public urlOrganisation: string = environment.baseUrl + "v1/organisations/";

  // Data
  public Organisation: Organisation;
  public Organisations: Organisation[] = [];
  public OrganisationsFiltered: Organisation[] = [];

  constructor(private http: HttpClient) {}

  create(body: Form): Observable<Organisation> {
    console.log(this.urlOrganisation);
    console.log(body);
    return this.http.post<any>(this.urlOrganisation, body).pipe(
      tap((res) => {
        console.log("Organisations: ", res);
      })
    );
  }

  getAll(): Observable<Organisation[]> {
    return this.http.get<Organisation[]>(this.urlOrganisation).pipe(
      tap((res) => {
        console.log("Organisations: ", res);
      })
    );
  }

  getOne(id: String): Observable<Organisation> {
    let urlOrganisationOne = this.urlOrganisation + id + "/";
    return this.http.get<Organisation>(urlOrganisationOne).pipe(
      tap((res) => {
        console.log("Organisation: ", res);
      })
    );
  }

  update(id: String, body: Form): Observable<Organisation> {
    let urlOrganisationOne = this.urlOrganisation + id + "/";
    console.log(urlOrganisationOne);
    console.log(body);
    return this.http.put<Organisation>(urlOrganisationOne, body).pipe(
      tap((res) => {
        console.log("Organisation", res);
      })
    );
  }

  filter(field: String): Observable<Organisation[]> {
    let urlFilter = this.urlOrganisation + "?" + field + "/";
    return this.http.get<Organisation[]>(urlFilter).pipe(
      tap((res) => {
        console.log("Organisations", res);
      })
    );
  }
}
