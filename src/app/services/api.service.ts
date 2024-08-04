import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { SweetAlertService } from './sweet-alert.service';

const headers = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient, private sweetAlert: SweetAlertService) { }

  public getRequest(endPoint: string): Observable<any> {
    return this.httpClient.get(endPoint, { headers }).pipe(
      catchError((err: any) => this.handleError(err))
    );
  }

  public postRequest(partialEndPoint: string, body: any): Observable<any> {
    return this.httpClient.post(partialEndPoint, body, { headers }).pipe(
      catchError((err: any) => this.handleError(err))
    );
  }

  public putRequest(partialEndPoint: string, body: any): Observable<any> {
    return this.httpClient.put(partialEndPoint, body, { headers }).pipe(
      catchError((err: any) => this.handleError(err))
    );
  }

  public deketeRequest(partialEndPoint: string): Observable<any> {
    return this.httpClient.delete(partialEndPoint, { headers }).pipe(
      catchError((err: any) => this.handleError(err))
    );
  }

  private handleError(err: any): Observable<never> {

    let errorMessage = 'Ocurrió un error.';

    if (err.status === 401) {
      errorMessage = 'La sesión ha expirado, por favor vuelve a iniciar sesión.';
      // this.store.dispatch(logout()); // Cerrar sesión
    } else if (err.status === 0) {
      errorMessage = 'Error en la conexión, por favor revisa tu conexión o inténtalo más tarde.';
    } else if (err.error && err.error.message) {
      errorMessage = err.error.message;
    }

    this.sweetAlert.launchSwal('Error', errorMessage, 'error');
    return throwError(() => err);
  }

}
