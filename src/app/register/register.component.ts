import { Component } from '@angular/core';
import {
  AbstractControl,
  AbstractControlOptions,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { User } from '../models/models';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  hide = true;
  responseMsg: string = '';
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.registerForm = fb.group(
      {
        firstName: fb.control('', [Validators.required]),
        lastName: fb.control('', [Validators.required]),
        email: fb.control('', [Validators.required, Validators.email]),
        password: fb.control('', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(15),
        ]),
        rpassword: fb.control(''),
        mobile: fb.control('',[Validators.required]),
      },
      {
        validators: [repeatPasswordValidator],
      } as AbstractControlOptions
    );
    
  }

  register() {
    let user: User = {
      id: 0,
      firstName: this.registerForm.get('firstName')?.value,
      lastName: this.registerForm.get('lastName')?.value,
      email: this.registerForm.get('email')?.value,
      userType: "USER",
      mobile: this.registerForm.get('mobile')?.value,
      password: this.registerForm.get('password')?.value,
      blocked: false,
      active: true,
      createdOn: '',
      fine: 0,
    };
    this.api.createAccount(user).subscribe({
      next: (res: any) => {
        console.log(res);
        this.responseMsg = res.toString();
      },
      error: (err: any) => {
        console.log('Error: ');
        console.log(err);
      },
    });
    this.registerForm.reset();
  }

  getFirstNameErrors() {
    if (this.FirstName.hasError('required')) return 'Field is requied!';
    return '';
  }
  getLastNameErrors() {
    if (this.LastName.hasError('required')) return 'Field is requied!';
    return '';
  }
  getEmailErrors() {
    if (this.Email.hasError('required')) return 'Email is required!';
    if (this.Email.hasError('email')) return 'Email is invalid.';
    return '';
  }
  getPasswordErrors() {
    if (this.Password.hasError('required')) return 'Password is required!';
    if (this.Password.hasError('minlength'))
      return 'Minimum 8 characters are required!';
    if (this.Password.hasError('maxlength'))
      return 'Maximum 15 characters are required!';
    return '';
  }
  getMobileErrors() {
    if (this.Mobile.hasError('required')) return 'Mobile is required!';
    if (this.Mobile.hasError('minlength'))
      return 'Minimum 10 numbers are required!';
    if (this.Mobile.hasError('maxlength'))
      return 'Maximum 10 characters are required!';
    return '';
  }

  get FirstName(): FormControl {
    return this.registerForm.get('firstName') as FormControl;
  }
  get LastName(): FormControl {
    return this.registerForm.get('lastName') as FormControl;
  }
  get Email(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }
  get Password(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }
  get RPassword(): FormControl {
    return this.registerForm.get('rpassword') as FormControl;
  }
  get Mobile():FormControl{
    return this.registerForm.get('mobile') as FormControl;

  }
}

export const repeatPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const pwd = control.get('password')?.value;
  const rpwd = control.get('rpassword')?.value;
  if (pwd === rpwd) {
    control.get('rpassword')?.setErrors(null);
    return null;
  } else {
    control.get('rpassword')?.setErrors({ rpassword: true });
    return { rpassword: true };
  }
};
