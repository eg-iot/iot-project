import { AuthService } from 'src/app/core/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ISignUpFormData } from 'src/app/shared/models/form.data';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {
  PasswordValidator,
  comparePasswords,
} from 'src/app/shared/validators/password.validator';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup<{
    firstName: FormControl<string | null>;
    lastName: FormControl<string | null>;
    email: FormControl<string | null>;
    password: FormControl<string | null>;
    confirmPassword: FormControl<string | null>;
  }>;

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  constructor(
    private AuthService: AuthService,
    private ToastrService: ToastrService,
    private Router: Router,
    private DataService: DataService
  ) {}
  ngOnInit(): void {
    this.signUpForm = new FormGroup(
      {
        firstName: new FormControl<string>('', Validators.required),
        lastName: new FormControl<string>('', Validators.required),
        email: new FormControl<string>('', Validators.required),
        password: new FormControl<string>('', [
          Validators.required,
          PasswordValidator(),
        ]),
        confirmPassword: new FormControl<string>(
          { value: '', disabled: true },
          [Validators.required]
        ),
      },
      [comparePasswords()]
    );

    this.signUpForm.controls.password.valueChanges.subscribe((value) => {
      if (!value) this.signUpForm.controls.confirmPassword.disable();
      else this.signUpForm.controls.confirmPassword.enable();
    });
  }

  signUp() {
    this.DataService.setLoading(true);
    this.signUpForm.markAllAsTouched();
    const formData: ISignUpFormData = this.signUpForm.getRawValue();
    if (this.signUpForm.invalid) return;
    this.AuthService.signUp(formData).subscribe({
      next: (r: any) => {
        this.ToastrService.success(r.data.signUp as string);
        this.Router.navigate(['/login']);
      },
      error: (err: any) => {
        this.DataService.setLoading(false);
        if (err instanceof HttpErrorResponse)
          this.ToastrService.error(err.error);
        else this.ToastrService.error(err);
      },
      complete: () => {
        this.DataService.setLoading(false);
      },
    });
  }
}
