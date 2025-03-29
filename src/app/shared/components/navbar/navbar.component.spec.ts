import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { HttpService } from '../../../services/http.service';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let httpService: jasmine.SpyObj<HttpService>;

  beforeEach(async () => {
    httpService = jasmine.createSpyObj('HttpService', ['logout']);

    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [
        { provide: HttpService, useValue: httpService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call httpService.logout when logout is called', () => {
    component.logout();
    expect(httpService.logout).toHaveBeenCalled();
  });
}); 
