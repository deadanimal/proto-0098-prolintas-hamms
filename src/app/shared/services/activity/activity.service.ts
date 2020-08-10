import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { Activity } from "./activity.model";

@Injectable({
  providedIn: "root",
})
export class ActivityService {
  // URL
  public urlActivity: string = environment.baseUrl + "v1/activity/";

  // Data
  public Activity: Activity;
  public ActivityFiltered: Activity[] = [];

  constructor(private http: HttpClient) {}

  create(body: Form): Observable<Activity> {
    console.log(this.urlActivity);
    console.log(body);
    return this.http.post<any>(this.urlActivity, body).pipe(
      tap((res) => {
        console.log("Activity: ", res);
      })
    );
  }

  getAll(): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.urlActivity).pipe(
      tap((res) => {
        console.log("Activity: ", res);
      })
    );
  }

  getOne(id: String): Observable<Activity> {
    let urlActivityOne = this.urlActivity + id + "/";
    return this.http.get<Activity>(urlActivityOne).pipe(
      tap((res) => {
        console.log("Activity: ", res);
      })
    );
  }

  update(id: String, body: Form): Observable<Activity> {
    let urlActivityOne = this.urlActivity + id + "/";
    console.log(urlActivityOne);
    console.log(body);
    return this.http.put<Activity>(urlActivityOne, body).pipe(
      tap((res) => {
        console.log("Activity", res);
      })
    );
  }

  filter(field: String): Observable<Activity[]> {
    let urlFilter = this.urlActivity + "?" + field + "/";
    return this.http.get<Activity[]>(urlFilter).pipe(
      tap((res) => {
        console.log("Activity", res);
      })
    );
  }
}
