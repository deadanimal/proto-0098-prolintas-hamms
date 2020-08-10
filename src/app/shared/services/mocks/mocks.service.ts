import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MocksService {

  // URL
  public urlMock: string = 'assets/mock/';

  // Data
  public datas: any = []

  constructor(
    private http: HttpClient
  ) { }

  getAll(path: string): Observable<any> {
    let urlPath = this.urlMock + path
    return this.http.get<any>(urlPath).pipe(
      tap((res) => {
        this.datas = res
        console.log('Data: ', this.datas)
      })
    )
  }

}
