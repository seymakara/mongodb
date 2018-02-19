import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MEAN';
  constructor(private _httpService: HttpService){}

  ngOnInit(){
    this.getTasksFromService();
  }

  tasks = []
  getTasksFromService(){
    let observable = this._httpService.getTasks()
    observable.subscribe(data=> {
      console.log("Got our data!", data)
      this.tasks = data['tasks']

    })
  }
}
