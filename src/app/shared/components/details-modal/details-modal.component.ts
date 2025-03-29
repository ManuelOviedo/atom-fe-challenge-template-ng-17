import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DetailsViewComponent } from '../details-view/details-view.component';

@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatIconModule, MatButtonModule, DetailsViewComponent]
})
export class DetailsModalComponent {
  constructor(
    public dialogRef: MatDialogRef<DetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      title: string;
      content: any;
      icon: string;
    }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
} 
