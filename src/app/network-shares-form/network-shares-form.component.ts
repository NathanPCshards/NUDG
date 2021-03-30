import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { networkshares } from '../models/networkshares';
import { NetworksharesService } from '../services/networkshares.service';

@Component({
  selector: 'app-network-shares-page',
  templateUrl: './network-shares-page.html',
  styleUrls: ['./network-shares-form.component.scss']
})
export class networkSharesPage implements OnInit {

  panelOpenState;
  rowSelected = false;

  networkshares$: Observable<networkshares[]>;

  constructor(private http:HttpClient, private formBuilder: FormBuilder, 
    private networksharesService : NetworksharesService ) {
   }

  ngOnInit(){
    this.networkshares$ = this.fetchAll();

  }




fetchAll(): Observable<networkshares[]> {
  return this.networksharesService.fetchAll();
}

post(NSshareName, NSresourceType, NSdescription, NSfolderPath, NShostIdentifier,CUIdata ,GRA, GWA, URA, UWA): void {

  this.networkshares$ = this.networksharesService
    .post({NSshareName, NSresourceType, NSdescription, NSfolderPath, NShostIdentifier,CUIdata, GRA, GWA, URA, UWA})
    .pipe(tap(() => (this.networkshares$ = this.fetchAll())));
}


update(NSshareName, NSresourceType, NSdescription, NSfolderPath, NShostIdentifier,CUIdata, GRA, GWA, URA, UWA, idOrgNetworkShares): void {


  this.networkshares$ = this.networksharesService
    .update({NSshareName, NSresourceType, NSdescription, NSfolderPath, NShostIdentifier,CUIdata, GRA, GWA, URA, UWA, idOrgNetworkShares})
    .pipe(tap(() => (this.networkshares$ = this.fetchAll())));
}


delete(id: any): void {
  console.log("attempting to delete id : " , id)

  this.networkshares$ = this.networksharesService
    .delete(id)
    .pipe(tap(() => (this.networkshares$ = this.fetchAll())));
    
}




}

