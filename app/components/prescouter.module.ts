import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { PrescouterComponent }  from './prescouter.component';
import { SearchComponent } from './search.component';

@NgModule({
  imports: [
      BrowserModule
    ],
  declarations: [
      PrescouterComponent,
      SearchComponent
  ],
  bootstrap: [ PrescouterComponent ]
})
export class PrescouterModule { }