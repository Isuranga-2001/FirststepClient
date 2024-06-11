import { Component, Inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { EmployeeService } from '../../../services/employee.service';


interface Employee {
  email: string;
  first_name: string;
  last_name: string;
  user_type: string;
}

@Component({
  selector: 'app-edit-role',
  standalone: true,
  imports: [
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FileUploadComponent,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FileUploadComponent,
    FormsModule,
    MatDialogModule,
    MatDialogClose,

  ],
  templateUrl: './edit-role.component.html',
  styleUrl: './edit-role.component.css',
})
export class EditRoleComponent implements OnInit {
  employeeDetails: Employee = {} as Employee;
  selectedRole: string = 'HRM';

  constructor(
    //dialogref
    public dialogRef: MatDialogRef<EditRoleComponent>,
    private _snackBar: MatSnackBar,  
    private employeeService: EmployeeService, @Inject(MAT_DIALOG_DATA)public data:any) {}
  user_id: number = this.data.id;
  
  async ngOnInit() {
    this.fetchEmployeeDetails(); 
  }
  
  async fetchEmployeeDetails() {
    this.employeeDetails = await this.employeeService.getEmployeeDetails(this.user_id);
  }

  async onSubmit() {
    if (
      !this.employeeDetails.first_name ||
      !this.employeeDetails.last_name ||
      !this.employeeDetails.email 
    ) {
      this._snackBar
        .open('Please fill all the fields', '', {
          panelClass: ['app-notification-error'],
        })
        ._dismissAfter(3000);
     
    } else {
      this.onApply();
    }
  }

  async onApply() {
   await this.employeeService.editemployee(this.employeeDetails, this.user_id);
   //open a snackbar
   this._snackBar.open('Role Updated Successfully', '', {
      duration: 2000,
    });
    this.dialogRef.close(true);
  }
}
