import { Component, Output, EventEmitter,OnInit } from '@angular/core';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit{
  @Output() changeActionEvent = new EventEmitter<string>();
  dropdown = false;
  opendropdown(){
    this.dropdown = !this.dropdown;
  }

  changeAction(event:string){
    this.changeActionEvent.emit(event)
  }

  ngOnInit(): void {
  }

  triggersignout(){
    this.changeActionEvent.emit("logout");
  }
}
