import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { Ticket } from "./tickets.model";

@Injectable({
  providedIn: "root",
})
export class TicketsService {
  // URL
  public urlTicket: string = environment.baseUrl + "v1/tickets/";

  // Data
  public Ticket: Ticket;
  public Tickets: Ticket[] = [];
  public TicketsFiltered: Ticket[] = [];

  constructor(private http: HttpClient) {}

  create(body: Form): Observable<Ticket> {
    console.log(this.urlTicket);
    console.log(body);
    return this.http.post<any>(this.urlTicket, body).pipe(
      tap((res) => {
        console.log("Tickets: ", res);
      })
    );
  }

  getAll(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.urlTicket).pipe(
      tap((res) => {
        console.log("Tickets: ", res);
      })
    );
  }

  getOne(id: String): Observable<Ticket> {
    let urlTicketOne = this.urlTicket + id + "/";
    return this.http.get<Ticket>(urlTicketOne).pipe(
      tap((res) => {
        console.log("Ticket: ", res);
      })
    );
  }

  update(id: String, body: Form): Observable<Ticket> {
    let urlTicketOne = this.urlTicket + id + "/";
    console.log(urlTicketOne);
    console.log(body);
    return this.http.put<Ticket>(urlTicketOne, body).pipe(
      tap((res) => {
        console.log("Ticket", res);
      })
    );
  }

  filter(field: String): Observable<Ticket[]> {
    let urlFilter = this.urlTicket + "?" + field + "/";
    return this.http.get<Ticket[]>(urlFilter).pipe(
      tap((res) => {
        console.log("Tickets", res);
      })
    );
  }
}
