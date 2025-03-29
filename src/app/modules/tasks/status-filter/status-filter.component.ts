import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-status-filter',
  templateUrl: './status-filter.component.html',
  styleUrls: ['./status-filter.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatChipsModule
  ]
})
export class StatusFilterComponent {
  @Output() statusChanged = new EventEmitter<string | null>();
  
  statuses = [
    { value: null, label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' }
  ];

  selectedStatus: string | null = null;

  onStatusSelect(status: string | null): void {
    this.selectedStatus = status;
    this.statusChanged.emit(status);
  }
} 
