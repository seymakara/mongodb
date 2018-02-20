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

  addTask(newtask){
    // let tempObservable = this._http.get('/tasks/5a8747407882609ff205c787');
    // tempObservable.subscribe(data => console.log("Got the one!", data));
    return this._http.post('/task', newtask)
  }

  deleteTask(ID){
  //   let tempObservable = this._http.delete('/tasks/5a8747407882609ff205c787');
  //   tempObservable.subscribe(data => console.log("Deleted the one!", data));
  return this._http.delete(`/tasks/${ID}`)
  }

  //EDIT STEP 5
  updateTask(updatedTask){
    return this._http.put(`/tasks/${updatedTask.id}`, updatedTask);

  }
}


