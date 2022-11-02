import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  get$(endpoint: string) {
    const apiUrl = `${this.baseUrl}${endpoint}`;
    return this.http.get(apiUrl);
  }

  post$(endpoint: string, obj: any) {
    const apiUrl = `${this.baseUrl}${endpoint}`;
    return this.http.post(apiUrl, obj);
  }

  put$(endpoint: string, obj: any) {
    const apiUrl = `${this.baseUrl}${endpoint}`;
    return this.http.put(apiUrl, obj);
  }
}
