import { SecondHandUsedCarComponent } from './../used-carModule/find-second-hand-car/second-hand-used-car/second-hand-used-car.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  {
    path: '',
    component: SecondHandUsedCarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsedCarSingleRoutingModule { }