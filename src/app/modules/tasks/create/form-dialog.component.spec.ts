import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskFormDialogComponent } from './form-dialog.component';

describe('TaskFormDialogComponent', () => {
  let component: TaskFormDialogComponent;
  let fixture: ComponentFixture<TaskFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TaskFormDialogComponent,
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {
            close: () => {}
          }
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            title: 'Test Dialog',
            isEdit: false
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values when creating new task', () => {
    expect(component.taskForm.get('title')?.value).toBe('');
    expect(component.taskForm.get('description')?.value).toBe('');
    expect(component.taskForm.get('priority')?.value).toBe('Medium');
  });

  it('should validate required fields', () => {
    const titleControl = component.taskForm.get('title');
    expect(titleControl?.valid).toBeFalsy();
    expect(titleControl?.hasError('required')).toBeTruthy();

    titleControl?.setValue('Test Task');
    expect(titleControl?.valid).toBeTruthy();
  });
}); 
