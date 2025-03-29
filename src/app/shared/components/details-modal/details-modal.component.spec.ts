import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsModalComponent } from './details-modal.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DetailsModalComponent', () => {
  let component: DetailsModalComponent;
  let fixture: ComponentFixture<DetailsModalComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<DetailsModalComponent>>;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        DetailsModalComponent,
        NoopAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            title: 'Test Title',
            content: 'Test Content',
            icon: 'test_icon'
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with injected data', () => {
    expect(component.data.title).toBe('Test Title');
    expect(component.data.content).toBe('Test Content');
    expect(component.data.icon).toBe('test_icon');
  });

  it('should close dialog when onClose is called', () => {
    component.onClose();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
}); 
