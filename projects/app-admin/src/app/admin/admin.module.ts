import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminHomeComponent} from './admin-home/admin-home.component';
import {AdminAppRoutingModule} from './admin-app-routing/admin-app-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AdminAppRoutingModule
  ],
  declarations: [AdminHomeComponent]
})
export class AdminModule {
}
