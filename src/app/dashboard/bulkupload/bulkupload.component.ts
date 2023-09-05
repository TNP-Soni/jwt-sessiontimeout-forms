import { Component } from '@angular/core';
import { RecordsService } from 'src/app/services/records.service';
import * as XLSX from 'xlsx'
@Component({
  selector: 'app-bulkupload',
  templateUrl: './bulkupload.component.html',
  styleUrls: ['./bulkupload.component.scss']
})
export class BulkuploadComponent {
  file : any
  
  constructor(private RecordsService:RecordsService){}
  selectFile(event:any){
    this.file=event.target.files[0];
  }
  
  uploadFile(){
    let freader = new FileReader()
    freader.readAsBinaryString(this.file);
    freader.onload  = (ele)=>{
      var data = XLSX.read(freader.result,{type:"binary"})
      var sheets = data.SheetNames;
      var uploadedData = XLSX.utils.sheet_to_json(data.Sheets[sheets[0]]) 
      var stringified = JSON.stringify(uploadedData);
      this.RecordsService.bulkupload({data:stringified}).subscribe((res)=>{
        if(res.message=="duplicate data present!"){
          alert("Some Emplooyees from the list are already present");
        }else if(res.message="success"){
          alert("All employee details uploaded!");
        }else{
          alert("Some error occured please try again!");
        }
      });

    } 
  }
}
