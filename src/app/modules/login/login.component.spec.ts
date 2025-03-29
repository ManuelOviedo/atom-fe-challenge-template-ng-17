import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpService: jasmine.SpyObj<HttpService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const httpServiceSpy = jasmine.createSpyObj('HttpService', ['login']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        BrowserAnimationsModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: HttpService, useValue: httpServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    httpService = TestBed.inject(HttpService) as jasmine.SpyObj<HttpService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty form', () => {
    expect(component.loginForm.get('email')?.value).toBe('');
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should validate email format', () => {
    const emailControl = component.loginForm.get('email');
    emailControl?.setValue('invalid-email');
    expect(emailControl?.errors?.['email']).toBeTruthy();

    emailControl?.setValue('valid@email.com');
    expect(emailControl?.errors).toBeNull();
  });

  it('should handle successful login', () => {
    const mockResponse = {
      token: 'test-token',
      user: {
        id: 1,
        email: 'test@example.com'
      }
    };

    httpService.login.and.returnValue(of(mockResponse));
    
    component.loginForm.setValue({ email: 'test@example.com' });
    component.onSubmit();

    expect(httpService.login).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(localStorage.getItem('token')).toBe('test-token');
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should handle login error', () => {
    const errorResponse = new HttpErrorResponse({
      error: { message: 'Invalid credentials' },
      status: 401,
      statusText: 'Unauthorized'
    });

    httpService.login.and.returnValue(throwError(() => errorResponse));
    
    component.loginForm.setValue({ email: 'test@example.com' });
    component.onSubmit();

    expect(httpService.login).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(component.error).toBe('Invalid credentials');
  });

  it('should handle login error with no message', () => {
    const errorResponse = new HttpErrorResponse({
      error: {},
      status: 500,
      statusText: 'Internal Server Error'
    });

    httpService.login.and.returnValue(throwError(() => errorResponse));
    
    component.loginForm.setValue({ email: 'test@example.com' });
    component.onSubmit();

    expect(component.error).toBe('An error occurred during login');
  });

  it('should not call login service if form is invalid', () => {
    component.loginForm.setValue({ email: 'invalid-email' });
    component.onSubmit();

    expect(httpService.login).not.toHaveBeenCalled();
  });
}); 
