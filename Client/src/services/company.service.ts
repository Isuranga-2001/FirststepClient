import { Injectable } from '@angular/core';
import { Apipaths } from './apipaths/apipaths';

import axios from 'axios';
interface Company {
  company_id: number;
  company_name: string;
  company_email: string;
  company_website: string;
  company_phone_number: number;
  company_logo: string;
  company_description: string;
  company_city: string;
  company_province: string;
  company_business_scale: string;
}
interface CompanyList {
  company_id: number;
  company_name: string;
  verification_status: boolean;
  verified_system_admin_id: number;
}
interface CompanyApplication {
  company_id: number;
  company_name: string;
  verification_status: boolean;
  company_email: string;
  company_website: string;
  company_phone_number: number;
  business_reg_certificate: string;
  certificate_of_incorporation: string;
  comment: string;
  verified_system_admin_id: number;
}
interface EvaluatedCompanyDetails {
  company_id: number;
  verification_status: boolean;
  comment: string | null;
  company_registered_date: Date;
  verified_system_admin_id: number;
}
@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor() {}

  async getCompanyDetails(companyId: number) {
    let companyDetails: any = {};

    await axios
      .get(Apipaths.getCompanyDetails + companyId)
      .then(function (response) {
        try {
          companyDetails = response.data;
          console.log();
        } catch (error) {
          console.log('No company details found for the given id');
        }
      })
      .catch((error) => {
      });

    console.log(companyDetails);
    return companyDetails;
  }
  async getCompanyApplicationById(companyId: number) {
    let companyApplication: any = {};
    console.log('from service', companyId);
    try {
      await axios
        .get(Apipaths.getCompanyApplicationById + companyId)
        .then(function (response) {
          try {
            companyApplication = response.data;
          } catch (error) {
            console.log('No company application found for the given id');
          }
        })
        .catch((error) => {
        });
      return companyApplication;
    } catch (error) {
      console.log('No company application found for the given id');
    }
  }

  async updateCompanyDetails(company: Company, company_id: number) {
    company.company_id = company_id; // should be chnaged
    console.log('from service', company);
    await axios
      .put(Apipaths.updateCompanyDetails + company_id, company) // tem slotion
      .then((response) => {
      })
      .catch((error) => {
      });
  }
  async updateCompanyApplicationById(
    evaluatedCompanyDetails: EvaluatedCompanyDetails,
    companyId: number
  ) {
    evaluatedCompanyDetails.company_id = companyId; // should be changed
    await axios
      .put(
        Apipaths.updateCompanyApplicationById + companyId,
        evaluatedCompanyDetails
      )
      .then((response) => {
      })
      .catch((error) => {
      });
  }
  async deleteAccount(companyId: number) {
    let response: any;

    await axios
      .delete(Apipaths.deleteCompany + companyId)
      .then((res) => {
        response = res.data;
      })
      .catch((error) => {
      });

    return response;
  }

  async getAllCompanyList() {
    let companyList: CompanyList[] = [];

    try {
      const response = await axios.get(Apipaths.getAllComapanyList);
      companyList = response.data;
      console.log('company list was received');
    } catch (error) {
    }

    return companyList;
  }

  /*
  async getCompnayRegState(id: number) {
    let cmpData: any;

    this.http.get('https://localhost:7213/api/Company/GetCompanyById/'+id)
      .subscribe(data => {
        // Handle successful response with the data
        //console.log(data);
      }, error => {
        // Handle error scenario
        console.error(error);
      });

    return cmpData;
  }
  */
  //Get company Registration state details---End
}
