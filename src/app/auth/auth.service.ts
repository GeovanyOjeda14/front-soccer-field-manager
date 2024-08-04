import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { map } from 'rxjs/internal/operators/map';
import { ApiResponse } from '../interfaces/api-interface';
import { SweetAlertService } from '../services/sweet-alert.service';
import { LoginData, RegisterData } from './aut-interfaces';

const apiUrl = "http://localhost:5000/api";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiServive: ApiService, private sweetAlert: SweetAlertService) { }

  login(login: LoginData) {

    const url = apiUrl + '/login';
    return this.apiServive.postRequest(url, login).pipe(
      map((apiResponse: ApiResponse) => {

        const { ok, message } = apiResponse;

        const icon = ok ? 'success' : 'warning';
        this.sweetAlert.launchSwal('', message, icon);
      })
    );
  }

  createUser(user: RegisterData) {
    const url = `${apiUrl}/register`;
    return this.apiServive.postRequest(url, user).pipe(
      map((apiResponse: ApiResponse) => {
        const { message, ok } = apiResponse;
        if(ok) this.sweetAlert.launchSwal('', message, 'success');
      })
    );
  }
}
