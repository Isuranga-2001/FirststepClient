import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import { FileUploadComponent } from "../../shared/file-upload/file-upload.component";
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Employee } from '../../../../models/employee';


@Component({
    selector: 'app-addroles-popup',
    standalone: true, 
    templateUrl: './addroles-popup.component.html',
    styleUrl: './addroles-popup.component.css',
    imports: [MatIconModule, MatInputModule, MatFormFieldModule, MatRadioModule, MatButtonModule, FileUploadComponent, FormsModule, HttpClientModule]
})
export class AddrolesPopupComponent {
    [x: string]: any;
    emp_role: string = "Non";

    constructor(private http: HttpClient) { 

    }
 
    onRoleCreate(employee: Employee){
        employee.company_id = 8; // sample company_id
        console.log(employee);
        this.http.post('https://localhost:7213/api/Employee/AddNewHRManager', employee).subscribe((res:any) => {});

        /*
        if (this.emp_role == "HRM") {
            this.http.post('https://localhost:7213/api/Employee/AddNewHRManager', employee).subscribe((res:any) => {});
        }
        else if (this.emp_role == "HRA") {
            this.http.post('https://localhost:7213/api/Employee/AddNewHRAssistant', employee).subscribe((res:any) => {});
        }
        else {
            this['dialog'].open("Invalid role", "OK");

            throw new Error("Invalid role");
        }*/

        
    }
}


