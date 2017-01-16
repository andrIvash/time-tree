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
import {BtnService} from './shared/btn.service';
import { DynamicPhotoComponent } from './dynamic-photo/dynamic-photo.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PhotolistComponent,
    AddblockComponent,
    NavComponent,
    ContentComponent,
    PhotosPipe,
    DynamicPhotoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [PhotosService, BtnService],
  bootstrap: [AppComponent]
})
export class AppModule { }
