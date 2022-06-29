import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutComponent } from './layout/layout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { SharedModule } from '../shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import {UIModule} from '../shared/ui/ui.module';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { TranslateModule } from '@ngx-translate/core';
// import { MatTabScrollToCenterDirective } from 'src/app/shared/directives/scrolling.directive';
// import { MatTabScrollToLeftDirective } from 'src/app/shared/directives/scrollleft.directive';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    LayoutComponent,

    // MatTabScrollToCenterDirective,
    // MatTabScrollToLeftDirective,
  ],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    MatSidenavModule,
    MatIconModule,
    MatBadgeModule,
    SharedModule,
    MatTabsModule,
    MatSelectModule,
    UIModule,
    AutocompleteLibModule, 
    TranslateModule,

  ],
  exports: [
    NavbarComponent,
    FooterComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class LayoutsModule { }
