import {Injectable} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/Rx';

@Injectable()
export class PhotosService {

    // public _photos: BehaviorSubject<Photo[]> = new BehaviorSubject([]);
    private dataPhotos: Photo[] = [
        {
            name: 'item1',
            ext: 'jpg',
            src: './img/item1.jpg',
            description: 'first photo',
            width: 600,
            height: 300,
            size: 150
        },
        {
            name: 'item2',
            ext: 'png',
            src: './img/item2.jpg',
            description: 'second photo',
            width: 650,
            height: 350,
            size: 2000
        }
    ];
    private _photos: BehaviorSubject<Photo[]>;
    public constructor() {
        this._photos = new BehaviorSubject([]);
    }
    get photos() {
        return this._photos.asObservable();
    }
    loadAll() {
        this._photos.next(this.dataPhotos);
    }
    addPhoto(newPhoto: Photo): Photo[] | Boolean {
        let res = this.findPhoto(this.dataPhotos, newPhoto);
        if (res < 0) {
            this.dataPhotos.push(newPhoto);
            this._photos.next(this.dataPhotos);
            return this.dataPhotos;
        } else {
            return false;
        }
    }
    // public removePhoto(photo: Photo): Photo[]|boolean {
    //     let res = this.findPhoto(this.photos, photo);
    //     if (res < 0) {
    //         return false;
    //     } else {
    //         return this.photos.splice(res, 1);
    //     }
    // }
    private findPhoto (array: Photo[], elem: Photo): number {
        for (let i = 0; i < array.length; i++) {
            if (array[i].name === elem.name) {
                return i;
            }
        }
        return -1;
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
