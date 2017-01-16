import { Component, OnInit, Injector } from '@angular/core';

@Component({
  selector: 'app-dynamic-photo',
  templateUrl: './dynamic-photo.component.html',
  styleUrls: ['./dynamic-photo.component.scss']
})
export class DynamicPhotoComponent implements OnInit {
  private showNum = 0;
  constructor(private _injector: Injector) {
    // this.showNum = this._injector.get('showNum');
  }

  ngOnInit() {
  }

}
