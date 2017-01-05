import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {PhotosService} from '../shared/photos.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'app-photolist',
    templateUrl: './photolist.component.html',
    styleUrls: ['./photolist.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [PhotosService]
})
export class PhotolistComponent implements OnInit {
    public nextPhoto: Subscription;
    public photos: Photo[];
    public photoList: Photo[];
    public activePhoto: Photo;
    constructor(private _photosService: PhotosService) {
        this.photos = _photosService.getPhotos();
        this.photoList = this.photos.concat([{
            name: 'item3',
            ext: 'png',
            src: './img/item3.jpg',
            description: 'third photo',
            width: 650,
            height: 350
        }]);
        this.nextPhoto = _photosService.currentPhotos.subscribe((value) => {
            this.activePhoto = value;
            console.log(value);
        });
    }
    public changePhoto(photo: Photo): void {
        this._photosService.changePhoto(photo);
    }
    ngOnInit() {
    }

}
