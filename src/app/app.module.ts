import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { DistritsComponent } from './components/distrits/distrits.component';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';
import { AddDistrictComponent } from './components/add-district/add-district.component';
import { EditDistrictComponent } from './components/edit-district/edit-district.component';
import { AnnexesComponent } from './components/annexes/annexes.component';
import { EditAnnexeComponent } from './components/edit-annexe/edit-annexe.component';
import { AddAnnexeComponent } from './components/add-annexe/add-annexe.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AddCategorieComponent } from './components/add-categorie/add-categorie.component';
import { EditCategorieComponent } from './components/edit-categorie/edit-categorie.component';

import { AddEndroitComponent } from './components/add-endroit/add-endroit.component';
import { EditEndroitComponent } from './components/edit-endroit/edit-endroit.component';
import { EndroitsComponent } from './components/Endroits/endroits.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DistritsComponent,
    AddDistrictComponent,
    EditDistrictComponent,
    AnnexesComponent,
    EditAnnexeComponent,
    AddAnnexeComponent,
    CategoriesComponent,
    AddCategorieComponent,
    EditCategorieComponent,

    AddEndroitComponent,
    EditEndroitComponent,
    EndroitsComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthGuard,{
    provide : HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
