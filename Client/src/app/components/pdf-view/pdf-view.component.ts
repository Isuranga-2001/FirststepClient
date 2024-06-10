import { Component, Inject, OnInit } from '@angular/core';
import { PdfViewerModule } from '@syncfusion/ej2-angular-pdfviewer';
import { MatDialogModule, MatDialogContent, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DocumentService } from '../../../services/document.service';
import { DialogData } from '../company-application/company-application.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-pdf-view',
  standalone: true,
  imports: [PdfViewerModule, MatDialogModule, MatDialogContent,MatIconModule,MatButtonModule], 
  templateUrl: './pdf-view.component.html',
  styleUrl: './pdf-view.component.css'
})
export class PdfViewComponent implements OnInit{ 
 
  public documentName: string = this.data.documentName;
  public document: any;
  public resource: string = "https://cdn.syncfusion.com/ej2/23.1.43/dist/ej2-pdfviewer-lib";

  constructor(private documentService:DocumentService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData)
  { }
  
  ngOnInit(): void {
  //call get blob url
    this.documentService.getBlobUrl(this.documentName).subscribe((data) => {
      this.document = data;
    });
    
}

}
