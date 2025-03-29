import { Component, Input } from '@angular/core';
import { CommonModule, KeyValue } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-details-view',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, MatIconModule],
  templateUrl: './details-view.component.html',
  styleUrls: ['./details-view.component.scss']
})
export class DetailsViewComponent {
  @Input() data: Record<string, any> = {};

  originalOrder = (a: KeyValue<any,any>, b: KeyValue<any,any>): number => {
    return 0; // returning 0 will keep the original order
  }
}
