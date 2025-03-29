import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ILoginResponse, ILoginCredentials, IUser, ITask, IResponse } from '../interfaces';
import { environment } from '../../environments/environment';

export const httpInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const token = localStorage.getItem('token');
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        localStorage.removeItem('token');
        if (!error.url?.includes('/login')) {
          window.location.href = '/login';
        }
      }
      return throwError(() => error);
    })
  );
};

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseUrl = environment.apiUrl;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  get authHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
  }

  get noAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
  }

  login(credentials: ILoginCredentials): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(
      `${this.baseUrl}/login`,
      credentials,
      { responseType: 'json', headers: this.noAuthHeaders }
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getUsers(): Observable<IResponse> {
    return this.http.get<IResponse>(`${this.baseUrl}/users`, { responseType: 'json', headers: this.authHeaders });
  }

  createUser(user: IUser): Observable<IResponse> {
    return this.http.post<IResponse>(`${this.baseUrl}/users`, user, { responseType: 'json', headers: this.authHeaders });
  }

  updateUser(user: IUser): Observable<IResponse> {
    return this.http.put<IResponse>(`${this.baseUrl}/users/${user.id}`, user, { responseType: 'json', headers: this.authHeaders });
  }

  deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/users/${userId}`, { responseType: 'json', headers: this.authHeaders });
  }

  getTasks(status?: string | null): Observable<IResponse> {
    let url = `${this.baseUrl}/tasks`;
    if (status) {
      url += `/status/${status}`;
    }
    return this.http.get<IResponse>(url, { responseType: 'json', headers: this.authHeaders });
  }

  createTask(task: ITask): Observable<IResponse> {
    return this.http.post<IResponse>(`${this.baseUrl}/tasks`, task, { responseType: 'json', headers: this.authHeaders });
  }

  updateTask(taskId: string, task: ITask): Observable<IResponse> {
    return this.http.put<IResponse>(`${this.baseUrl}/tasks/${taskId}`, task, { responseType: 'json', headers: this.authHeaders });
  }

  deleteTask(taskId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/tasks/${taskId}`, { responseType: 'json', headers: this.authHeaders });
  }
} 
