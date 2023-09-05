import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  URL = "http://localhost:3000/";
  constructor(private http : HttpClient) { }
  
  signup(data:any):Observable<any>{
    return this.http.get(this.URL + "signup",{params:data});
  }

  login(data:any):Observable<any>{
    return this.http.get(this.URL+"login",{params:data});
  }

  fetchToken(data:any):Observable<any>{
    return this.http.get(this.URL+"fetchtoken",{params:data});
  }

}
