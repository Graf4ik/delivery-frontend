import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'app/components/confirmation-dialog/confirmation-dialog.component';

@Injectable({
  providedIn: 'root'
})

export class NotificationService {
  constructor(
    private readonly snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  success(message: string): void {
    this.openSnackBar(message, 'success-snackbar');
  }

  error(message: string): void {
    this.openSnackBar(message, 'error-snackbar');
  }

  confirmation(
    message: string,
    okCallback: () => void,
    title = 'Are you sure?',
    cancelCallback: () => any = () => {}
  ) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { message, title }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && okCallback) {
        okCallback();
      }
      if (!result && cancelCallback) {
        cancelCallback();
      }
    });
  }

  openSnackBar(message: string, className: string): void {
    this.snackBar.open(message, '', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: [className]
    });
  }
}
