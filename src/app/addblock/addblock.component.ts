import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {PhotosService} from '../shared/photos.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/filter';


@Component({
    selector: 'app-addblock',
    templateUrl: './addblock.component.html',
    styleUrls: ['./addblock.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AddblockComponent implements OnInit {
    private _photos: Observable<Photo[]>;
    private _file: any;
    constructor(private _photosService: PhotosService) {}
    public fileUpload(elem) {
        this._file = elem.files[0];
        elem.previousElementSibling.placeholder = elem.files[0].name;
        let photo: Photo = {
            name: elem.files[0].name,
            ext: elem.files[0].type,
            src: `./photos/${elem.files[0].name}${elem.files[0].type}`,
            description: 'descr',
            width: 0,
            height: 0,
            size: elem.files[0].size
        };
        let res: Photo[] | boolean = this._photosService.addPhoto(photo);
        if (res) {
            console.log(res);
            this.makeFileRequest('http://localhost:3000/upload', [], this._file).then((result) => {
                console.log(result);
            }, (error) => {
                console.error(error);
            });
        } else {
            console.error('file with same name exist');
        }
    }
    public makeFileRequest(url: string, params: Array<string>, file: any) {
        return new Promise((resolve, reject) => {
            const formData: any = new FormData();
            const xhr = new XMLHttpRequest();
            formData.append('uploads', file, file.name);
            // for(let i = 0; i < files.length; i++) {
            //     formData.append("uploads[]", files[i], files[i].name);
            // }
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            };
            xhr.open('POST', url, true);
            xhr.send(formData);
        });
    }

    ngOnInit() {}

}
