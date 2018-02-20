import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showTasks: boolean;
  showHide: string;
  newTask: any;
  editTask: any; //EDIT STEP 0a
  showEdit: boolean;

  constructor(private _httpService: HttpService){}

  ngOnInit(){
    this.getTasksFromService();
    this.showTasks = false;
    this.showHide = "Show"
    this.showTasks = false;
    this.newTask = {title: "", description: ""}
    this.editTask = {title: "", description: ""} //EDIT STEP 0b
  }

  tasks = []
  getTasksFromService(){

    let observable = this._httpService.getTasks();
    observable.subscribe(data=> {
      console.log("Got our data!", data)
      this.tasks = data['tasks']

    })
  }

  onShowHideButton(){
    // this.getTasksFromService();
    if (this.showTasks == false){
      this.showTasks = true;
      this.showHide = "Hide"
    }
    else{
      this.showTasks = false;
      this.showHide = "Show";
    }

  }

  onCreateButton(){
    let observable = this._httpService.addTask(this.newTask);
    observable.subscribe(data=> {
      console.log("Got our data from post back!", data)
      this.newTask = {title: "", description: ""}
    })
    this.getTasksFromService()
  }

  onDeleteButton(ID){
    let observable = this._httpService.deleteTask(ID);
    observable.subscribe(data=> {
      console.log("Deleting post!", data)
    })
    this.getTasksFromService()
  }

  //EDIT STEP 2
  populateEditField(task){
    console.log(task)
    this.showEdit = true;
    this.editTask.id= task._id;
    this.editTask.title = task.title;
    this.editTask.description = task.description;
  }

  //EDIT STEP 4
  onEditButton(){
    let observable = this._httpService.updateTask(this.editTask);
    observable.subscribe(data=> {
      console.log("Editing post!", data)
      this.editTask = {title: "", description: ""};
    })
    this.showEdit = false;
    this.getTasksFromService()
  }
}
