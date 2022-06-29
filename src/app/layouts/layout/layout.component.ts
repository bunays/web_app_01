import { Component, OnInit,HostListener,ViewChild} from '@angular/core';
import { ToggleService } from 'src/app/shared/services/Toggle/toggle.service';
import { MatSidenav } from '@angular/material/sidenav';

export interface LeftSideNavEnable {
  type?: string;
  isVisible: boolean;
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {


  @ViewChild('leftSidenav') leftSidenav: MatSidenav;


  objLeftSideNavEnable$:LeftSideNavEnable;

  numHeaderHeight:number;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    //this.numHeaderHeight=document.getElementById('target').offsetHeight;
  }

  constructor(
    private toggleService:ToggleService
    
    ) {
    this.toggleService.leftSideNav.subscribe(res=>{
      this.objLeftSideNavEnable$=res;
    })
   }

  ngOnInit(): void {
    //this.numHeaderHeight=document.getElementById('target').offsetHeight;
  }

  onBackDropClickClose() {
    this.leftSidenav.close();
    /*this.toggleService.addressSideNav.next(false);
    this.blnAddressNavEnable=false;*/

    this.toggleService.leftSideNav.next({
      isVisible:false
    })
    /*this.toggleService.orderDetails.next(false);*/
  

  }


}
