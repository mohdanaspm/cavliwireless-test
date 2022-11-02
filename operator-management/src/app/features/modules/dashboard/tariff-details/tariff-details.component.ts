import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tariff-details',
  templateUrl: './tariff-details.component.html',
  styleUrls: ['./tariff-details.component.scss']
})
export class TariffDetailsComponent implements OnInit {

  @Input() formArrayName = 'tariff';

  @Input() set tableData(data: any) {
    if(data && data.length>0)this.populateTable(data);
  };
  @Input() columnHeader = {
    Zone: 'Zone',
    Country: 'Country',
    'Network Operator': 'Network Operator',
    'Network Code': 'Network Operator Code',
    'Increment': 'Increment'
  };
  @Output() deleteEvent = new EventEmitter<string>();
  
  dataSource: any;

  tarifArray!: FormArray;
  form!: FormGroup;
  objectKeys = Object.keys;

  constructor(private rootFormGroup: FormGroupDirective, private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.rootFormGroup.control;
    this.tarifArray = this.form.get(this.formArrayName) as FormArray;
    console.log(this.tarifArray, this.rootFormGroup)
  }


  handleClick(event: any, eventType: any) {
    switch(eventType) {
      case 'delete':
        this.deleteEvent.emit(event);
        break;
    }
  }

  populateTable(data: any) {
    console.log(data, 'populate')
    if(data.length > 0) {
      this.dataSource = new MatTableDataSource(data);
    }
  }

  buildFormArray(tariffDetails: any[]) {
    tariffDetails.forEach(item => {
      this.tarifArray.push(this.fb.group({
        zone: [''],
        country: [''],
        'network_opertor': [''],
        'network_code': [''],
        increment: ['']
      }))
    });
  }

}
