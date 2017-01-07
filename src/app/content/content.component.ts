import {Component, ViewEncapsulation, OnInit} from '@angular/core';

@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ContentComponent implements OnInit {

    constructor() {
    }

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

    ngOnInit() {
    }

}
