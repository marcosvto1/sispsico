import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.scss']
})
export class PaginateComponent implements OnInit {


  @Input() page = 1;
  @Input() type = 'list';
  @Input() total: number;
  @Input() itemsPerPage = 15;
  @Input() pageCount: number;

  @Output() pageChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() pageNext: EventEmitter<any> = new EventEmitter<any>();
  @Output() pageBack: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  handlePageChanged(e): void {
    this.pageChanged.emit(e);
  }

  handlePageNext(): void {
    this.page++;
    this.pageNext.emit({page: this.page});
  }

  handlePageBack(): void {
    this.page--;
    this.pageBack.emit({page: this.page});
  }

}
