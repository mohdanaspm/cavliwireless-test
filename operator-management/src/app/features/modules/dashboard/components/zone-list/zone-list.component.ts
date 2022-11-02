import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-zone-list',
  templateUrl: './zone-list.component.html',
  styleUrls: ['./zone-list.component.scss']
})
export class ZoneListComponent implements OnInit {

  tableData: any[] = [];
  rows: any[] = [];

  constructor(private dashboardService: DashboardService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.dashboardService.getZone().subscribe(data => {
      if(data) {
        // let index = this.rows.length > 0 ? this.rows.length+1 : 1;
      this.rows.push(data);
      this.dashboardService.setZoneList(this.rows);
      }
     
      
    });
    this.dashboardService.getZoneList().subscribe((list: any) => {
      if(list) {
        this.tableData = [...list];
      } 
    })
    
  }

  columnHeader = {
    zone_name: 'Zone',
    zone_price: 'Price',
    actions: 'Delete'
  };

  onDelete(data: any) {
    let index = this.tableData.findIndex(item => item.id = data.id);
    this.tableData.splice(index+1, 1);
    this.rows = [...this.tableData];
    this.dashboardService.setZoneList(this.rows)
  }

}
