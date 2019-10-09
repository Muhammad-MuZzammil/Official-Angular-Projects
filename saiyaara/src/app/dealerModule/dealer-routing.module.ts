import { CarDealerSingleComponent } from './dealer-single-car/car-dealer-single/car-dealer-single.component';
import { CarDealerComponent } from './sub-components/car-dealer/car-dealer.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
    {
        path: '',
        component: CarDealerComponent
    },
    {
        path: ':id',
        component: CarDealerSingleComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DealerRoutingModule { }