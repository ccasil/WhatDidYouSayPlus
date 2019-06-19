import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  newMessage(username, messages) {
    return this._http.post('/new', {
      username: username,
      messages: messages
    });
  }

}
