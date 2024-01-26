import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthModalComponent } from 'app/components/modals/auth-modal/auth-modal.component';
import { AuthService } from 'app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(
    private dialog: MatDialog,
    protected authService: AuthService,
  ) {}

  public onLogin(): void {
    this.dialog.open(AuthModalComponent, {
      width: '70vh',
      height: '500px',
    });
  }

  public onLogout(): void {
    this.authService.logout().subscribe(
      () => localStorage.clear(),
      (err) => console.log('err: ', err),
    );
  }
}
