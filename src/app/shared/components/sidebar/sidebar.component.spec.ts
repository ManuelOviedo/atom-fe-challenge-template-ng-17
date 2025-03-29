import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule,
        MatListModule,
        MatIconModule,
        SidebarComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render sidebar element', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-sidebar')).toBeTruthy();
  });
}); 
