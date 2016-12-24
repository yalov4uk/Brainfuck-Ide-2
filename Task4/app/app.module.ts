import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FileManagerComponent } from './filemanager/filemanager.component';
import { TextWindowComponent } from './textwindow/textwindow.component';
import { EditCellComponent } from './editcell/editcell.component';
import { OutputComponent } from './output/output.component';
import { MainService } from './shared/main.service';

@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule],
    declarations: [AppComponent, FileManagerComponent, TextWindowComponent, EditCellComponent, OutputComponent],
    providers: [MainService],
    bootstrap: [AppComponent]
})
export class AppModule { }