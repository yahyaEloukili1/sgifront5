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
  {this.rnpService.uploadFileWithData("لائحة المواقع",this.benificiaires)}
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
 
  this.selectedCategorie = e
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
  this.rnpService.getResourceAll2('endroits2').subscribe(data=>{
    this.benificiaires = data
    
 this.marq(data)

})
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
 createMarker(element, iconUrl,width,height) {
  let icon = {
    icon: L.icon({
      iconSize: [width,height],
      iconAnchor: [13, 0],
      iconUrl: iconUrl
    })
  };
  var marker = L.marker([element.x, element.y], icon).addTo(this.map);
  this.mouseAction(marker);
  marker.bindPopup(`<b>اسم الموقع : ${element.designation}  </b><br><b>${element.adress}</b><br><b>الملحقة : ${element.annexe.designation}</b>`);
}

 marq(data) {
  data.forEach(element => {
if (element.categorie.id == 1) {
      this.createMarker.call(this, element, 'https://bodylab.ch/wp-content/uploads/2015/11/map-marker-icon.png',35,40);
    } else if (element.categorie.id == 2) {
      this.createMarker.call(this, element, 'https://cdn.pixabay.com/photo/2013/07/13/10/29/icon-157354_640.png',25,40);
    } 
    else if (element.categorie.id == 3) {
      this.createMarker.call(this, element, 'https://cdn3.iconfinder.com/data/icons/flat-pro-basic-set-1-1/32/location-green-512.png',35,43);
    } else{
      this.createMarker.call(this, element, 'marker-icon.png',25,40);
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


}
