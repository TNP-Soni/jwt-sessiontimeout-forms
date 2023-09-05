import { Component, OnInit } from '@angular/core';
import { RecordsService } from 'src/app/services/records.service';
import * as xlsx from 'xlsx'
@Component({
  selector: 'app-viewall',
  templateUrl: './viewall.component.html',
  styleUrls: ['./viewall.component.scss']
})
export class ViewallComponent implements OnInit {

  constructor(private records:RecordsService){}
  employeeData :any;
  dataloaded = false;
  ngOnInit(): void {
    this.records.viewall().subscribe((res)=>{
      if(res.message == "success"){
        this.employeeData = res.data;
        this.dataloaded = true;
      }
    })
  }

  exportData(){
    let ele = document.getElementById("employees");
    const worksheet:xlsx.WorkSheet = xlsx.utils.table_to_sheet(ele);
    const workbook:xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook,worksheet,'Sheet 1');
    xlsx.writeFile(workbook,"employee data.xlsx"); 
  }
}
