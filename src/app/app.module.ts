
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent }  from './app.component';
import { IndustryComponent } from './industry/industry.component';
import { IndustryService } from './industry/industry.service';
import { FormsModule }   from '@angular/forms';
import{RoleService} from'./role.service';
@NgModule({
  imports: [     
        BrowserModule,
	HttpModule,
  ReactiveFormsModule,
  FormsModule
  ],
  declarations: [
        AppComponent,
        IndustryComponent
  ],
  providers: [
    IndustryService,
    RoleService
  ],
  bootstrap: [
        AppComponent
  ]
})
export class AppModule { } 

