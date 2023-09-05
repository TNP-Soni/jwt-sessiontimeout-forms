import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm: FormGroup;
  constructor(private fb: FormBuilder,
    private authservice:AuthService,
    private router:Router) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      mobile:['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmpass: ['',Validators.required]
    });
  }

  ngOnInit(): void {
    
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;
      if(formData.confirmpass==formData.password && formData.mobile.toString().length==9){
        let params = {
          username : formData.name,
          mobile : formData.mobile,
          pass : formData.password,
          email : formData.email
        }
        this.authservice.signup(params).subscribe(
        (response)=>{
          if(response.message=="User Already Exists!"){
            alert("User Already Exists!\nSwitch to Login");
          }else if(response.message=="success"){
            localStorage.setItem('usertoken',response.token);
            this.router.navigate(['dashboard'])
          }
        }, 
        (error: any) => {
            console.log(error)
        })
      }else{
        alert("Please Make sure the Password & Confirmed Password are same \nPlease Enter a Valid Number");
      }
    }
  }

}
