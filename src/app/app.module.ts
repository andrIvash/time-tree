import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PhotolistComponent } from './photolist/photolist.component';
import { AddblockComponent } from './addblock/addblock.component';
import { NavComponent } from './nav/nav.component';
import { ContentComponent } from './content/content.component';

import {PhotosService} from './shared/photos.service';
import { PhotosPipe } from './shared/photos.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PhotolistComponent,
    AddblockComponent,
    NavComponent,
    ContentComponent,
    PhotosPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [PhotosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
