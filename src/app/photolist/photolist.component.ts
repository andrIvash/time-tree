import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {PhotosService} from '../shared/photos.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-photolist',
    templateUrl: './photolist.component.html',
    styleUrls: ['./photolist.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PhotolistComponent implements OnInit {
    public photos: Observable<Photo[]>;
    public photosName: string = '';
    constructor(private _photosService: PhotosService) {}
    public removePhoto(photo: Photo) {
        let res: Photo[] | boolean = this._photosService.removePhoto(photo);
        if (res) {
            console.log(res);
        } else {
            console.error('error delete file');
        }
    }
    ngOnInit() {
        this.photos = this._photosService.photos;
        this._photosService.loadAll();
    }

}
