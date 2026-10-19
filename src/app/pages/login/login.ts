import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  imports: [FormsModule
  ],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {

  loginObj : any ={
    
      "username" : "",
      "password" : ""
    
  };
  http = inject(HttpClient);
  router = inject(Router);
  onLogin(){
    debugger;
    this.http.post("https://projectapi.gerasim.in/api/EmployeeManagement/login",this.loginObj).subscribe((res:any)=>{
      
      if(res.result){

        localStorage.setItem('employeeApp',JSON.stringify(res.data));
        this.router.navigateByUrl('/dashboard');
      }
      else{
        alert(res.message)
      }

    })
  }
}