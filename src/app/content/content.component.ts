import {Component, ViewChild, ViewContainerRef, ComponentRef, ViewEncapsulation, OnInit,
    ReflectiveInjector, ComponentFactoryResolver} from '@angular/core';
import {PhotosService} from '../shared/photos.service';
import {BtnService} from '../shared/btn.service';
import {DynamicPhotoComponent} from '../dynamic-photo/dynamic-photo.component';
import {Observable} from 'rxjs';
@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss'],
    entryComponents: [DynamicPhotoComponent],
    encapsulation: ViewEncapsulation.None
})
export class ContentComponent implements OnInit {
    @ViewChild('contentWrapper', { read: ViewContainerRef })
    private _contentWrapper: ViewContainerRef;
    private _photos: Photo[];
    private _currentComponents = [];
    constructor(
                private resolver: ComponentFactoryResolver,
                private _photosService: PhotosService,
                private _btnService: BtnService
    ) {}

    private createComponent(componentType): ComponentRef<any> {
        const injector = ReflectiveInjector.fromResolvedProviders([], this._contentWrapper.parentInjector);
        const factory  = this.resolver.resolveComponentFactory(componentType);
        return factory.create(injector);
    }
    private createNotificationWithData(componentType, data: Photo): ComponentRef<any> {
        const component = this.createComponent(componentType);
        Object.assign(component.instance, data);

        return component;
    }
    ngOnInit() {
        this._photos = this._photosService.getAll();
        this._btnService.clickSubscript().filter((e: MouseEvent) => (e.target as HTMLButtonElement).className === 'photolist__apply')
            .subscribe(() => {
                this._currentComponents.forEach((component: any) => {
                    component.destroy();
                });
                this._photos.forEach((elem: Photo) => {
                    const component = this.createNotificationWithData(DynamicPhotoComponent, elem);
                    this._currentComponents.push(component);
                    this._contentWrapper.insert(component.hostView);
                    // console.log(elem);
                });
            });
        /*
            1. Застилизовать добавляемый компонент обеспечить выволд рисунка
            2. Обеспечить удаление добавляемых компонентов.

         */
        // public previewFile() {
        // let preview = document.querySelector('img');
        // let file    = document.querySelector('input[type=file]').files[0];
        // let reader  = new FileReader();
        //
        // reader.addEventListener('load', function () {
        //   preview.src = reader.result;
        // }, false);
        //
        // if (file) {
        //   reader.readAsDataURL(file);
        // }
        // }
        // Inputs need to be in the following format to be resolved properly
        // private data = {
        //     component: DynamicPhotoComponent,
        //     inputs: {
        //         showNum: 2
        //     }
        // };
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



        // const component = this.createNotificationWithData(DynamicPhotoComponent, {
        //     showNum     : 6
        // });
        // this._contentWrapper.insert(component.hostView);
        // Inputs need to be in the following format to be resolved properly
        // let inputProviders = Object.keys(this.data.inputs)
        //     .map((inputName) => {return {provide: inputName, useValue: this.data.inputs[inputName]}; });
        // let resolvedInputs = ReflectiveInjector.resolve(inputProviders);

        // We create an injector out of the data we want to pass down and this components injector
       // let injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs , this._contentWrapper.parentInjector);

        // We create a factory out of the component we want to create
        // let factory = this.resolver.resolveComponentFactory(this.data.component);

        // We create the component using the factory and the injector
        // let component = factory.create(injector);

        // We insert the component into the dom container
        // this._contentWrapper.insert(component.hostView);

        // We can destroy the old component is we like by calling destroy
        // if (this.currentComponent) {
        //     this.currentComponent.destroy();
        // }

        // this.currentComponent = component;
    }

}
