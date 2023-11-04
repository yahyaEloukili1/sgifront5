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
import { AdminGuardGuard } from './admin-guard.guard';
const routes: Routes = [
  {path: "sgi/login",component: LoginComponent},
  {path: "sgi/districts",component: DistritsComponent,canActivate: [AdminGuardGuard]},
  {path: "sgi/categories",component: CategoriesComponent,canActivate: [AdminGuardGuard]},
  {path: "sgi/endroits",component: EndroitsComponent,canActivate: [AuthGuard]},
  {path: "sgi/annexes",component: AnnexesComponent,canActivate: [AdminGuardGuard]},
  {path: "sgi/addDistict",component: AddDistrictComponent,canActivate: [AdminGuardGuard]},
  {path: "sgi/addCategorie",component: AddCategorieComponent,canActivate: [AdminGuardGuard]},
  {path: "sgi/addEndroit",component: AddEndroitComponent,canActivate: [AdminGuardGuard]},
  {path: "sgi/addAnnexe",component: AddAnnexeComponent,canActivate: [AdminGuardGuard]},
  {path: "sgi/editAnnexe/:id",component: EditAnnexeComponent,canActivate: [AdminGuardGuard]},
  {path: "sgi/editCategorie/:id",component: EditCategorieComponent,canActivate: [AdminGuardGuard]},
  {path: "sgi/editEndroit/:id",component: EditEndroitComponent,canActivate: [AdminGuardGuard]},
  {path: "sgi/editDistrict/:id",component: EditDistrictComponent,canActivate: [AdminGuardGuard]},
{path: "sgi", redirectTo : "sgi/districts", pathMatch: 'full'},
{path: "", redirectTo : "sgi/districts", pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
