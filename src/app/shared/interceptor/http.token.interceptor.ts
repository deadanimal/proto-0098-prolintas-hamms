import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { JwtService } from '../handler/jwt/jwt.service';
import { NotifyService } from '../handler/notify/notify.service';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

    constructor(
        private handlerNotification: NotifyService,
        private jwtService: JwtService
    ){ }

    private handleError(error: HttpErrorResponse) {
        let data = {}
        data = {
            reason: error && error.error.reason ? error.error.reason : '',
            status: error.status
        }
        if (error instanceof HttpErrorResponse) {
            // Server or connection error happened
            if (!navigator.onLine) {
                // Handle offline error
                this.handlerNotification.openToastrConnection()
            } else {
                // Handle Http Error (error.status === 403, 404...)
                this.handlerNotification.openToastrHttp(error.status, error.statusText)
            }
        } else {
            // Handle Client Error (Angular Error, ReferenceError...)     
        }
        console.error('It happens: ', error);
        // console.log('Error: ', error)
        return throwError(error)
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headersConfig = {
            'Content-Type': 'application/json',
            'Accept': '*/*'
        };

        const token = this.jwtService.getToken('accessToken');

        if (token) {
            headersConfig['Authorization'] = `Bearer ${token}`;
            // console.log(headersConfig)
        }

        console.log('Intercepting...')

        const request = req.clone({ setHeaders: headersConfig });
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log('Event: ', event);
                }
                return event;
            }),
            catchError(this.handleError.bind(this))
        );
    }

}
