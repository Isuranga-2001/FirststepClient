import { Routes } from '@angular/router';

import { SeekerHomePageComponent } from '../components/seeker-home-page/seeker-home-page.component';
import { SavedAdvertisementListComponent } from '../components/saved-advertisement-list/saved-advertisement-list.component';
import { ApplicationAdvertisementListComponent } from '../components/application-advertisement-list/application-advertisement-list.component';
import { CompanyProfileComponent } from '../components/company-profile/company-profile.component';
import { SeekerEditProfileComponent } from '../components/seeker-edit-profile/seeker-edit-profile.component';
import { SeekerApplicationFormComponent } from '../components/seeker-application-form/seeker-application-form.component';
import { SeekerApplicationFormConfirmComponent } from '../components/seeker-application-form-confirm/seeker-application-form-confirm.component';
import { SeekerApplicationStatusComponent } from '../components/seeker-application-status/seeker-application-status.component';
import { ImageViewerComponent } from '../components/image-viewer/image-viewer.component';
import { PdfViewComponent } from '../components/pdf-view/pdf-view.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: SeekerHomePageComponent },
  { path: 'saved', component: SavedAdvertisementListComponent },
  { path: 'applied', component: ApplicationAdvertisementListComponent },
  { path: 'home/company-profile', component: CompanyProfileComponent },
  { path: 'edit-profile', component: SeekerEditProfileComponent },

  // need to be verified
  { path: 'home/applicationForm', component: SeekerApplicationFormComponent },
  { path: 'home/applicationForm/applicationFormconfirm', component:SeekerApplicationFormConfirmComponent  },
  { path: 'applicationReview', component:SeekerApplicationStatusComponent },

  //pdf viewer only for testing
  { path: 'pdf-view', component: PdfViewComponent},
  { path: 'image-view', component: ImageViewerComponent},
];