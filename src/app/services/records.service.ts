import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RecordsService {
  URL = "http://localhost:3000/";
  constructor(private http :HttpClient) { }

  addrecord(data:any):Observable<any>{
    return this.http.get(this.URL+"addrecord",{params:data});
  }

  viewall():Observable<any>{
    return this.http.get(this.URL+"viewall");
  }

  bulkupload(params:any):Observable<any>{
    return this.http.get(this.URL+"bulkupload",{params:params});
  }
}
