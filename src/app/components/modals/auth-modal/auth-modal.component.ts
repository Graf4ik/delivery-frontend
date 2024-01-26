import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { RegistrationModalComponent } from 'app/components/modals/registration-modal/registration-modal.component';
import { MaterialModule } from 'app/material/material.module';
import { LoginResponse } from 'app/shared/interfaces/auth.interface';
import { AuthService } from 'app/shared/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [MaterialModule, FormsModule, ReactiveFormsModule],
  providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }],
  templateUrl: './auth-modal.component.html',
  styleUrl: './auth-modal.component.scss',
})
export class AuthModalComponent implements OnInit {
  public loginForm!: FormGroup;
  authSub!: Subscription;
  destroyRef = inject(DestroyRef);

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required, Validators.minLength(4), Validators.maxLength(14)],
    });
  }

  login(): void {
    const formValue = this.loginForm.getRawValue();
    this.authSub = this.auth
      .login(formValue)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
        (res: LoginResponse) => {
          if (res) {
            this.dialog.closeAll();
          }
        },
        (err) => {
          console.log('err: ', err);
        },
      );
  }

  onSignUp(): void {
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(RegistrationModalComponent, {
      width: '70vh',
      height: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  protected email() {
    return this.loginForm.get('email');
  }

  protected password() {
    return this.loginForm.get('password');
  }
}
