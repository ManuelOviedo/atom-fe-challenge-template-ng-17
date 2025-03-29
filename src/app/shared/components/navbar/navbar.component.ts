import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private readonly httpService: HttpService) {}

  logout(): void {
    this.httpService.logout();
  }
} 
