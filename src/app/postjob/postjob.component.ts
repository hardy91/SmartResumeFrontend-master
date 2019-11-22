import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { Http, Headers } from '@angular/http';
import {MessageService} from  "primeng/api";
import { saveAs } from 'file-saver';

import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { ViewEncapsulation } from '@angular/core'


@Component({
  selector: 'app-postjob',
  templateUrl: './postjob.component.html',
  styleUrls: ['./postjob.component.scss'],


})
export class PostjobComponent implements OnInit {
  title = 'Smart Resume';
  page = 'Compose Job';
  jobTitle : String ;
  jobDesc : String ='<div>Hello World!</div><div>PrimeNG <b>Editor</b> Rocks</div><div><br></div>';
  baseUrl = "http://localhost:8082";
  emptyString : String =  "" ;
  addJobRes :any =  { message : "" , object: {jobId : "" , jobTitle : "" , jobDescription : "" }};
  ngxEditorConfig : Object
  email: String

  constructor( private messageService : MessageService , private httpClient :HttpClient , private router : Router) { }

  ngOnInit() {
    this.ngxEditorConfig =
    {
      "editable": true,
      "spellcheck": true,
      "height": "auto",
      "minHeight": "400px",
      "width": "auto",
      "minWidth": "0",
      "translate": "yes",
      "enableToolbar": true,
      "showToolbar": true,
      "placeholder": "Enter text here...",
      "imageEndPoint": "",
      "toolbar": [
          ["bold", "italic ", "underline", "strikeThrough", "superscript", "subscript"],
          ["fontName", "fontSize", "color"],
          ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull", "indent", "outdent"],
          ["cut", "copy", "delete", "removeFormat", "undo", "redo"],
          ["paragraph", "blockquote", "removeBlockquote", "horizontalLine", "orderedList", "unorderedList"],
          ["link", "unlink", "image", "video"]
      ]
  }
  this.email = localStorage.getItem("email")
  }

  addJob(){

    if ( this.jobTitle == "" ) {
      this.messageService.add({
        key: "myKey3",
        severity: "error",
        summary: "Validation",
        detail: "JobTitle is required fields,"
      });
      return;
    }
    let path  = "/addjob"
    this.httpClient
      .post(this.baseUrl + path, {
        jobTitle: this.jobTitle,
        jobDescription: this.jobDesc
      })
      .subscribe(
        data => {
           console.log("POST Request is successful ", data);
           this.addJobRes = data ;

            this.messageService.add({
            key: "myKey3",
            severity: "success",
            summary: "Successfully added",
            detail:  this.addJobRes.message

          });
          // console.log("POST Request is successful ", );
          // this.userProfile = data;
          // this.email = this.userProfile.email;

          // this.password = "";
          // if(this.userProfile.role == "recruiter" ){
          //   this.isRecruiter = true ;
          // }else{
          //   this.isRecruiter = false ;
          // }
          // this.messageService.add({
          //   key: "myKey1",
          //   severity: "success",
          //   summary: "Successful Login",
          //   detail:
          //     this.userProfile.firstName +
          //     " is logged in as " +
          //     userType +
          //     " with name " +
          //     this.userProfile.firstName +
          //     " in system."
          // });
          // if(this.userProfile.object ){
          // localStorage.setItem("userProfile", JSON.stringify(data));
          // localStorage.setItem("role", this.userProfile.object.role);
          // localStorage.setItem("email", this.userProfile.object.email);
          // localStorage.setItem("message", this.userProfile.message );

          //   if(this.userProfile.object.role == "recruiter"){
          //     this.router.navigateByUrl("/postjob");

          //   }else {

          //     this.router.navigateByUrl("/update_applicant_profile");
          //   }
          //}


        },
        error => {
          console.log("Error", error);
          this.messageService.add({
            key: "myKey2",
            severity: "success",
            summary: "Successful Login",
            detail:  this.addJobRes.message

          });
        }
      );

  }


  navToAllJobs(){
    this.router.navigateByUrl("/viewalljobs");
  }
  logout(){
    localStorage.clear();
   this.router.navigateByUrl("/");
  }
}
