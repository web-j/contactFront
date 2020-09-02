import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactManagerComponent } from './contact-manager/contact-manager.component';

const routes: Routes = [
  {
    path: '',
    component: ContactManagerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
