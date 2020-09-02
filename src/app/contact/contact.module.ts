import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material.module';
import { ContactRoutingModule } from './contact-routing.module';
import { ContactManagerComponent } from './contact-manager/contact-manager.component';
import { DialogContactComponent } from './dialog-contact/dialog-contact.component';

@NgModule({
  declarations: [ContactManagerComponent, DialogContactComponent],
  imports: [
    CommonModule,
    ContactRoutingModule,
    MaterialModule
  ],

  entryComponents: [DialogContactComponent]
})
export class ContactModule { }
