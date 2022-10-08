import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-generic-searchbar',
  templateUrl: './generic-searchbar.component.html',
  styleUrls: ['./generic-searchbar.component.css'],
})
export class SearchbarComponent {
  @Input() public panelWidth!: string;
  @Input() public displayAvatar!: boolean;
  @Input() public searchSubject!: Subject<string>;
  @Input() public placeholder: string = 'Search';
  @Output() public optionSelected = new EventEmitter<any>();

  public filteredResults: Array<any> = [];

  pipeSearchEvents(event: Event): void {
    const searchQuery = (event.target as HTMLInputElement).value;
    this.searchSubject.next(searchQuery?.trim());
  }

  emitSelection(value: string): void {
    this.optionSelected.emit(value);
  }
}
