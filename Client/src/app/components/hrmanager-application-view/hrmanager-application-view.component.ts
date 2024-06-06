import { Component, Input, OnInit,Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatLabel } from '@angular/material/form-field';
//import { SeekerService } from '../../../services/seeker.service';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ApplicationService } from '../../../services/application.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RevisionService } from '../../../services/revision.service';
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';

interface Revision {
  revision_id: number;
  comment: string;
  status: string;
  created_date: string;
  employee_id: number;
  name: string;
  role: string;

}

interface ApplicationViewDto {
  application_Id: number;
  submitted_date: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: number;
  bio: string;
  cVurl: string;
  profile_picture: string;
  linkedin: string;
  current_status: string;
  is_evaluated: boolean;
  last_revision: Revision;
  seeker_id: number;
}

@Component({
  selector: 'app-hrmanager-application-view',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatLabel, MatToolbar, MatButton, CommonModule, FormsModule, MatDialogModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatInputModule, MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './hrmanager-application-view.component.html',
  styleUrls: ['./hrmanager-application-view.component.css'],
})
export class HrmanagerApplicationViewComponent implements OnInit {
  @Input() showComments: boolean = true; // Accepts showComments as input
  @Input() applicationId: number = 5; // Default value for testing
  applicationDetails: ApplicationViewDto = {} as ApplicationViewDto;
  loading: boolean = true;
  error: string | null = null;
  newComment: string = '';
  userRole: string | null = null;
  userName: string | null = null;
  isEditingComment: boolean = false;
currentRevisionId: number | null = null;


  constructor(private applicationService: ApplicationService,private authService: AuthService,    public dialog: MatDialog ,private revisionService: RevisionService
  ) {}

  async ngOnInit() {
    this.userRole = 'hra'; // For testing
    this.userName = 'Nethma Karunathilaka'; // For testing
    // this.userRole = this.authService.getRole();
    // this.userName = this.authService.getName();
    await this.fetchApplicationDetails();
  }

  async fetchApplicationDetails() {
    try {
      this.applicationDetails = await this.applicationService.getApplicationDetails(this.applicationId);
    } catch (error) {
      this.error = 'Error fetching application details';
    } finally {
      this.loading = false;
    }
  }


  async addComment() {
    if (this.isEditingComment) {
      // If editing a comment, call the update method
      await this.updateComment();
    } else {
    if (this.newComment.trim() || this.applicationDetails.is_evaluated) {
      try {
        const status = this.applicationDetails.is_evaluated ? this.applicationDetails.last_revision.status : 'Not Evaluated';
        const employeeId =42 ;
        // const employeeId = Number(this.authService.getUserId()); // Ensure this is correctly fetched from AuthService
        await this.revisionService.addRevision(this.applicationId, this.newComment, status, employeeId, this.userName!, this.userRole!);
        await this.fetchApplicationDetails();
        this.newComment = '';
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  }
  }

  async updateComment() {
    if (this.currentRevisionId !== null) {
      try {
        const updatedRevision = {
          revision_id: this.currentRevisionId,
          comment: this.newComment,
          status: this.applicationDetails.last_revision.status,
          application_id: this.applicationDetails.application_Id, // Ensure this is included
          employee_id: this.applicationDetails.last_revision.employee_id, 
          //application_id: this.applicationDetails.application_Id, 
          // employee_id: 42, 
          // employee_id: Number(this.authService.getUserId()), // Ensure this is correctly fetched from AuthService
          date: new Date()
        };

        console.log('Payload being sent:', updatedRevision); // Add this line to debug

  
        await this.revisionService.updateRevision(updatedRevision);
        await this.fetchApplicationDetails();
        this.newComment = '';
        this.isEditingComment = false;
        this.currentRevisionId = null;
      } catch (error) {
        console.error('Error updating comment:', error);
      }
    }
  }
  
  
  // Call this method when entering edit mode
editComment(revisionId: number, comment: string) {
  this.currentRevisionId = revisionId;
  this.newComment = comment;
  this.isEditingComment = true;
}



async changeDecision(newStatus: string) {
  if (newStatus === 'Rejected' && !this.newComment.trim()) {
    alert('Comment is mandatory when rejecting an application');
    return;
  }

  if (newStatus === 'Pass' && this.userRole !== 'hra') {
    return;
  }

  if (newStatus === 'Accepted') {
    await this.showAcceptDialog(newStatus);
  } else {
    await this.showRejectDialog(newStatus);
  }
}

async showAcceptDialog(newStatus: string) {
  const dialogRef = this.dialog.open(AcceptDialog, {
    width: '300px',
    data: { message: 'Application was Accepted' }
  });

  dialogRef.afterClosed().subscribe(async result => {
    if (result) {
      try {
        const employeeId = 42;
        await this.revisionService.addRevision(this.applicationId, this.newComment, newStatus, employeeId, this.userName!, this.userRole!);
        await this.fetchApplicationDetails();
        alert('Application was Accepted');
      } catch (error) {
        console.error(`Error changing decision to ${newStatus}:`, error);
      }
    }
  });
}

async showRejectDialog(newStatus: string) {
  const dialogRef = this.dialog.open(RejectDialog, {
    width: '300px',
    data: { message: 'Are you sure you want to reject this application?' }
  });

  dialogRef.afterClosed().subscribe(async result => {
    if (result) {
      try {
        const employeeId = 42;
        await this.revisionService.addRevision(this.applicationId, this.newComment, newStatus, employeeId, this.userName!, this.userRole!);
        await this.fetchApplicationDetails();
        alert('Application was Rejected');
      } catch (error) {
        console.error(`Error changing decision to ${newStatus}:`, error);
      }
    }
  });
}

async viewCommentHistory() {
  const dialogRef = this.dialog.open(CommentHistoryDialog, {
    width: '800px',
    data: await this.revisionService.getRevisionHistory(this.applicationId)
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('Comment History dialog was closed');
  });
}

getRoleDisplayName(role: string): string {
  switch (role) {
    case 'hra':
      return 'HR Assistant';
    case 'ca':
      return 'Company Admin';
    case 'hrm':
      return 'HR Manager';
    default:
      return role; 
  }
}
}

Component({
  selector: 'accept-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './accept-dialog.html',
})
export class AcceptDialog {
constructor(
  public dialogRef: MatDialogRef<AcceptDialog>,
  @Inject(MAT_DIALOG_DATA) public data: any
) {}

onNoClick(): void {
  this.dialogRef.close();
}

onYesClick(): void {
  this.dialogRef.close(true);
}
}

@Component({
  selector: 'reject-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './reject-dialog.html',
})
export class RejectDialog {
constructor(
  public dialogRef: MatDialogRef<RejectDialog>,
  @Inject(MAT_DIALOG_DATA) public data: any
) {}

onNoClick(): void {
  this.dialogRef.close();
}

onYesClick(): void {
  this.dialogRef.close(true);
}
}

@Component({
  selector: 'comment-history-dialog',
  standalone: true,
  imports: [
    MatTableModule, 
    MatPaginatorModule, 
    MatSortModule, 
    MatIconModule, 
    MatButtonModule, 
    MatDialogActions, 
    MatDialogClose, 
    MatDialogTitle, 
    MatDialogContent
  ],
  templateUrl: './comment-history-dialog.html',
})
export class CommentHistoryDialog {
  constructor(
    public dialogRef: MatDialogRef<CommentHistoryDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog
  ) {}

  openEditDialog(element: any): void {
    const dialogRef = this.dialog.open(EditCommentDialog, {
      width: '300px',
      data: { ...element }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle successful update if needed
      }
    });
  }
}

@Component({
  selector: 'edit-comment-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './edit-comment-dialog.html',
})
export class EditCommentDialog {
  constructor(
    public dialogRef: MatDialogRef<EditCommentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private revisionService: RevisionService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  async onYesClick(): Promise<void> {
    try {
      const updatedRevision = {
        revision_id: this.data.revision_id,
        comment: this.data.comment,
        status: this.data.status,
        application_id: this.data.application_id,
        employee_id: this.data.employee_id,
        date: new Date()
      };

      await this.revisionService.updateRevision(updatedRevision);
      this.dialogRef.close(true);
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  }
}
