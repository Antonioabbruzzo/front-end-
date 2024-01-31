import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Task } from 'src/app/module/task.modul';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  taskAdd: Task = {
    id: 0,
    title: '',
    description: '',
    completed: false
  };

  showTaskAdd: Boolean = false;

  constructor(private taskService: TaskService) { }
  ngOnInit(): void {
    this.getTask();
  }
  taskForm = new FormGroup({
    id: new FormControl(0),
    title: new FormControl(''),
    description: new FormControl(''),
    completed: new FormControl(false)
  });

  changeTitle(index: number) {
    this.showTaskAdd = !this.showTaskAdd;
  }

  pathTask(id: number) {
    const taskToComplete = this.tasks.find((task) => task.id == id);
    taskToComplete!.completed = !taskToComplete?.completed;
    this.taskService.patchTask(id, taskToComplete as Task).subscribe(() => {
      this.getTask();
    });
  }

  pathBody(id: number) {
    const taskToComplete = this.tasks.find((task) => task.id == id);
    taskToComplete!.description = this.taskForm?.value.description as string;
    taskToComplete!.title = this.taskForm?.value.title as string;
    this.taskService.patchTask(id, taskToComplete as Task).subscribe(() => {
      this.getTask();
    });
  }

  getTask() {
    this.taskService.getAllTask().subscribe({
      next: (res: any) => {
        this.tasks = res;
      }
    });
  }



  addPost() {
    this.taskAdd = this.taskForm.value as Task;
    this.taskService.postTask(this.taskAdd).subscribe(() => {
      this.getTask();
    });
  }

  deletePostById(id: number) {
    this.taskService.deletePost(id).subscribe(() => {
      console.log('post eliminato');
      this.getTask();
    }

    );
  }
}
