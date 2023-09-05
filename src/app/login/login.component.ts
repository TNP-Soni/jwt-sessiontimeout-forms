import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service.service';
import { FormBuilder, FormGroup, FormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder,
    private authservice:AuthService,
    private router:Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      let params;
      if(this.isEmail(formData.email)){
         params = {
          pass : formData.password,
          email : formData.email
        }
      }
      else{
        params ={
          pass: formData.password,
          mobile:formData.email
        }
      }
      this.authservice.login(params).subscribe(
      (response)=>{
        if(response.message=="user found"){
          localStorage.setItem("usertoken",response.token)
          this.router.navigate(['dashboard']);
        }else{
          alert("Check your credentials and try again");
        }
      }, 
      (error: any) => {
          console.log(error)
      })
    }
  }


  isEmail(input: string): boolean {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(input);
  }
}
