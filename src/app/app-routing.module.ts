import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: 'airunit-eca1', loadChildren: () => import('./airunit/airunit.module').then(m => m.AirunitModule)},
  {path: 'airunit-5e73', loadChildren: () => import('./airunit/airunit.module').then(m => m.AirunitModule)},
  {path: 'airunit-f41b', loadChildren: () => import('./airunit/airunit.module').then(m => m.AirunitModule)},
  {path: 'airunit-67fb', loadChildren: () => import('./airunit/airunit.module').then(m => m.AirunitModule)}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{enableTracing: false})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
