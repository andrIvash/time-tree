import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {PhotosService} from '../shared/photos.service';
import {BtnService} from '../shared/btn.service';


@Component({
    selector: 'app-photolist',
    templateUrl: './photolist.component.html',
    styleUrls: ['./photolist.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PhotolistComponent implements OnInit {
    public photos: Observable<Photo[]>;
    public photosName: string = '';
    constructor(private _photosService: PhotosService, private _btnService: BtnService) {}
    // удаление элемента
    public removePhoto(photo: Photo) {
        let res: Photo[] | boolean = this._photosService.removePhoto(photo);
        if (res) {
            console.log(res);
        } else {
            console.error('error delete file');
        }
    }
    // обработчик нажатия на кнопку
    public clickBtn (e: MouseEvent) {
        this._btnService.click(e);
    }
    ngOnInit() {
        this.photos = this._photosService.photos;
        this._photosService.next();
    }

}
