import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyServiceService } from 'src/app/services/my-service.service';

@Component({
  selector: 'app-annexes',
  templateUrl: './annexes.component.html',
  styleUrls: ['./annexes.component.css']
})
export class AnnexesComponent implements OnInit {
  size:number = 4;
  currentPage:number = 0;
  totalPages: number;
  resources :any[]
  pages : Array<number>;
  currentKeyword: string = "";
  constructor(private rnpService: MyServiceService,private router: Router) { }

  ngOnInit(): void {
   this.onGetResources()
  }
onGetResources(){
  this.rnpService.getResource("annexes",this.currentPage,this.size).subscribe(data=>{
   this.resources = data['_embedded'].annexes;
  this.totalPages = data['page'].totalPages;
  this.pages = new Array<number>(this.totalPages);
  },err=>{
    console.log(err)
  })
}
onPageResources(i:number){
  this.currentPage = i;
 this.searchResources()
}
onChercher(form :any){
  this.currentPage = 0;
  this.currentKeyword = form.keyword;
  this.searchResources()
}

searchResources(){

this.rnpService.getResourceByKeyword("annexes",this.currentPage,this.size,this.currentKeyword,"Annexe").subscribe(data=>{
  this.resources = data['_embedded'].annexes;
 this.totalPages = data['page'].totalPages
 this.pages = new Array<number>(this.totalPages);
 },err=>{
   console.log(err) 
 })

}
addResource(){
    this.router.navigateByUrl("sgi/addAnnexe")

}
onDeleteResource(url:string){
  if(confirm('Etes vous sur de vouloir supprimer cette resource ?')){
  this.rnpService.deleteResource('annexes',url).subscribe(data=>{
    this.searchResources();
    this.onGetResources()
  },err=>{
    console.log(err)
  })
  }
}
onEditResource(p:any){
  let url = p['_links'].self.href;
  this.router.navigateByUrl("sgi/editAnnexe/"+btoa(url))
} 
}
