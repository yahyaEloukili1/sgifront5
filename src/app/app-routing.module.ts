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
import { BenificiaresComponent } from './components/benificiares/benificiares.component';
import { DoublonsComponent } from './components/doublons/doublons.component';
import { Doublons2Component } from './components/doublons2/doublons2.component';
import { AddCategorieComponent } from './components/add-categorie/add-categorie.component';
import { AddBenificiareComponent } from './components/add-benificiare/add-benificiare.component';
import { EditCategorieComponent } from './components/edit-categorie/edit-categorie.component';
import { EditBenificiareComponent } from './components/edit-benificiare/edit-benificiare.component';
import { Benificiares2Component } from './components/benificiares2/benificiares2.component';
import { FichesComponent } from './components/fiches/fiches.component';
import { AddFicheComponent } from './components/add-fiche/add-fiche.component';
import { EditFicheComponent } from './components/edit-fiche/edit-fiche.component';
const routes: Routes = [
  {path: "sgi/login",component: LoginComponent},
  {path: "sgi/districts",component: DistritsComponent,canActivate: [AuthGuard]},
  {path: "sgi/categories",component: CategoriesComponent,canActivate: [AuthGuard]},
  {path: "sgi/fiches",component: FichesComponent,canActivate: [AuthGuard]},
  {path: "sgi/benificiaires",component: BenificiaresComponent,canActivate: [AuthGuard]},
  {path: "sgi/benificiaires2",component: Benificiares2Component,canActivate: [AuthGuard]},
  {path: "sgi/doublons",component: DoublonsComponent,canActivate: [AuthGuard]},
  {path: "sgi/doublons2",component: Doublons2Component,canActivate: [AuthGuard]},
  {path: "sgi/annexes",component: AnnexesComponent,canActivate: [AuthGuard]},
  {path: "sgi/addDistict",component: AddDistrictComponent,canActivate: [AuthGuard]},
  {path: "sgi/addCategorie",component: AddCategorieComponent,canActivate: [AuthGuard]},
  {path: "sgi/addFiche",component: AddFicheComponent,canActivate: [AuthGuard]},
  {path: "sgi/addBenificiare",component: AddBenificiareComponent,canActivate: [AuthGuard]},
  {path: "sgi/addAnnexe",component: AddAnnexeComponent,canActivate: [AuthGuard]},
  {path: "sgi/editAnnexe/:id",component: EditAnnexeComponent,canActivate: [AuthGuard]},
  {path: "sgi/editCategorie/:id",component: EditCategorieComponent,canActivate: [AuthGuard]},
  {path: "sgi/editBenificiaire/:id",component: EditBenificiareComponent,canActivate: [AuthGuard]},
  {path: "sgi/editDistrict/:id",component: EditDistrictComponent,canActivate: [AuthGuard]},
  {path: "sgi/editFiche/:id",component: EditFicheComponent,canActivate: [AuthGuard]},
 
{path: "sgi", redirectTo : "sgi/districts", pathMatch: 'full'},
{path: "", redirectTo : "sgi/districts", pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
