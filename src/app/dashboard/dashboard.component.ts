import { Component,OnInit } from '@angular/core';
import { BnNgIdleService } from 'bn-ng-idle';
import { AuthService } from '../services/auth-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  newrecord = false;
  viewrecord = false;
  bulkupload = false;

  constructor(private idle:BnNgIdleService,
    private authService:AuthService,
    private router:Router){}
    interval :any
  ngOnInit(): void {
    this.idle.startWatching(60).subscribe((isTimedOut:boolean)=>{
      if(isTimedOut){
        localStorage.removeItem("usertoken");
        localStorage.removeItem("username");
        this.idle.stopTimer();
        clearInterval(this.interval);
        this.router.navigate(['login']);
      }
    })

    this.interval = setInterval(()=>{
      console.log("ASD");
      var username = "asd";
      this.authService.fetchToken({username:username}).subscribe((res)=>{
        if(res.message=="token updated"){
          localStorage.removeItem("usertoken");
          localStorage.setItem("usertoken",res.token);
        }
      })
    },30000);
  }
  
  changeAction(event:string){
    switch(event){
      case "newrecord" :  {this.newrecord =true; this.viewrecord =false; this.bulkupload =false}; break;
      case "viewrecord" : {this.newrecord =false; this.viewrecord =true; this.bulkupload =false};break;
      case "bulkupload" : {this.newrecord =false; this.viewrecord =false; this.bulkupload =true};break;
      case "logout" :{
        localStorage.removeItem("usertoken");
        localStorage.removeItem("username");
        this.idle.stopTimer();
        clearInterval(this.interval);
        this.router.navigate(['login']);
      }
    }
  }
}
