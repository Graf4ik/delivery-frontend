import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss']
})
export class CartModalComponent implements OnInit {
  public orderNumber: number = 0;

  constructor(
    public dialogRef: MatDialogRef<CartModalComponent>,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.orderNumber = Math.floor(Math.random() * 45);
  }

  confirm(): void {
    this.dialogRef.close();
    this.router.navigate(['/']);
  }
}
