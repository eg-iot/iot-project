import { DataService } from './../../core/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { TLoginFormData } from 'src/app/shared/models/form.data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup<{
    email: FormControl<string | null>;
    password: FormControl<string | null>;
  }>;

  showPassword: boolean = false;
  constructor(
    private AuthService: AuthService,
    private ToastrService: ToastrService,
    private Router: Router,
    private DataService: DataService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl<string>('', Validators.required),
      password: new FormControl<string>('', Validators.required),
    });
  }

  login() {
    this.DataService.setLoading(true);
    this.loginForm.markAllAsTouched();
    const formData: TLoginFormData = this.loginForm.getRawValue();
    if (this.loginForm.invalid) return;
    this.AuthService.login(formData).subscribe({
      next: (r: any) => {
        localStorage.setItem('access-token', r.data.login);
        this.Router.navigate(['/']);
        this.AuthService.isAuthenticated();
      },
      error: (err: any) => {
        this.DataService.setLoading(false);
        this.ToastrService.error(err);
      },
      complete: () => {
        this.DataService.setLoading(false);
      },
    });
  }
}
