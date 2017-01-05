import {Injectable} from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PhotosService {

    public photos: Photo[] = [
        {
            name: 'item1',
            ext: 'jpg',
            src: './img/item1.jpg',
            description: 'first photo',
            width: 600,
            height: 300
        },
        {
            name: 'item2',
            ext: 'png',
            src: './img/item2.jpg',
            description: 'second photo',
            width: 650,
            height: 350
        }
    ];
    public currentPhotos: Subject<Photo> = new Subject<Photo>();
    public constructor() {}
    public getPhotos(): Photo[] {
        return this.photos;
    }
    public changePhoto(photo: Photo): void {
        this.currentPhotos.next(photo);
    }
    public addPhoto(photo: Photo): void {
        this.photos.push(photo);
    }
    public removePhoto(photo: Photo): Photo|boolean {
        let res = this.photos.find((photo) => {

        });
        return res ? res : false;
    }
    private findPhoto (array, elem): number {
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

 */
