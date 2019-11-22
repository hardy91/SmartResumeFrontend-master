import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { Http, Headers } from '@angular/http';
import {MessageService} from  "primeng/api";
import { saveAs } from 'file-saver';

import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { RouterScroller } from '@angular/router/src/router_scroller';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError } from 'rxjs/operators';


@Component({
  selector: 'app-update-applicant-profile',
  providers: [MessageService],
  templateUrl: './update-applicant-profile.component.html',
  styleUrls: ['./update-applicant-profile.component.scss']
})
export class UpdateApplicantProfileComponent implements OnInit {


  constructor(private messageService : MessageService , private httpClient :HttpClient , private router : Router) {}

 isRecruiterViewing : boolean ;
  title = 'Smart Resume';
  page = "Update Profile"
  baseUrl = "http://localhost:8082";
  items: MenuItem[];
  activeIndex: number = 0;
  firstName  : String;
  lastName : String;
  resumeLink : String;
  email : String ;
  candidateEmail :String
  phone : String ;
  address : String;

  uni : String;
  gpa : String;
  totalGpa : String;
  major : String;
  stream: String;

  company: String;
  roleInCompany: String;
  skills: String;
  exp: String;


  userProfile: any = {email : "" , firstName : "" , lastName : "" ,address : "" , phone : "",resumeLink : "" ,role: "" }

  updateProfileResponse :any = {message : "", object:{ name :"" ,address :"" ,phone:"",resumeLink: "" }} ;
  getProfileResponse :any = { object:{ name :"" ,address :"" ,phone:"",resumeLink: "" }} ;
  selectedValue : any ;


  ngOnInit() {
    this.messageService.add({
      key: "myKey2",
      severity: "error",
      summary: "notification worked ",
      detail: "message service worked"
    });
    this.email  = localStorage.getItem("email");
    if(localStorage.getItem("recruiterViewing")){
      this.candidateEmail = localStorage.getItem("recruiterViewing")
     localStorage.removeItem("recruiterViewing");

      this.isRecruiterViewing  = true ;

    }
    else{

      this.candidateEmail = this.email;
    }


    if(this.isRecruiterViewing){

    this.items = [{
      label: 'Personal Info',
      command: (event: any) => {
          this.activeIndex = 0;
          this.messageService.add({severity:'info', summary:'First Step', detail: event.item.label});
      }
  },
  {
    label: 'Documents',
    command: (event: any) => {
        this.activeIndex = 1;
        this.messageService.add({severity:'info', summary:'Seat Selection', detail: event.item.label});
    }
  },

   {
      label: 'Education',
      command: (event: any) => {
          this.activeIndex = 2;
          this.messageService.add({severity:'info', summary:'Seat Selection', detail: event.item.label});
      }
  },

  {
      label: 'Experience',
      command: (event: any) => {
          this.activeIndex = 3;
          this.messageService.add({severity:'info', summary:'Pay with CC', detail: event.item.label});
      }
  },


];
    }

else
{

this.items = [{
  label: 'Personal Info',
  command: (event: any) => {
      this.activeIndex = 0;
      this.messageService.add({severity:'info', summary:'First Step', detail: event.item.label});
  }
},
{
label: 'Documents',
command: (event: any) => {
    this.activeIndex = 1;
    this.messageService.add({severity:'info', summary:'Seat Selection', detail: event.item.label});
}
},

{
  label: 'Education',
  command: (event: any) => {
      this.activeIndex = 2;
      this.messageService.add({severity:'info', summary:'Seat Selection', detail: event.item.label});
  }
},

{
  label: 'Experience',
  command: (event: any) => {
      this.activeIndex = 3;
      this.messageService.add({severity:'info', summary:'Pay with CC', detail: event.item.label});
  }
},

{
  label: 'Terms and Conditions',
  command: (event: any) => {
      this.activeIndex = 5;
      this.messageService.add({severity:'info', summary:'Last Step', detail: event.item.label});
  }
}
];

}






if(localStorage.getItem("message")){
  let message = localStorage.getItem("message");
  this.messageService.add({key: "myKey2",
  severity: "error", summary:'Message', detail: message});
  localStorage.removeItem("message") ;
}



let path  = "/getprofile"
this.httpClient
.post(this.baseUrl + path, {
  email: this.candidateEmail,

})
.subscribe(
  data => {
    console.log("POST Request is successful ", data);
    console.log("POST Request is successful ", );

    this.getProfileResponse  = data ;


    if (this.getProfileResponse.message){
      this.messageService.add({
        key: "myKey2",
        severity: "success",
        summary: "Message",
        detail:  this.getProfileResponse.message

      });
      return ;
    }
    let fullname = this.getProfileResponse.object.name.split("_") ;
//this.email = this.getProfileResponse.object.email;
this.firstName = fullname["0"];
this.lastName = fullname["1"];
this.uni = fullname["2"];
this.gpa = fullname["3"];
this.totalGpa= fullname["4"];
this.major= fullname["5"];
this.stream= fullname["6"];
this.company= fullname["7"];
this.roleInCompany= fullname["8"];
this.skills= fullname["9"];
this.exp= fullname["10"];

this.address = this.getProfileResponse.object.address;
this.phone = this.getProfileResponse.object.phone;
this.resumeLink = this.getProfileResponse.object.resumeLink;





  },
  error => {
    console.log("Error", error);

    this.messageService.add({
      key: "myKey2",
      severity: "success",
      summary: "Error in loading data",
      detail:  "Error in loading data"

    });
  }
);




  }

  updateProfile(){

       let path = "/updateProfile";
    let  userType = "";
    this.httpClient
      .post(this.baseUrl + path, {
        email: this.email,
        name : this.firstName +"_"+this.lastName + "_"+this.uni+ "_"+this.gpa + "_"+this.totalGpa+ "_"+ this.major+ "_"+
         this.stream + "_"+this.company+ "_"+
        this.roleInCompany+ "_"+ this.skills + "_"+this.exp



        ,
        address : this.address,
        phone : this.phone,
        resumeLink : this.resumeLink
      })
      .subscribe(
        data => {
          console.log("POST Request is successful ", data);
          console.log("POST Request is successful ", );

          this.updateProfileResponse  = data ;



          this.messageService.add({
            key: "myKey2",
            severity: "success",
            summary: "Successful profile update",
            detail:  this.updateProfileResponse.message

          });

            this.activeIndex = 0 ;




        },
        error => {
          console.log("Error", error);

          this.messageService.add({
            key: "myKey2",
            severity: "success",
            summary: "Error occured",
            detail:  this.updateProfileResponse.message

          });
        }
      );

  }


  viewJobs(){

this.router.navigateByUrl("/view_n_apply_jobs");

  }


  logout(){
    localStorage.clear();
   this.router.navigateByUrl("/");
  }

  fileToUpload: File = null;
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  uploadFileToActivity() {
    this.postFile(this.fileToUpload).subscribe(data => {
      // do something, if upload success
      }, error => {
        console.log(error);
      });
  }

  postFile(fileToUpload: File): Observable<boolean> {
    const endpoint = '/uploadResume';
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.httpClient
      .post(this.baseUrl + endpoint,  formData)
      .pipe(map(() => { return true; }))

}

  }



