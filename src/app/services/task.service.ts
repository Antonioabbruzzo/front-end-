import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../module/task.modul';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:3000/tasks';
  tast: Task[] = [];
  constructor(private http: HttpClient) { }



  getAllTask() {
    return this.http.get(this.baseUrl);
  }


  postTask(body: Task) {
    return this.http.post(this.baseUrl, body);
  }

  deletePost(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  patchTask(id: number, body: Task) {
    return this.http.patch(`${this.baseUrl}/${id}`, body);
  }
}
