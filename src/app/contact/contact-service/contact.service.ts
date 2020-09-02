import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CONSTANT_URL } from '../../constant/constant-rest';
import { Observable } from 'rxjs';
import { Contact } from '../contact-model/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  BASE_URL = CONSTANT_URL.BASE_URL + CONSTANT_URL.CONTACT;

  constructor(
    public http: HttpClient
  ) { }

  public getAll(): Observable<any> {
    const url = this.BASE_URL;
    return this.http.get(url);
  }

  public getOne(id: any): Observable<any> {
    const url = this.BASE_URL + id;
    return this.http.get(url);
  }

  public save(data: Contact): Observable<any> {
    const url = this.BASE_URL;
    return this.http.post(url, data);
  }

  public update(data: Contact): Observable<any> {
    const url = this.BASE_URL;
    return this.http.put(url, data);
  }

  public delete(id: any): Observable<any> {
    const url = this.BASE_URL + id;
    return this.http.delete(url);
  }
}
