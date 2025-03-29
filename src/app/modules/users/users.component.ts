import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsViewComponent } from '../../shared/components/details-view/details-view.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpService } from '../../services/http.service';
import { IResponse, IUser } from '../../interfaces';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DetailsModalComponent } from '../../shared/components/details-modal/details-modal.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { UserFormDialogComponent } from './create/form-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    DetailsViewComponent,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: IUser[] = [];
  displayedColumns: string[] = ['name', 'email', 'actions'];
  selectedUser: IUser | null = null;
  isLoading = false;

  constructor(
    private readonly httpService: HttpService,
    private readonly dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.httpService.getUsers().subscribe({
      next: (users: IResponse) => {
        this.users = users.data as IUser[];
        this.isLoading = false;
      },
      error: (error: Error) => {
        console.error('Error loading users:', error);
        this.isLoading = false;
      }
    });
  }

  viewUserDetails(user: IUser): void {
    const correctedUser = { id: user.id, name: user.name, email: user.email } as IUser;
    if (user.createdAt !== undefined) {
      correctedUser.createdAt = user.createdAt;
    }
    this.dialog.open(DetailsModalComponent, {
      width: '600px',
      data: {
        title: 'User Details',
        content: correctedUser,
        icon: 'person'
      }
    });
  }

  closeDetails(): void {
    this.selectedUser = null;
  }

  createUser(): void {
    const dialogRef = this.dialog.open(UserFormDialogComponent, {
      width: '400px',
      data: { title: 'Create New User', isEdit: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isLoading = true;
        this.httpService.createUser(result).subscribe({
          next: () => {
            this.loadUsers();
            this.showSuccessMessage('User created successfully');
          },
          error: (error) => {
            console.error('Error creating user:', error);
            this.isLoading = false;
            this.showErrorMessage('Failed to create user');
          }
        });
      }
    });
  }

  editUser(user: IUser): void {
    const dialogRef = this.dialog.open(UserFormDialogComponent, {
      width: '400px',
      data: { title: 'Edit User', user, isEdit: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isLoading = true;
        this.httpService.updateUser(result).subscribe({
          next: () => {
            this.loadUsers();
            this.showSuccessMessage('User updated successfully');
          },
          error: (error) => {
            console.error('Error updating user:', error);
            this.isLoading = false;
            this.showErrorMessage('Failed to update user');
          }
        });
      }
    });
  }

  deleteUser(user: IUser): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: 'Confirm Delete',
        message: `Are you sure you want to delete ${user.name}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isLoading = true;
        this.httpService.deleteUser(user.id).subscribe({
          next: () => {
            this.loadUsers();
            if (this.selectedUser?.id === user.id) {
              this.selectedUser = null;
            }
            this.showSuccessMessage('User deleted successfully');
          },
          error: (error) => {
            console.error('Error deleting user:', error);
            this.isLoading = false;
            this.showErrorMessage('Failed to delete user');
          }
        });
      }
    });
  }

  private showSuccessMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      panelClass: ['success-snackbar']
    });
  }

  private showErrorMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'end',
      panelClass: ['error-snackbar']
    });
  }
} 
