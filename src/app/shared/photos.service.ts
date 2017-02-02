import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';

@Injectable()
export class PhotosService {

    private _dataPhotos: Photo[] = [
        {
            name: 'item1',
            ext: 'jpeg',
            src: './assets/img/samples/img1.jpeg',
            description: 'first photo',
            width: 600,
            height: 300,
            size: 150
        },
        {
            name: 'item2',
            ext: 'jpg',
            src: './assets/img/samples/img2.jpg',
            description: 'second photo',
            width: 650,
            height: 350,
            size: 2000
        },
        {
            name: 'item3',
            ext: 'jpeg',
            src: './assets/img/samples/img3.jpeg',
            description: 'third photo',
            width: 650,
            height: 350,
            size: 2000
        }
    ];
    private _apiUrl: string = 'http://localhost:3000/api/photos';
    private _photos: BehaviorSubject<Photo[]>;
    private _apiData: Observable<any>;
    public getUsers(): void {
        this._apiData = this._http.get(this._apiUrl)
            .map(res => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
        this._apiData.subscribe((value) => {
            value.forEach((elem) => {
                this._dataPhotos.push(
                    {
                        name: '',
                        ext: '',
                        src: elem,
                        description: '',
                        width: 0,
                        height: 0,
                        size: 0
                    });
            });
        });
    };

    public constructor(private _http: Http) {
        this._photos = new BehaviorSubject([]);
        this.getUsers();
    }
    get photos() {
        return this._photos.asObservable();
    }
    next() {
        this._photos.next(this._dataPhotos);
        return this._dataPhotos;
    }
    addPhoto(newPhoto: Photo): Photo[] | boolean {
        let res = this.findPhoto(this._dataPhotos, newPhoto);
        if (res < 0) {
            this._dataPhotos.push(newPhoto);
            this._photos.next(this._dataPhotos);
            return this._dataPhotos;
        } else {
            return false;
        }
    }
    public removePhoto(photo: Photo): Photo[]|boolean {
        let res = this.findPhoto(this._dataPhotos, photo);
        if (res < 0) {
            return false;
        } else {
            return this._dataPhotos.splice(res, 1);
        }
    }
    private findPhoto (array: Photo[], elem: Photo): number {
        for (let i = 0; i < array.length; i++) {
            if (array[i].name === elem.name) {
                return i;
            }
        }
        return -1;
    }
    getAll () {
        return this._dataPhotos;
    }

}
/*
1. добавить элемент
2. удалить элемент
3. обеспечить уникальность
4. фильтрация элементов по вводимому параметру
5. добавление элементов в контент согласно списку
6. Вывод списка элементов по запросу к серверу
 */
