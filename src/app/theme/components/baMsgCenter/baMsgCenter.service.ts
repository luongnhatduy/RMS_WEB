import {Injectable} from '@angular/core'

@Injectable()
export class BaMsgCenterService {

  private _notifications = [
    {
      name: 'Nick',
      text: 'abc',
      time: '1s'
    }
  ];

  public getNotifications():Array<Object> {
    return this._notifications;
  }
}
