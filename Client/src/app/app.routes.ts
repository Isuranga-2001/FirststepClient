import { Routes } from '@angular/router';
import { ManageRolesComponent } from './CompanyPortal/CompanyAdmin/manage-roles/manage-roles.component';
import { SubordinateAccountPopupComponent } from './CompanyPortal/CompanyAdmin/subordinate-account-popup/subordinate-account-popup.component';
import { AddrolesPopupComponent } from './CompanyPortal/CompanyAdmin/addroles-popup/addroles-popup.component';


export const routes: Routes = [
    {path:'manageRoles',component:ManageRolesComponent},
    {path:'addRole',component:SubordinateAccountPopupComponent},
    {path:'AddRole',component:AddrolesPopupComponent}
]