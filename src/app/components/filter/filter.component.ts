import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MealTypes } from '@app/shared/interfaces/filter.interface';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Output() filter: EventEmitter<string> = new EventEmitter<string>();
  @Input() type!: string;
  public mealTypes = MealTypes;

  ngOnInit(): void {
    this.type = this.mealTypes.BURGERS;
  }

  public handleFilter(type: string): void {
    if (this.type === this.mealTypes.All) {
      this.type = this.mealTypes.BURGERS;
      this.filter.emit(this.type);
    } else {
      this.type = type;
      this.filter.emit(this.type);
    }
  }
}
