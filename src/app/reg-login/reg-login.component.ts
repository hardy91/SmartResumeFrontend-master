import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";
//import {MessageService} from './messageservice';

import { HttpClient } from "@angular/common/http";

import { Password } from "primeng/password";
import { MessageService } from "primeng/api";
import { userInfo } from "os";
import { routerNgProbeToken } from "@angular/router/src/router_module";
import { Router } from "@angular/router";

@Component({
  selector: "app-reg-login",
  providers: [MessageService, HttpClient],
  templateUrl: "./reg-login.component.html",
  styleUrls: ["./reg-login.component.css"]
})
export class RegLoginComponent implements OnInit {
  constructor(
    private messageService: MessageService,
    private router: Router,
    private httpClient: HttpClient
  ) {}
  title = 'Smart Resume';
  page = 'Login / Register'
  //config : Config ;
  baseUrl = "http://localhost:8082";
  items: MenuItem[];
  activeIndex: number = 0;
  isRecruiter: boolean = false;
  isReg: boolean = false;
  password: String;
  confirmPassword: String;
  firstName: String;
  lastName: String;
  email: String;
  userProfile: any = {object:{
    email: "",
    firstName: "",
    lastName: "",
    role: ""},
    message: ""
  };

  ngOnInit() {
    this.password = "";
    this.items = [
      {
        label: "Personal Info",
        command: (event: any) => {
          this.activeIndex = 0;
          this.messageService.add({
            severity: "info",
            summary: "First Step",
            detail: event.item.label
          });
        }
      },
      {
        label: "Documents",
        command: (event: any) => {
          this.activeIndex = 1;
          this.messageService.add({
            severity: "info",
            summary: "Seat Selection",
            detail: event.item.label
          });
        }
      },

      {
        label: "Education",
        command: (event: any) => {
          this.activeIndex = 2;
          this.messageService.add({
            severity: "info",
            summary: "Seat Selection",
            detail: event.item.label
          });
        }
      },

      {
        label: "Experience",
        command: (event: any) => {
          this.activeIndex = 3;
          this.messageService.add({
            severity: "info",
            summary: "Pay with CC",
            detail: event.item.label
          });
        }
      },

      {
        label: "Terms and Conditions",
        command: (event: any) => {
          this.activeIndex = 5;
          this.messageService.add({
            severity: "info",
            summary: "Last Step",
            detail: event.item.label
          });
        }
      }
    ];

    this.addSingle();
    let re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    let userProfileObject = JSON.parse( localStorage.userProfile).object;
    if(localStorage.role && localStorage.userProfile && userProfileObject.email && localStorage.email != "" && re.test(String(localStorage.email).toLowerCase())){
      if(localStorage.role == "recruiter" ){
        this.router.navigateByUrl("/postjob");
      }
      else{
        this.router.navigateByUrl("/update_applicant_profile")
      }
    }
  }

  addSingle() {
    this.messageService.add({
      key: "myKey1",
      severity: "success",
      summary: "Service Message",
      detail: "Via MessageService"
    });
  }


  loginUser() {


    let re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    if (this.email == "" || !re.test(String(this.email).toLowerCase())) {
      this.messageService.add({
        key: "myKey1",
        severity: "error",
        summary: "Invalid Email ",
        detail: "Please enter a valid email"
      });
      return;
    }

    if ( this.password == "" ) {
      this.messageService.add({
        key: "myKey1",
        severity: "error",
        summary: "Validation",
        detail: "Password is required fields,"
      });
      return;
    }




    let path = "";
    let userType = "";
    path = "/login";
    if (this.isRecruiter) {
      userType = "recruiter";
    } else {

      userType = "candidate";
    }

    this.httpClient
      .post(this.baseUrl + path, {
        email: this.email,
        password: this.password
      })
      .subscribe(
        data => {
          console.log("POST Request is successful ", data);
          console.log("POST Request is successful ", );
          this.userProfile = data;
          this.email = this.userProfile.email;

          this.password = "";
          if(this.userProfile.role == "recruiter" ){
            this.isRecruiter = true ;
          }else{
            this.isRecruiter = false ;
          }
          this.messageService.add({
            key: "myKey1",
            severity: "success",
            summary: "Successful Login",
            detail:
              this.userProfile.firstName +
              " is logged in as " +
              userType +
              " with name " +
              this.userProfile.firstName +
              " in system."
          });
          if(this.userProfile.object ){
          localStorage.setItem("userProfile", JSON.stringify(data));
          localStorage.setItem("role", this.userProfile.object.role);
          localStorage.setItem("email", this.userProfile.object.email);
          localStorage.setItem("message", this.userProfile.message );

            if(this.userProfile.object.role == "recruiter"){
              this.router.navigateByUrl("/postjob");
            }else {
              this.router.navigateByUrl("/update_applicant_profile");
            }
          }
        },
        error => {
          console.log("Error", error);
        }
      );

  }

  regCallToDB() {
    // this.httpClient.get(this.baseUrl + '/nurseSignup').subscribe((res)=>{
    //     console.log(res);
    // });

    let minPassLength = 3;

    let re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    if (this.email == "" || !re.test(String(this.email).toLowerCase())) {
      this.messageService.add({
        key: "myKey1",
        severity: "error",
        summary: "Invalid Email ",
        detail: "Please enter a valid email"
      });
      return;
    }

    if (this.email == "" || this.password == "" || this.confirmPassword == "") {
      this.messageService.add({
        key: "myKey1",
        severity: "error",
        summary: "Validation",
        detail: "Email , Password  and Confirm-Password are required fields,"
      });
      return;
    }

    if (this.password != this.confirmPassword) {
      this.messageService.add({
        key: "myKey1",
        severity: "error",
        summary: "Password Mismatch",
        detail: "Password Field should be same as Confirm Password."
      });
      return;
    }

    if (this.password.length < minPassLength) {
      this.messageService.add({
        key: "myKey1",
        severity: "error",
        summary: "Too Short Password",
        detail:
          "Password should be atleast " +
          minPassLength +
          "long to be safe from bruteforce attack"
      });
      return;
    }

    let path = "";
    let userType = "";
    path = "/register";
    if (this.isRecruiter) {
      userType = "recruiter";
    } else {
      userType = "candidate";
    }

    this.httpClient
      .post(this.baseUrl + path, {
        email: this.email,
        password: this.password,
        role: userType
      })
      .subscribe(
        data => {
          console.log("POST Request is successful ", data);
          this.userProfile = data;
          console.log("userprofile --> " + this.userProfile );
          this.email = this.userProfile.email;
          this.isReg = false;
          this.password = "";
          this.messageService.add({
            key: "myKey1",
            severity: "success",
            summary: "Successful Signup",
            detail: this.userProfile.message
          });
        },
        error => {
          console.log("Error", error);
        }
      );
  }

  regUser() {
    console.log(
      "" +
        this.isRecruiter +
        this.isReg +
        this.password +
        this.confirmPassword +
        this.firstName +
        this.lastName +
        this.email
    );
    this.regCallToDB();
  }
}
