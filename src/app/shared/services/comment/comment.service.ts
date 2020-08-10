import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { Comment } from "./comment.model";

@Injectable({
  providedIn: "root",
})
export class CommentService {
  // URL
  public urlComment: string = environment.baseUrl + "v1/comment/";

  // Data
  public Comment: Comment;
  public Comments: Comment[] = [];
  public CommentsFiltered: Comment[] = [];

  constructor(private http: HttpClient) {}

  create(body: Form): Observable<Comment> {
    console.log(this.urlComment);
    console.log(body);
    return this.http.post<any>(this.urlComment, body).pipe(
      tap((res) => {
        console.log("Comments: ", res);
      })
    );
  }

  getAll(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.urlComment).pipe(
      tap((res) => {
        console.log("Comments: ", res);
      })
    );
  }

  getOne(id: String): Observable<Comment> {
    let urlCommentOne = this.urlComment + id + "/";
    return this.http.get<Comment>(urlCommentOne).pipe(
      tap((res) => {
        console.log("Comment: ", res);
      })
    );
  }

  update(id: String, body: Form): Observable<Comment> {
    let urlCommentOne = this.urlComment + id + "/";
    console.log(urlCommentOne);
    console.log(body);
    return this.http.put<Comment>(urlCommentOne, body).pipe(
      tap((res) => {
        console.log("Comment", res);
      })
    );
  }

  filter(field: String): Observable<Comment[]> {
    let urlFilter = this.urlComment + "?" + field + "/";
    return this.http.get<Comment[]>(urlFilter).pipe(
      tap((res) => {
        console.log("Comments", res);
      })
    );
  }
}
