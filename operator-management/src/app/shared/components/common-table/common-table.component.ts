import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Column} from 'src/app/core/model/table-column.model';

@Component({
  selector: 'app-common-table',
  templateUrl: './common-table.component.html',
  styleUrls: ['./common-table.component.scss']
})
export class CommonTableComponent implements OnInit {

  @Input() set tableData(data: any) {
    if(data)this.populateTable(data);
  };
  @Input() columnHeader: any;

  @Output() deleteEvent = new EventEmitter<string>();

  @ViewChild(MatSort) sort: any;
  @ViewChild(MatPaginator) paginator: any;

  objectKeys = Object.keys;
  dataSource: any;
  isLoadingResults = false;
  resultsLength: any;

  constructor() {}

  ngOnInit() {
  
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  handleClick(event: any, eventType: any) {
    switch(eventType) {
      case 'delete':
        this.deleteEvent.emit(event);
        break;
    }
  }

  populateTable(data: any) {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }
}
