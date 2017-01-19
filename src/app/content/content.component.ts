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
    // cоздание компонента
    private createComponent(componentType): ComponentRef<typeof componentType> {
        const injector = ReflectiveInjector.fromResolvedProviders([], this._contentWrapper.parentInjector);
        const factory  = this.resolver.resolveComponentFactory(componentType);
        return factory.create(injector);
    }
    // проброс данных в компонент
    private createComponentWithData(componentType, data: Photo): ComponentRef<typeof componentType> {
        const component = this.createComponent(componentType);
        Object.assign(component.instance, data);
        return component;
    }

    ngOnInit() {
        this._photos = this._photosService.getAll();
        // добавление компонентов
        this._btnService.clickSubscript().filter((e: MouseEvent) => (e.target as HTMLButtonElement).className === 'photolist__apply')
            .subscribe(() => {
                this._currentComponents.forEach((component) => {
                    component.destroy();
                });
                this._photos.forEach((elem: Photo) => {
                    const component = this.createComponentWithData(DynamicPhotoComponent, elem);
                    this._currentComponents.push(component);
                    this._contentWrapper.insert(component.hostView);  // отображение компонента
                    // console.log(elem);
                });
            });
        // удаление компонентов
        this._btnService.clickSubscript().filter((e: MouseEvent) => (e.target as HTMLButtonElement).className === 'photolist__removeall')
            .subscribe(() => {
                this._currentComponents.forEach((component) => {
                    component.destroy();
                });
            });
    }

}
