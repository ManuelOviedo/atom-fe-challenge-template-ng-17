import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent, NavbarComponent, SidebarComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render navbar component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-navbar')).toBeTruthy();
  });

  it('should render sidebar component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-sidebar')).toBeTruthy();
  });
}); 
