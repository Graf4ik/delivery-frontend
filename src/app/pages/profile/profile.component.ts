import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @ViewChild('name') nameEl!: ElementRef;
  profileForm!: FormGroup;
  name: string = 'Ivanov Ivan';
  editing: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.profileForm = this.fb.nonNullable.group({
      name: [{ value: 'Ivanov Ivan', disabled: true }],
    });
  }

  editProfile(): void {
    this.editing = !this.editing;
    if (this.nameControl) {
      if (this.editing) {
        this.nameControl!.enable();
        this.nameEl.nativeElement.focus();
        this.nameEl.nativeElement.setAttribute('style', 'background: antiquewhite');
      } else {
        this.profileForm.get('name')!.disable();
        this.nameEl.nativeElement.setAttribute('style', 'background: #fff');
      }
    }
  }

  change(event: KeyboardEvent): void {
    event.key === 'Enter' ? (this.editing = false) : this.editing;
  }

  toFavorites(): void {
    this.router.navigate(['/favorites']);
  }

  get nameControl() {
    return this.profileForm.get('name');
  }
}
