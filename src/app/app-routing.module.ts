import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: 'airunit-1', loadChildren: () => import('./airunit/airunit.module').then(m => m.AirunitModule)}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{enableTracing: false})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
