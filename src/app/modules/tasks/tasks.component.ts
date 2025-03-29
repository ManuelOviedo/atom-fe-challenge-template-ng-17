import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { HttpService } from '../../services/http.service';
import { DetailsModalComponent } from '../../shared/components/details-modal/details-modal.component';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { TaskFormDialogComponent } from './create/form-dialog.component';
import { IResponse } from '../../interfaces';
import { ITask } from '../../interfaces';
import { ThemePalette } from '@angular/material/core';
import { StatusFilterComponent } from './status-filter/status-filter.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
    MatCardModule,
    MatChipsModule,
    StatusFilterComponent
  ],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  tasks: any[] = [];
  isLoading = false;

  constructor(
    private readonly httpService: HttpService,
    private readonly dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  viewTaskDetails(task: any): void {
    this.dialog.open(DetailsModalComponent, {
      width: '600px',
      data: {
        title: 'Task Details',
        content: task,
        icon: 'task'
      }
    });
  }

  loadTasks(status?: string | null): void {
    this.isLoading = true;
    this.httpService.getTasks(status).subscribe({
      next: (tasks: IResponse) => {
        this.tasks = tasks.data as ITask[];
        this.isLoading = false;
      },
      error: (error: Error) => {
        console.error('Error loading tasks:', error);
        this.isLoading = false;
      }
    });
  }

  createTask(): void {
    const dialogRef = this.dialog.open(TaskFormDialogComponent, {
      width: '400px',
      data: { title: 'Create New Task' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.httpService.createTask(result).subscribe({
          next: () => {
            this.showSuccessMessage('Task created successfully');
            this.loadTasks();
          },
          error: (error) => {
            this.showErrorMessage('Error creating task');
            console.error(error);
          }
        });
      }
    });
  }

  editTask(task: any): void {
    const dialogRef = this.dialog.open(TaskFormDialogComponent, {
      width: '400px',
      data: { title: 'Edit Task', task }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.httpService.updateTask(task.id, result).subscribe({
          next: () => {
            this.showSuccessMessage('Task updated successfully');
            this.loadTasks();
          },
          error: (error) => {
            this.showErrorMessage('Error updating task');
            console.error(error);
          }
        });
      }
    });
  }

  deleteTask(task: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { title: 'Delete Task', message: 'Are you sure you want to delete this task?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.httpService.deleteTask(task.id).subscribe({
          next: () => {
            this.showSuccessMessage('Task deleted successfully');
            this.loadTasks();
          },
          error: (error) => {
            this.showErrorMessage('Error deleting task');
            console.error(error);
          }
        });
      }
    });
  }

  private showSuccessMessage(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 3000 });
  }

  private showErrorMessage(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 3000 });
  }

  getStatusColor(status: string): ThemePalette {
    switch (status) {
      case 'pending':
        return 'warn';
      case 'in_progress':
        return 'accent';
      case 'completed':
        return 'primary';
      default:
        return 'warn';
    }
  }

  onStatusFilterChange(status: string | null): void {
    this.loadTasks(status);
  }
}
