import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog.component';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<ConfirmDialogComponent>>;

  beforeEach(async () => {
    dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [ConfirmDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { title: 'Test Title', message: 'Test Message' } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog with false when clicking No', () => {
    component.onNoClick();
    expect(dialogRef.close).toHaveBeenCalledWith(false);
  });

  it('should close dialog with true when clicking Yes', () => {
    component.onYesClick();
    expect(dialogRef.close).toHaveBeenCalledWith(true);
  });
}); 
