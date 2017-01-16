import {Component, ViewEncapsulation, OnInit, OnDestroy} from '@angular/core';
import {PhotosService} from '../shared/photos.service';
import {BtnService} from '../shared/btn.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/filter';


@Component({
    selector: 'app-addblock',
    templateUrl: './addblock.component.html',
    styleUrls: ['./addblock.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AddblockComponent implements OnInit, OnDestroy {
    private _photos: Observable<Photo[]>;
    constructor(private _photosService: PhotosService,  private _btnService: BtnService) {}
    public fileUpload(elem) {
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
        } else {
            console.error('file with same name exist');
        }
    }

    ngOnInit() {
        // this._btnService.clickSubscript().subscribe(x => {
        //    console.log(x.target);
        // });
        // this._btn = this._btnService.btn;
        // this._btn.filter((e: MouseEvent) => (e.target as HTMLButtonElement).className === 'photolist__apply')
        //     .subscribe((x) => {
        //         console.log(x);
        //     });
        // this._photos = this._photosService.photos;
        // this._photosService.loadAll();
        // let btn: Observable<Event> = Observable.fromEvent<Event>(document, 'click');
        // btn
        //     .filter((e: MouseEvent) => (e.target as HTMLButtonElement).className === 'photolist__apply')
        //     .subscribe(() => {
        //        console.log(Observable.from(this._photos).map(x => {return x}));
        //            // .subscribe(x => x.forEach((elem: Photo) => console.log(elem)));
        //     });
    // .mergeMap((ev: MouseEvent) => {
    //         return this._photos.filter((elem: any) => elem.name === 'elem1');
    //     });
        // this.tab = Observable.fromEvent<Event>(this.tabGroup.nativeElement, 'click');
        // this.tab.subscribe((event: Event) => {
        // this.currentTabState = (event.target as HTMLAnchorElement).hash;
        // console.log(this.currentTabState);
        // public doClick(e) {
        //   this._btn.next(e);
        // }
    }
    ngOnDestroy() {
        // this._btn.unsubcribe();
    }

}
