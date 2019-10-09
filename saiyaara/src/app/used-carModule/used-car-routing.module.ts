import { UsedCarSingleComponent } from './used-car-single/used-car-single/used-car-single.component';
import { UsedCarComponent } from './sub-components/used-car/used-car.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  {
    path: '',
    component: UsedCarComponent
  },
  {
    path: ':id',
    component: UsedCarComponent
  },
  {
    path: ':id',
    component: UsedCarSingleComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsedCarRoutingModule { }