import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterializeDirective } from "angular2-materialize";

import { PrescouterComponent }  from './prescouter.component';
import { SearchComponent } from './search.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    declarations: [
        MaterializeDirective,

        PrescouterComponent,
        SearchComponent
    ],
    bootstrap: [ PrescouterComponent ]
})
export class PrescouterModule { }