import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  zone = new Subject<any>();
  zoneList = new BehaviorSubject<any>(null);

  constructor() { }

  setZone(zone: any) {
    this.zone.next(zone)
  }

  getZone() {
    return this.zone.asObservable();
  }

  setZoneList(zones: any) {
    zones = zones.map((item: any, index: number) => {
      return {...item, id: index, isDeletable: true}
    })
    this.zoneList.next(zones)
  }

  getZoneList() {
    return this.zoneList.asObservable();
  }
}
