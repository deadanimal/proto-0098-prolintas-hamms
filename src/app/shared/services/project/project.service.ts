import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { Project } from "./project.model";

@Injectable({
  providedIn: "root",
})
export class ProjectService {
  // URL
  public urlProject: string = environment.baseUrl + "v1/project/";

  // Data
  public Project: Project;
  public ProjectFiltered: Project[] = [];

  constructor(private http: HttpClient) {}

  create(body: Form): Observable<Project> {
    console.log(this.urlProject);
    console.log(body);
    return this.http.post<any>(this.urlProject, body).pipe(
      tap((res) => {
        console.log("Projects: ", res);
      })
    );
  }

  getAll(): Observable<Project[]> {
    return this.http.get<Project[]>(this.urlProject).pipe(
      tap((res) => {
        console.log("Projects: ", res);
      })
    );
  }

  getOne(id: String): Observable<Project> {
    let urlProjectOne = this.urlProject + id + "/";
    return this.http.get<Project>(urlProjectOne).pipe(
      tap((res) => {
        console.log("Project: ", res);
      })
    );
  }

  update(id: String, body: Form): Observable<Project> {
    let urlProjectOne = this.urlProject + id + "/";
    console.log(urlProjectOne);
    console.log(body);
    return this.http.put<Project>(urlProjectOne, body).pipe(
      tap((res) => {
        console.log("Project", res);
      })
    );
  }

  filter(field: String): Observable<Project[]> {
    let urlFilter = this.urlProject + "?" + field + "/";
    return this.http.get<Project[]>(urlFilter).pipe(
      tap((res) => {
        console.log("Projects", res);
      })
    );
  }
}
