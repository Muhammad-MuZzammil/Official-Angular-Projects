import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';
import { CoreModule } from './core/core.module';
import { AppRoutingModule, appRoutes } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TravelFormComponent } from './travel-form/travel-form.component';
import { FormsModule } from '@angular/forms';
import { NotFoundComponent } from './not-found/not-found.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TravelFormComponent,
    NotFoundComponent,
    ThankYouComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    TimepickerModule.forRoot(),
    CoreModule,
    SharedModule,
    RouterModule.forRoot(appRoutes),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
