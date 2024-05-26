import { Injectable } from '@angular/core';
import axios from 'axios';
import { Apipaths } from './apipaths/apipaths';



@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor() { }

  async submitSeekerApplication(applications: any) {
    try{
      await axios.post(Apipaths.submitApplication, applications)
        .then((response) => {
          console.log(response);
        });
    }
    catch (error) {
      console.error(error);
    }
  }

  async getApplicationList(job_number: number, status: string) {
    let applicationList: any = {};
    try {
        const response = await axios.get('https://localhost:7213/api/Application/GetApplicationList', {
            params: { JobID: job_number, status: status }
        });
        applicationList = response.data;
    } catch (error) {
        console.error("Error fetching application list:", error);
    }
    return applicationList;
}


}


