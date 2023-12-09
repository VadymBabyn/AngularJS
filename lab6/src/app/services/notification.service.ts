import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  showSuccess(message: string) {
    const snackBarRef = this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 3000,
      panelClass: ['success-snackbar'],
      data: {
        message,
        icon: 'done',
      },
    });
  }

  showError(message: string) {
    const snackBarRef = this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 3000,
      panelClass: ['error-snackbar'],
      data: {
        message,
        icon: 'error',
      },
    });
  }
}
