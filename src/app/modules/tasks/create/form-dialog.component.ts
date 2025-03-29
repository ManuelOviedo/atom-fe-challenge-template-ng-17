import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { ITask } from '../../../interfaces';

@Component({
  selector: 'app-task-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSelectModule
  ],
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss']
})
export class TaskFormDialogComponent {
  taskForm: FormGroup;
  priorities = ['Low', 'Medium', 'High'];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TaskFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; task?: ITask; }
  ) {
    this.taskForm = this.fb.group({
      name: [data.task?.name || '', [Validators.required]],
      description: [data.task?.description || ''],
      status: [data.task?.status || 'New']
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      this.dialogRef.close(this.taskForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
} 
