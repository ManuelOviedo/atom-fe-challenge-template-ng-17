import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserFormDialogComponent } from './form-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

describe('UserFormDialogComponent', () => {
  let component: UserFormDialogComponent;
  let fixture: ComponentFixture<UserFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UserFormDialogComponent,
        NoopAnimationsModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: { close: () => {} } },
        { provide: MAT_DIALOG_DATA, useValue: { title: 'Test Dialog' } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty form', () => {
    expect(component.userForm.get('name')?.value).toBe('');
    expect(component.userForm.get('email')?.value).toBe('');
  });

  it('should validate required fields', () => {
    expect(component.userForm.valid).toBeFalsy();
    component.userForm.patchValue({
      name: 'John Doe',
      email: 'john@example.com'
    });
    expect(component.userForm.valid).toBeTruthy();
  });

  it('should validate email format', () => {
    component.userForm.patchValue({
      name: 'John Doe',
      email: 'invalid-email'
    });
    expect(component.userForm.get('email')?.hasError('email')).toBeTruthy();
  });
}); 
