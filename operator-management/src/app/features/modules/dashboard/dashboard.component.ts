import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { readXlsxSheet } from 'src/app/core/utilities/file-reader';
import { DashboardService } from './services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  zone = [];
  showTariff = false;
  tariffData = [];
  price: any;
  formData: any;
  zoneDetails: any[] = [];

  operatorForm: FormGroup = new FormGroup({
    network_operator: new FormControl(''),
    zone_details: new FormGroup({
      zone_name: new FormControl(''),
      zone_price: new FormControl(''),
    }),
    tarrif: new FormArray([])
  });

  constructor(private fb: FormBuilder, private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.initForm();
    this.dashboardService.getZoneList().pipe().subscribe((data: any) => {
      if(data)this.zoneDetails = data.map((item: any) => { delete item.isDeletable; return item; });
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.operatorForm.controls;
  }

  addZone() {

    this.dashboardService.getZoneList().pipe(take(1)).subscribe((data: any) => {
      const zoneControl = this.operatorForm.controls['zone_details'];
      this.zone = zoneControl.value;
      if (data) {
        let oldZones = data.map((item: any) => item.zone_name);
        if (!oldZones.includes(zoneControl.value.zone_name)) {
          this.dashboardService.setZone(this.zone);
          zoneControl.reset();
        } else {
          const zoneDetailsGroup = zoneControl as FormGroup;
          zoneDetailsGroup.controls['zone_name'].setErrors({ duplicate: true })
        }
      } else {
        this.dashboardService.setZone(this.zone);
        zoneControl.reset();
      }

    });

  }

  initForm() {
    this.operatorForm = this.fb.group({
      network_operator: ['', Validators.required],
      zone_details: this.fb.group({
        zone_name: ['', Validators.required],
        zone_price: ['', Validators.required]
      }),
      tariff: this.fb.array([])
    });
  }

  readFile(files: any) {
    readXlsxSheet(files[0]).then((filedata: any) => {
      this.tariffData = JSON.parse(filedata).Tariff;
      if (this.tariffData.length === 0) {
        alert('Please upload a valid excel sheet');
      }
    });
  }

  onFileRemove() {
    this.tariffData = [];
    this.showTariff = false;
  }
  addTariff() {
    this.showTariff = true;
  }
  resetForm() {
    this.operatorForm.reset();
    this.onFileRemove();
    this.dashboardService.setZoneList([]);
    this.dashboardService.setZone(null);
  }

  onSubmit() {
    this.formData = this.operatorForm.value;
    this.formData['zone_details'] = this.zoneDetails;
    this.formData['tariff'] = this.tariffData;
    console.info(this.formData);
  }

  isSaveDisabled() {
    return this.tariffData.length === 0 || this.f['network_operator'].value === '' || this.zoneDetails.length === 0;
  }
}
