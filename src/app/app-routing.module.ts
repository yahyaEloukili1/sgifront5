import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DistritsComponent } from './components/distrits/distrits.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';
import { AddDistrictComponent } from './components/add-district/add-district.component';
import { EditDistrictComponent } from './components/edit-district/edit-district.component';
import { AnnexesComponent } from './components/annexes/annexes.component';
import { AddAnnexeComponent } from './components/add-annexe/add-annexe.component';
import { EditAnnexeComponent } from './components/edit-annexe/edit-annexe.component';
import { CategoriesComponent } from './components/categories/categories.component';

import { AddCategorieComponent } from './components/add-categorie/add-categorie.component';
import { AddEndroitComponent } from './components/add-endroit/add-endroit.component';
import { EditCategorieComponent } from './components/edit-categorie/edit-categorie.component';
import { EditEndroitComponent } from './components/edit-endroit/edit-endroit.component';
import { EndroitsComponent } from './components/Endroits/endroits.component';
const routes: Routes = [
  {path: "sgi/login",component: LoginComponent},
  {path: "sgi/districts",component: DistritsComponent,canActivate: [AuthGuard]},
  {path: "sgi/categories",component: CategoriesComponent,canActivate: [AuthGuard]},
  {path: "sgi/endroits",component: EndroitsComponent,canActivate: [AuthGuard]},
  {path: "sgi/annexes",component: AnnexesComponent,canActivate: [AuthGuard]},
  {path: "sgi/addDistict",component: AddDistrictComponent,canActivate: [AuthGuard]},
  {path: "sgi/addCategorie",component: AddCategorieComponent,canActivate: [AuthGuard]},
  {path: "sgi/addEndroit",component: AddEndroitComponent,canActivate: [AuthGuard]},
  {path: "sgi/addAnnexe",component: AddAnnexeComponent,canActivate: [AuthGuard]},
  {path: "sgi/editAnnexe/:id",component: EditAnnexeComponent,canActivate: [AuthGuard]},
  {path: "sgi/editCategorie/:id",component: EditCategorieComponent,canActivate: [AuthGuard]},
  {path: "sgi/editEndroit/:id",component: EditEndroitComponent,canActivate: [AuthGuard]},
  {path: "sgi/editDistrict/:id",component: EditDistrictComponent,canActivate: [AuthGuard]},
{path: "sgi", redirectTo : "sgi/districts", pathMatch: 'full'},
{path: "", redirectTo : "sgi/districts", pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
