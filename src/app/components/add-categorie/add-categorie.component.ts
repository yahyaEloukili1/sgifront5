import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MyServiceService } from 'src/app/services/my-service.service';

@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.css']
})
export class AddCategorieComponent implements OnInit {
  ajoute = true
  addedSuccessfully = false
  constructor(private pdiService: MyServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  onSaveAffectation(f:NgForm){
    this.ajoute = false
 if(!f.value.designation){
  alert(' المرجو ادخال المعلومات'  )
 }

 else{

  this.pdiService.addResource("categories",f.value).subscribe(data=>{
   this.ajoute =true
   this.addedSuccessfully = true
   setTimeout(() => {
    this.addedSuccessfully = false;
  }, 2500); // 3000 milliseconds = 3 seconds

  
    f.reset()
        },err=>{
          console.log(err)
        })
 }
 
}
  gotoList(){
    this.router.navigateByUrl('sgi/categories');
  }
  reset(f:NgForm){
f.reset()

  }
}