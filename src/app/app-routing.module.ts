import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//added dynamically
const routes: Routes = [
  {path: 'airunit-eca1dad9-f972-4bff-b5e1-ce2986b09c46', loadChildren: () => import('./airunit/airunit.module').then(m => m.AirunitModule)},
  {path: 'airunit-67fb474a-f5c5-421e-be1f-2304212db905', loadChildren: () => import('./airunit/airunit.module').then(m => m.AirunitModule)},
  {path: 'airunit-5e73dd3e-a819-410e-8d8e-9cb5697bbbe2', loadChildren: () => import('./airunit/airunit.module').then(m => m.AirunitModule)},
  {path: 'airunit-f41bccb0-825f-455a-abb4-7f7e101c5d8f', loadChildren: () => import('./airunit/airunit.module').then(m => m.AirunitModule)}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
