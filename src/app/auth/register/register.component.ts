import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SweetAlertService } from '../../services/sweet-alert.service';
import { AuthService } from '../auth.service';
import { RegisterData } from '../aut-interfaces';
import { FormPasswordComponent } from '../../components/custom-forms/form-password/form-password.component';
import { FormInputComponent } from '../../components/custom-forms/form-input/form-input.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormInputComponent, FormPasswordComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(private sweetAlert: SweetAlertService, private authService: AuthService){}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.pattern('^.{8,}$') ]),
      confirmPassword: new FormControl('', [Validators.required])
    });
  }

  passwordValidate(): boolean {
    const { password, confirmPassword } = this.registerForm.value;

    if(password === confirmPassword) return true;
    return false;
  }

  registerUser() {

    // Validar contraseñas
    if(!this.passwordValidate()) return this.sweetAlert.launchSwal("", "Las contraseñas no coinciden.", "warning");


    console.log(this.registerForm);
    // Validación formulario
    if(this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();

      console.log(this.registerForm);
      return this.sweetAlert.launchSwal("", "Por favor revisa el formulario antes de continuar", "warning");
    }

    const { username, email, password } = this.registerForm.value;

    const user: RegisterData = {
      email,
      username,
      password,
      accountType: 'admin',
      google: false
    };

    console.log("user", user);
    this.authService.createUser(user).subscribe();
  }


}
