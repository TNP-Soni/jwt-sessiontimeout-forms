import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RecordsService } from 'src/app/services/records.service';
@Component({
  selector: 'app-newrecord',
  templateUrl: './newrecord.component.html',
  styleUrls: ['./newrecord.component.scss']
})
export class NewrecordComponent {
  addrecordform: FormGroup;
  constructor(private fb: FormBuilder,private recordservice:RecordsService) {
    this.addrecordform = this.fb.group({
      eid: ['', Validators.required],
      ename: ['', Validators.required],
      dept: ['', Validators.required],
      salary: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.addrecordform.valid) {
      const formData = this.addrecordform.value;
      let params = {
        eid : formData.eid,
        ename : formData.ename,
        dept : formData.dept,
        salary : formData.salary,
      }
      this.recordservice.addrecord(params).subscribe(
      (response)=>{
        if(response.message && response.message=="success"){
          alert("New Record Added!");
        }else if(response.message && response.message=="User Already Exists!"){
          alert("Employee Record Already exists");
        }else{
          alert("Some Error occured please try again!");
        }
      }, 
      (error: any) => {
          console.log(error)
      })
    }
  }
}
