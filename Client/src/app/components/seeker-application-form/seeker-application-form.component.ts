import { Component, OnInit,Inject} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { AdvertisementHeaderComponent } from "../advertisement-header/advertisement-header.component";
import { MatButtonModule } from '@angular/material/button';
import { FileUploadComponent } from "../file-upload/file-upload.component";
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SeekerService } from '../../../services/seeker.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FileDownloadComponent } from "../file-download/file-download.component";
import { Router } from '@angular/router';
import { ApplicationService } from '../../../services/application.service';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { AdvertisementServices } from '../../../services/advertisement.service';


interface Seeker{
    email:string;
    first_name:string;
    last_name:string;
    phone_number:string;
    linkedin:string;
  }

  interface Application{
  "advertisement_id": number,
  "seeker_id": number,
  "cVurl": "string",
  "doc1_url": "string",
  "doc2_url": "string"
  }

  interface Job{
    job_number: number;
    title: string;
    country: string;
    city: string;
    employeement_type: string;
    posted_date: string;
    job_description: string;
    field_name: string;
    company_name: string;
   
    
  } 

@Component({
    selector: 'app-seeker-application-form',
    standalone: true,
    templateUrl: './seeker-application-form.component.html',
    styleUrl: './seeker-application-form.component.css',
    imports: [MatCardModule, MatDividerModule, AdvertisementHeaderComponent, MatButtonModule, FileUploadComponent, MatCheckboxModule, FormsModule, CommonModule, FileDownloadComponent,MatDialogModule]
})
export class SeekerApplicationFormComponent implements OnInit {
    SeekerDetails: Seeker = {} as Seeker;
    applicationData: Application = {
      "advertisement_id": 1056,
      "seeker_id": 2,
      "cVurl": "string",
      "doc1_url": "string",
      "doc2_url": "string"
  
    };
    jobData: Job = {} as Job;
    useDefaultCV: boolean = false; 
    constructor(private adService:AdvertisementServices,private seekerService:SeekerService,private applicationService:ApplicationService, private router: Router, @Inject(MAT_DIALOG_DATA)public data:any) {}

    user_id: number = 2;
    
    
    async ngOnInit() {
      this.fetchEmployeeDetails(); 
      this.jobData = await this.adService.getAdvertisementById(this.data.jobID);
    }
    
    async fetchEmployeeDetails() {

      try {
        const seekerData = await this.seekerService.getSeekerDetailsForApplication(this.user_id);
        this.SeekerDetails = seekerData;
      } catch (error) {
        console.error('Error fetching seeker details:', error);
       
      }
   
}

toggleDefaultCV() {
  this.useDefaultCV = !this.useDefaultCV;
}

async onSubmitForm(){
  await this.applicationService.submitSeekerApplication(this.applicationData);
  this.router.navigate(['seeker/home/applicationForm/applicationFormconfirm']);
}
}



   
   

    
  

