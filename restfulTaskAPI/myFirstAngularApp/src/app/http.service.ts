import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class HttpService {

  constructor(private _http: HttpClient){
    // this.getTasks();
    // this.getOne();
    // this.delete();
  }

  getTasks(){
    // let tempObservable = this._http.get('/tasks');
    // tempObservable.subscribe(data => console.log("Got our tasks!", data));
    return this._http.get('/tasks')
  }

  // getOne(){
  //   let tempObservable = this._http.get('/tasks/5a8747407882609ff205c787');
  //   tempObservable.subscribe(data => console.log("Got the one!", data));
  // }

  // delete(){
  //   let tempObservable = this._http.delete('/tasks/5a8747407882609ff205c787');
  //   tempObservable.subscribe(data => console.log("Deleted the one!", data));
  // }
}


