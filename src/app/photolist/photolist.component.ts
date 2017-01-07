import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {PhotosService} from '../shared/photos.service';

@Component({
    selector: 'app-photolist',
    templateUrl: './photolist.component.html',
    styleUrls: ['./photolist.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PhotolistComponent implements OnInit {
    public photos: Photo[];
    constructor(private _photosService: PhotosService) {}
    ngOnInit() {
        this._photosService.photos.subscribe(list => {
            console.log(list);
            this.photos = list;
        });
        this._photosService.loadAll();
    }

}
