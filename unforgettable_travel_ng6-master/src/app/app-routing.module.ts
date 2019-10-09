import { ThankYouComponent } from './thank-you/thank-you.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TravelFormComponent } from "./travel-form/travel-form.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

export const appRoutes: Routes = [
  { path: "travel-form/:id", component: TravelFormComponent },
  { path: "thank-you", component: ThankYouComponent },
  { path: "not-found", component: NotFoundComponent },
  { path: "", redirectTo: "not-found", pathMatch: "full" },
  { path: "**", redirectTo: "not-found", pathMatch: "full"  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers:[],
  declarations: []
})
export class AppRoutingModule {}
