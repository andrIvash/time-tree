import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {PhotosService} from '../shared/photos.service';

@Component({
    selector: 'app-addblock',
    templateUrl: './addblock.component.html',
    styleUrls: ['./addblock.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AddblockComponent implements OnInit {

    constructor(private _photosService: PhotosService) {
    }

    public fileUpload(elem) {
        elem.previousElementSibling.placeholder = elem.files[0].name;
        let photo: Photo = {
            name: elem.files[0].name,
            ext: elem.files[0].type,
            src: './img' + elem.files[0].name + elem.files[0].type,
            description: 'descr',
            width: 0,
            height: 0,
            size: elem.files[0].size
        };
        let res: Photo[] | boolean = this._photosService.addPhoto(photo);
        if (res) {
            console.log(res);
        } else {
            console.error('file with same name exist');
        }
    }

    ngOnInit() {
    }

}
