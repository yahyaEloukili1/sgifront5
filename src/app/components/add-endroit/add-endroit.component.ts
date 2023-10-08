import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MyServiceService } from 'src/app/services/my-service.service';

@Component({
  selector: 'app-add-endroit',
  templateUrl: './add-endroit.component.html',
  styleUrls: ['./add-endroit.component.css']
})
export class AddEndroitComponent implements OnInit {

  
  ajoute = true
  districts
  annexes
  categories
  constructor(private pdiService: MyServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getReources()
  }
  getReources(){
    this.pdiService.getResourceAll('categories').subscribe(data=>{
      this.categories = data['_embedded'].categories
      console.log(this.categories)
  
  })
  this.pdiService.getResourceAll('annexes').subscribe(data=>{
    this.annexes = data['_embedded'].annexes
    console.log(this.annexes)

})
this.pdiService.getResourceAll('districts').subscribe(data=>{
  this.districts = data['_embedded'].districts
  console.log(this.annexes)

})
  } 
   onRowClickDistrict(e){
    // this.pdiService.getOneResource(this.pdiService.host+"/annexes/search/findByDistrictId?id="+e).subscribe(data=>{
    //   this.annexes = data['_embedded'].annexes
     
    // })
  }
  onSaveAffectation(f:NgForm){
    this.ajoute = false
   
    this.pdiService.getOneResourceById("annexes",f.value.annexe).subscribe(data=>{
      f.value.annexeName = data.designation
      this.pdiService.getOneResourceById("districts",f.value.district).subscribe(data=>{
        f.value.districtName = data.designation

        this.pdiService.getOneResourceById("categories",f.value.categorie).subscribe(data=>{
          f.value.categorieName = data.designation
       






          f.value.fiche = f.value.categorie + " للمستفيدين من عملية الإفطار التابعة" + f.value.annexe
          f.value.district = `${this.pdiService.host}/districts/${f.value.district}`
          f.value.categorie = `${this.pdiService.host}/categories/${f.value.categorie}`
          f.value.annexe = `${this.pdiService.host}/annexes/${f.value.annexe}`
          console.log(f.value.annexeName,"jej")
          console.log(f.value.districtName,"jej")
//        if(!f.value.designation){
//  alert(' المرجو ادخال المعلومات'  )
//        }
    
//        if(!f.value.adress){
//  alert(' المرجو ادخال المعلومات'  )
//        }
//        if(!f.value.x){
//         alert(' المرجو ادخال المعلومات'  )
//               }
//               if(!f.value.y){
//                 alert(' المرجو ادخال المعلومات'  )
//                       }
                    
//        if(f.value.district ==  `${this.pdiService.host}/districts/`){
//  alert(' المرجو ادخال المعلومات'  )
//        }
//        if(f.value.categorie ==  `${this.pdiService.host}/categories/`){
//  alert(' المرجو ادخال المعلومات'  )
//        }
//        if(f.value.annexe ==  `${this.pdiService.host}/annexes/`){
//  alert(' المرجو ادخال المعلومات'  )
//        }
if (
  !f.value.designation ||
  !f.value.adress ||
  !f.value.x ||
  !f.value.y ||
  f.value.district === `${this.pdiService.host}/districts/` ||
  f.value.categorie === `${this.pdiService.host}/categories/` ||
  f.value.annexe === `${this.pdiService.host}/annexes/`
) {
  alert(' المرجو ادخال المعلومات' );
}

      
       else{
       if(f.value.x && f.value.y && f.value.adress && f.value.designation ){
        this.pdiService.addResource("endroits",f.value).subscribe(data=>{
          this.ajoute =true
          alert('لقد تمت إضافة الموقع بنجاح')
           f.reset()
               },err=>{
                 console.log(err)
               })
       }
      
      

              // this.pdiService.addResource("benificiaireArchives",f.value).subscribe(data=>{
              //   this.ajoute =true
              //    f.reset()
              //        },err=>{
              //          console.log(err)
              //        })
       }
        
        })

        
        
      }
      
      
      
      )


   
    })

  
}
  gotoList(){
    this.router.navigateByUrl('sgi/endroits');
  }
  reset(f:NgForm){
f.reset()
  }


}
