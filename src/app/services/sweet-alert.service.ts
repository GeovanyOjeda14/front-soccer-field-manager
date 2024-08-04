import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  launchSwal(title: string, text: string, icon: any) {
    Swal.fire(title, text, icon);
  }
}
