import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyServiceService } from 'src/app/services/my-service.service';

       
import * as L from 'leaflet';

@Component({
  selector: 'app-endroits',
  templateUrl: './endroits.component.html',
  styleUrls: ['./endroits.component.css']
})
export class EndroitsComponent implements OnInit {
  designation
selectedAnnexe =0
annexes
categories
districts
  benificiaires
  selectedCategorie =0
  selectedDistrict=0
  annexeActuel
  constructor(private rnpService: MyServiceService,private router: Router) { }
  private map;

  private initMap(): void {
    // this.map = L.map('map', {
    //   center: [ 27.1444500,-13.1995000 ],
    //   zoom: 13
    // });
    this.map = L.map('map').setView([ 27.1444500,-13.1995000, -0.09], 13);
    // const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   maxZoom: 18,
    //   minZoom: 3,
    //   attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    // });
    const tiles =  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(this.map);
    tiles.addTo(this.map);
  }
  ngAfterViewInit(): void { 
this.initMap()
  }
  
  ngOnInit(): void {
   this.getReources()
   this.getAnnexes()
   this.getCategories()
   this.getDistricts()


}
async oupload(){
  if((!this.selectedAnnexe|| this.selectedAnnexe==0) && (!this.selectedCategorie|| this.selectedCategorie==0)&&(!this.selectedDistrict|| this.selectedDistrict==0)&&!this.designation)
  {console.log(this.rnpService.uploadFileWithData("لائحة المواقع",this.benificiaires))

}
  else if((this.selectedAnnexe && this.selectedAnnexe!==0)&& (!this.selectedCategorie|| this.selectedCategorie==0)&&(!this.selectedDistrict|| this.selectedDistrict==0)) {
    {
      

      const annexeData = await this.rnpService.getOneResourceById("annexes", this.selectedAnnexe).toPromise();
      this.rnpService.uploadFileWithData(`مواقع الملحقة الإدارية ${annexeData.designation}`,this.benificiaires)
    }
  }
  else if((this.selectedCategorie && this.selectedCategorie!==0)&& (!this.selectedAnnexe|| this.selectedAnnexe==0)&&(!this.selectedDistrict|| this.selectedDistrict==0)) {
    {
     
      const categorieData = await this.rnpService.getOneResourceById("categories", this.selectedCategorie).toPromise();
      this.rnpService.uploadFileWithData(`مواقع فئة ${categorieData.designation}`,this.benificiaires)
    }
  }
  else if((this.selectedDistrict && this.selectedDistrict!==0)&& (!this.selectedCategorie|| this.selectedCategorie==0)&&(!this.selectedAnnexe|| this.selectedAnnexe==0)) {
    {
      const districtData = await this.rnpService.getOneResourceById("districts", this.selectedDistrict).toPromise();
      this.rnpService.uploadFileWithData(`مواقع دائرة ${districtData.designation}`,this.benificiaires)
    }
  }
  else if((this.selectedAnnexe && this.selectedAnnexe!==0)&& (this.selectedCategorie&& this.selectedCategorie!=0)&&(!this.selectedDistrict|| this.selectedDistrict==0)) {
    {
      // this.rnpService.uploadFileWithData("selectedAnnexe && selectedcategorie",this.benificiaires)
      const annexeData = await this.rnpService.getOneResourceById("annexes", this.selectedAnnexe).toPromise();
      const categorieData = await this.rnpService.getOneResourceById("categories", this.selectedCategorie).toPromise();
      this.rnpService.uploadFileWithData(`مواقع فئة ${categorieData.designation} وملحقة ${annexeData.designation}`,this.benificiaires)
   
    }
  }
  else if((this.selectedAnnexe && this.selectedAnnexe!==0)&& (this.selectedDistrict&& this.selectedDistrict!=0)&&(!this.selectedCategorie|| this.selectedCategorie==0)) {
    {
      const annexeData = await this.rnpService.getOneResourceById("annexes", this.selectedAnnexe).toPromise();
      const districtData = await this.rnpService.getOneResourceById("districts", this.selectedDistrict).toPromise();
      this.rnpService.uploadFileWithData(` مواقع دائرة ${districtData.designation}  وملحقة ${annexeData.designation}`,this.benificiaires)
    }
  }
  else if((this.selectedDistrict && this.selectedDistrict!==0)&& (this.selectedCategorie&& this.selectedCategorie!=0)&&(!this.selectedAnnexe|| this.selectedAnnexe==0)) {
    {
      const categorieData = await this.rnpService.getOneResourceById("categories", this.selectedCategorie).toPromise();
      const districtData = await this.rnpService.getOneResourceById("districts", this.selectedDistrict).toPromise();
      this.rnpService.uploadFileWithData(` مواقع دائرة ${districtData.designation}  وفئة ${categorieData.designation}`,this.benificiaires)
    }
  }
  else if((this.selectedAnnexe&& this.selectedAnnexe!==0) && (this.selectedCategorie|| this.selectedCategorie!==0)&&(this.selectedDistrict|| this.selectedDistrict!==0))
  {
    const categorieData = await this.rnpService.getOneResourceById("categories", this.selectedCategorie).toPromise();
      const districtData = await this.rnpService.getOneResourceById("districts", this.selectedDistrict).toPromise();
      const annexeData = await this.rnpService.getOneResourceById("annexes", this.selectedAnnexe).toPromise();
      this.rnpService.uploadFileWithData(` مواقع دائرة ${districtData.designation}  وملحقة ${annexeData.designation} وفئة ${categorieData.designation}`,this.benificiaires)
  }
  else if(this.designation){
    this.rnpService.getResourceAll2('endroits/search/findByDesignationContainsIgnoreCase?designation='+this.designation).subscribe(data=>{
      this.benificiaires = data['_embedded'].endroits
      this.rnpService.uploadFileWithData(` مواقع بإسم ${this.designation}`,this.benificiaires)
    })
  }
 
}
getAnnexes(){
  this.rnpService.getResourceAll('annexes').subscribe(data=>{
    this.annexes = data['_embedded'].annexes
  

})
}
getCategories(){
  this.rnpService.getResourceAll('categories').subscribe(data=>{
    this.categories = data['_embedded'].categories
    console.log(this.categories,"78787")
  

})
}
getDistricts(){
  this.rnpService.getResourceAll('districts').subscribe(data=>{
    this.districts = data['_embedded'].districts
    console.log(this.districts,"78787")
  

})
}
onRowClickAnnexe(e) {
  this.selectedAnnexe = e;
  
  // Convert 0 to undefined
  let a,c,d;
  // Convert 0 to undefined
 a= this.selectedAnnexe == 0 ? undefined : this.selectedAnnexe;
  c= this.selectedCategorie == 0 ? undefined : this.selectedCategorie;
 d = this.selectedDistrict == 0 ? undefined : this.selectedDistrict;

  let url = `${this.rnpService.host}/endroits/search/findByDistrictAndAnnexeAndCategorieId?`;
  
  if (d !== undefined) {
    url += `districtId=${d}&`;
  }

  if (a !== undefined) {
    url += `annexeId=${a}&`;
  }

  if (c !== undefined) {
    url += `categorieId=${c}`;
  }

  this.rnpService.getOneResource(url).subscribe(data => {
    this.benificiaires = data['_embedded'].endroits;
    this.designation="";
    this.marq2(this.benificiaires);
  });
}

onRowClickDistrict(e){
  this.selectedAnnexe = 0
  this.selectedCategorie = 0
this.selectedDistrict = e 
if(this.selectedDistrict!=0){
  this.rnpService.getOneResource(this.rnpService.host+"/annexes/search/findByDistrictId?id="+this.selectedDistrict).subscribe(data=>{
    this.annexes = data['_embedded'].annexes
   
  })
  this.rnpService.getOneResource(this.rnpService.host+"/endroits/search/findByDistrictId?id="+this.selectedDistrict).subscribe(data=>{
    this.benificiaires = data['_embedded'].endroits
    this.marq2(this.benificiaires)
    console.log("fhis")
    this.designation=""
     })
}else{
  
  this.getAnnexes()
  this.getReources()

}
 //Convert 0 to undefined
 
}
onRowClickCategorie(e){
  let a;
  if(this.getConnectedUser()=="sgi"){
     a= this.selectedAnnexe == 0 ? undefined : this.selectedAnnexe;
    }
    else if(this.getConnectedUser().startsWith("aal") && this.getConnectedUser()!="aal1 almarsa" && this.getConnectedUser()!="aal2 almarsa"){
       a = parseInt(this.getConnectedUser().charAt(3))
    } else if(this.getConnectedUser()=="aal1 almarsa"){
      a = 25
    }else if(this.getConnectedUser()=="aal2 almarsa"){
      a = 26
    }else if(this.getConnectedUser()=="boucraa"){
      a = 22
    }else if(this.getConnectedUser()=="Dcheira"){
      a = 23
    }else if(this.getConnectedUser()=="foumElOued"){
      a = 24
    }
    
 this.selectedCategorie = e
 let c,d;
 // Convert 0 to undefined

 c= this.selectedCategorie == 0 ? undefined : this.selectedCategorie;
d = this.selectedDistrict == 0 ? undefined : this.selectedDistrict;

 let url = `${this.rnpService.host}/endroits/search/findByDistrictAndAnnexeAndCategorieId?`;
 
 if (d !== undefined) {
   url += `districtId=${d}&`;
 }

 if (a !== undefined) {
   url += `annexeId=${a}&`;
 }

 if (c !== undefined) {
   url += `categorieId=${c}`;
 }

 this.rnpService.getOneResource(url).subscribe(data => {
   this.benificiaires = data['_embedded'].endroits;
   this.designation="";
   this.marq2(this.benificiaires);
 });
}


async checrher(){
  
  if(this.designation){
    this.selectedAnnexe=0 
    this.selectedCategorie=0
    this.selectedDistrict = 0
 
  this.rnpService.getResourceAll2('endroits/search/findByDesignationContainsIgnoreCase?designation='+this.designation).subscribe(data=>{
    this.benificiaires = data['_embedded'].endroits
    this.marq2(this.benificiaires);
    

})
  }else{
    this.getReources()
  }
}

getReources(){
  if(this.getConnectedUser()=="sgi"){
  this.rnpService.getResourceAll('endroits').subscribe(data=>{
   
      this.benificiaires = data['_embedded'].endroits  
 this.marq(this.benificiaires)

})
  } else{
    let a;
    if(this.getConnectedUser().startsWith("aal") && this.getConnectedUser()!="aal1 almarsa" && this.getConnectedUser()!="aal2 almarsa"){
       a = parseInt(this.getConnectedUser().charAt(3))
    }else if(this.getConnectedUser()=="aal1 almarsa"){
      a = 25
    }else if(this.getConnectedUser()=="aal2 almarsa"){
      a = 26
    }else if(this.getConnectedUser()=="boucraa"){
      a = 22
    }else if(this.getConnectedUser()=="Dcheira"){
      a = 23
    }else if(this.getConnectedUser()=="foumElOued"){
      a = 24
    }



    this.rnpService.getResourceAll2('annexes/'+a+"/endroits").subscribe(data=>{
      this.annexeActuel = this.getConnectedUser()
   this.benificiaires= data['_embedded'].endroits 
   console.log(a,"8888")
    this.marq(this.benificiaires)
   
   })
  }
   
}

removeLayer(){
  this.map.eachLayer(layer => {
    if (layer instanceof L.Marker) {
      this.map.removeLayer(layer);
    }
  });
}
marq2(data){
  this.removeLayer()
  this.marq(data)
}
mouseAction(marker){
  marker.on('mouseover', function (e) {
    marker.openPopup();
});
marker.on('mouseout', function (e) {
  marker.closePopup();
});
}
 createMarker(element,color) {
 
  const markerHtmlStyles = `
  background-color: ${color};
  width: 1.2rem;
  height: 1.2rem;
  display: block;
  left: -1.5rem;
  top: -1.5rem;
  position: relative;
  border-radius: 3rem 3rem 0;
  transform: rotate(45deg);
  border: 1px solid #FFFFFF`
  let icon = {
    icon: L.divIcon({
      className: "my-custom-pin",
      iconAnchor: [0, 24],
      labelAnchor: [-6, 0],
      popupAnchor: [0, -36],
      html: `<span style="${markerHtmlStyles}" />`
    })
  };
  var marker = L.marker([element.x, element.y], icon).addTo(this.map);
  this.mouseAction(marker);
  marker.bindPopup(`<b>اسم الموقع : ${element.designation}  </b><br><b>${element.adress}</b><br><b>الملحقة : ${element.annexe.designation}</b>`);
}

 marq(data) {
  data.forEach(element => {
    if (element.categorie.id == 1) {
      this.createMarker.call(this, element, "#FF0000"); // Red
    } else if (element.categorie.id == 2) {
      this.createMarker.call(this, element, '#000000'); // Black
    } else if (element.categorie.id == 3) {
      this.createMarker.call(this, element, '#FFA500'); // Orange
    } else if (element.categorie.id == 4) {
      this.createMarker.call(this, element, '#00FF00'); // Lime
    } else if (element.categorie.id == 5) {
      this.createMarker.call(this, element, '#0000FF'); // Blue
    } else if (element.categorie.id == 6) {
      this.createMarker.call(this, element, '#FFFF00'); // Yellow
    } else if (element.categorie.id == 7) {
      this.createMarker.call(this, element, '#FF00FF'); // Magenta
    } else if (element.categorie.id == 8) {
      this.createMarker.call(this, element, '#008000'); // Green
    } else if (element.categorie.id == 9) {
      this.createMarker.call(this, element, '#800000'); // Maroon
    } else if (element.categorie.id == 10) {
      this.createMarker.call(this, element, '#808000'); // Olive
    } else if (element.categorie.id == 11) {
      this.createMarker.call(this, element, '#800080'); // Purple
    } else if (element.categorie.id == 12) {
      this.createMarker.call(this, element, '#008080'); // Teal
    } else if (element.categorie.id == 13) {
      this.createMarker.call(this, element, '#C0C0C0'); // Silver
    } else if (element.categorie.id == 14) {
      this.createMarker.call(this, element, '#808080'); // Gray
    } else if (element.categorie.id == 15) {
      this.createMarker.call(this, element, '#999999'); // Dark Gray
    } else if (element.categorie.id == 16) {
      this.createMarker.call(this, element, '#333333'); // Very Dark Gray
    } else if (element.categorie.id == 17) {
      this.createMarker.call(this, element, '#666666'); // Medium Dark Gray
    } else if (element.categorie.id == 18) {
      this.createMarker.call(this, element, '#CCCCCC'); // Light Gray
    } else if (element.categorie.id == 19) {
      this.createMarker.call(this, element, '#F0F0F0'); // Lighter Gray
    } else if (element.categorie.id == 20) {
      this.createMarker.call(this, element, '#FFD700'); // Gold
    } else if (element.categorie.id == 21) {
      this.createMarker.call(this, element, '#8A2BE2'); // Blue Violet
    } else if (element.categorie.id == 22) {
      this.createMarker.call(this, element, '#A52A2A'); // Brown
    } else if (element.categorie.id == 23) {
      this.createMarker.call(this, element, '#DEB887'); // Burlywood
    } else if (element.categorie.id == 24) {
      this.createMarker.call(this, element, '#5F9EA0'); // Cadet Blue
    } else if (element.categorie.id == 25) {
      this.createMarker.call(this, element, '#7FFF00'); // Chartreuse
    } else if (element.categorie.id == 26) {
      this.createMarker.call(this, element, '#D2691E'); // Chocolate
    } else if (element.categorie.id == 27) {
      this.createMarker.call(this, element, '#FF7F50'); // Coral
    } else if (element.categorie.id == 28) {
      this.createMarker.call(this, element, '#6495ED'); // Cornflower Blue
    } else if (element.categorie.id == 29) {
      this.createMarker.call(this, element, '#DC143C'); // Crimson
    } else if (element.categorie.id == 30) {
      this.createMarker.call(this, element, '#00CED1'); // Dark Turquoise
    }
    
  });
}

addResource(){
    this.router.navigateByUrl("sgi/addEndroit")

}
onDeleteResource(id:string){
if(confirm('Etes vous sur de vouloir supprimer cette resource ?')){
  this.rnpService.deleteResourceById(this.rnpService.host+'/endroits/'+id).subscribe(data=>{
this.getReources()
this.selectedAnnexe = 0
this.selectedAnnexe =0 
this.selectedCategorie =0
this.designation = ""
},err=>{
  console.log(err)
})
}
 
 
}
onEditResource(id:any){
  this.router.navigateByUrl("/sgi/editEndroit/"+id)
} 
getConnectedUser(){
  return JSON.parse(atob(this.rnpService.loadToken().split('.')[1])).sub;
  }

}
