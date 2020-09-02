import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { ContactManagerComponent } from './contact/contact-manager/contact-manager.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./contact/contact.module').then(mod => mod.ContactModule)
      }
    ],
  },

  { path: '', redirectTo: '', pathMatch: 'full' },

  { path: '**', component: ContactManagerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, onSameUrlNavigation: 'reload', enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
