import { DataService } from './../services/data.service';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  private readonly token = localStorage.getItem('access-token');
  constructor(private DataService: DataService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.DataService.setLoading(true);
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.token}`,
      },
    });

    return next.handle(req).pipe(
      finalize(() => {
        this.DataService.setLoading(false);
      })
    );
  }
}
