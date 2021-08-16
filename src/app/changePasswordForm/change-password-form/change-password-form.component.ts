import { Component, OnInit } from '@angular/core';
import { login } from 'src/app/injectables';
import { LoginService } from 'src/app/services/loginService';

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.scss']
})
export class ChangePasswordFormComponent implements OnInit {

  showAsterisks = true;
  password
  passwordLength 
  fakePassword
  
  

  constructor(
    public loginInfo : login,
    private loginservice : LoginService
  ) { }

  ngOnInit(): void {
    let objects = document.getElementsByClassName("app")
    let i = 0
    Array.from(objects).forEach(element => {
      //@ts-ignore
      objects[i].style.display = "none"
      i++
    });


    this.password  = this.loginInfo.password
    this.passwordLength = this.loginInfo.passwordLength
    this.fakePassword = '*'.repeat(10)
  }
  changePassword(newPassword){
    console.log('new password : '  ,  newPassword)
    let test = this.loginservice.changePassword(newPassword)
    test.subscribe(result=>{
      if(result != undefined){
        console.log("Change password worked : ",  result)

      }
      else{
        console.log("Change password failed : " ,  result)
      }
   
    })



    //TODO make this update
  }
  changeEmail(newEmail){
    let User = {
      idUsers : this.loginInfo.userId,
      name : this.loginInfo.name,
      Email : this.loginInfo.email,
      Password : this.loginInfo.password,
    }
    console.log("new email : " ,  newEmail)
    
    this.loginservice.changePassword(User).subscribe(result=>{  
      console.log('result : ' ,  result)
    })
  } 

  togglePassword(){
    if (this.showAsterisks){
      this.showAsterisks = false
    }
    else{
      this.showAsterisks = true
    }
  }

  ngOnDestroy(){
    let objects = document.getElementsByClassName("app")
    let i = 0
    Array.from(objects).forEach(element => {
      //@ts-ignore
      objects[i].style.display = "block"
      i++
    });
  }

}
