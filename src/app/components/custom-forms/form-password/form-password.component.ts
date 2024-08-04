import { Component, Input, Optional } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormControl, FormGroupDirective, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';
import { NgClass } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ValidationsDictionary } from '../custom-forms-models';

@Component({
  selector: 'app-form-password',
  standalone: true,
  imports: [NgClass, FontAwesomeModule],
  templateUrl: './form-password.component.html',
  styleUrl: './form-password.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FormPasswordComponent,
      multi: true
    }
  ]
})
export class FormPasswordComponent implements ControlValueAccessor {

  @Input() id: string = '';
  @Input() type: 'text' | 'email' | 'number' = 'text';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() formControlName: string = ''; // Añade un input para obtener el nombre del control
  @Input() validationsDictionary!: ValidationsDictionary;
  @Input() showButton: boolean = true;

  public faEye = faEye;
  public faEyeSlash = faEyeSlash;

  private _value: string = '';
  private _isDisabled: boolean = false;
  private _passwordVisible: boolean = false;

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  constructor(
    @Optional() private controlContainer: ControlContainer
  ) {}

  // Referencia al control asociado
  get control(): FormControl | null {
    const parentFormGroup = this.controlContainer as FormGroupDirective;
    return parentFormGroup ? parentFormGroup.control.get(this.formControlName) as FormControl : null;
  }

  get controlErrors(): ValidationErrors | null {
    return this.control?.errors || null;
  }

  get value(): string {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
  }

  get disabled(): boolean {
    return this._isDisabled;
  }

  get passwordVisible(): boolean {
    return this._passwordVisible;
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._isDisabled = isDisabled;
  }

  handleInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.value = inputElement.value;
    this.onChange(this.value);
    this.onTouched();
  }

  isInvalid(): boolean {
    return this.control?.invalid && this.control?.touched || false;
  }

  // Métodos para alternar visibilidad
  togglePasswordVisibility(): void {
    this._passwordVisible = !this._passwordVisible;
  }
}
