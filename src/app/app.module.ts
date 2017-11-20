
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent }  from './app.component';
import { IndustryComponent } from './industry/industry.component';
import { IndustryService } from './industry/industry.service';

@NgModule({
  imports: [     
        BrowserModule,
	HttpModule,
	ReactiveFormsModule
  ],
  declarations: [
        AppComponent,
        IndustryComponent
  ],
  providers: [
    IndustryService
  ],
  bootstrap: [
        AppComponent
  ]
})
export class AppModule { } 

