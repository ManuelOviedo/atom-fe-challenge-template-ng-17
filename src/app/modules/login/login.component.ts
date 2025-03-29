import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ILoginResponse } from '../../interfaces';
import { ILoginForm } from '../../interfaces';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatCheckboxModule,
    NgOptimizedImage
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup<{
    email: FormControl<string | null>;
  }>;
  error: string = '';
  timestamp = new Date().getTime();

  constructor(
    private readonly fb: FormBuilder,
    private readonly httpService: HttpService,
    private readonly router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.httpService.login(this.loginForm.value as ILoginForm).subscribe({
        next: (response: ILoginResponse) => {
          console.log(response);
          localStorage.setItem('token', response.token);
          this.router.navigate(['/dashboard']);
        },
        error: (error: HttpErrorResponse) => {
          this.error = error.error?.message || 'An error occurred during login';
        }
      });
    }
  }
} 
