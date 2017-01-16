import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class BtnService {
    private _btnSequence: Subject<Event>;
    constructor() {
        this._btnSequence = new Subject<Event>();
    }
    click(e: MouseEvent): void {
        this._btnSequence.next(e);
    }

    clickSubscript(): Observable<Event> {
        return  this._btnSequence;
    }
}
