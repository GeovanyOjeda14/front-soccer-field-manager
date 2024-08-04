import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SweetAlertService } from '../../services/sweet-alert.service';
import { FormPasswordComponent } from '../../components/custom-forms/form-password/form-password.component';
import { FormInputComponent } from '../../components/custom-forms/form-input/form-input.component';
import { AuthService } from '../auth.service';
import { LoginData } from '../aut-interfaces';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormInputComponent, FormPasswordComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private sweetAlert: SweetAlertService, private authService: AuthService){}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.pattern('^[a-zA-Z0-9]+$')]),
      password: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.pattern('^.{8,}$')])
    });
  }

  login() {

    if(this.loginForm.invalid) {
      return this.sweetAlert.launchSwal('', 'Por favor revisa el formulario antes de continuar.', 'warning');
    }

    const { username, password } = this.loginForm.value;

    // const hash = this.authService.hasPassword(password);
    const userData: LoginData = {
      username,
      password
    };

    console.log(userData);
    // this.authService.login(userData).subscribe();
  }

}
