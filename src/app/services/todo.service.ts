import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class TodoList {
  _id: string;
  name: string;

  constructor() {
    this._id = Math.random().toString(36).substr(2, 10);
  }
}

export class TodoTask {
  _id: string;
  description: string;
  list: string;
  archived: boolean;

  constructor() {
    this._id = Math.random().toString(36).substr(2, 10);
    this.archived = false;
  }
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  lists: TodoList[] = [
    {
      _id: 'j657r8p9te',
      name: 'Grocery Shopping'
    }
  ];
  tasks: TodoTask[] = [
    {
      _id: '91nzf4gelf',
      description: 'Ground Beef',
      list: 'Grocery Shopping',
      archived: false
    },
    {
      _id: 'hp66sqq3y7',
      description: 'Taco Seasoning',
      list: 'Grocery Shopping',
      archived: false
    },
    {
      _id: 'h6xf8c7h4q',
      description: 'Tortillas',
      list: 'Grocery Shopping',
      archived: false
    }
  ];

  constructor() { }

  // Lists
  getLists() {
    return new Observable<TodoList[]>(observer => {
      observer.next(this.lists);
      observer.complete();
      observer.error('Could not get lists');
    });
  }

  addList(data) {
    return new Observable<TodoList>(observer => {
      this.lists.push(data);
      observer.next(this.lists.find(list => list._id === data._id));
      observer.complete();
      observer.error('Could not add list');
    });
  }

  deleteList(data) {
    return new Observable<TodoList>(observer => {
      const idx = this.lists.findIndex(list => list._id === data._id);
      if (idx > -1) {
        this.lists.splice(idx, 1);
      }
      observer.next(data);
      observer.complete();
      observer.error('Could not delete list');
    });
  }

  // Tasks
  getTasks() {
    return new Observable<TodoTask[]>(observer => {
      observer.next(this.tasks);
      observer.complete();
      observer.error('Could not get tasks');
    });
  }

  addTask(data) {
    return new Observable<TodoTask>(observer => {
      this.tasks.push(data);
      observer.next(this.tasks.find(task => task._id === data._id));
      observer.complete();
      observer.error('Could not add task');
    });
  }
  
  updateTask(data) {
    return new Observable<TodoTask>(observer => {
      const task = this.tasks.find(task => task._id === data._id);
      if (task) {
        task.description = data.description;
      }
      observer.next(task);
      observer.complete();
      observer.error('Could not update task');
    });
  }
  
  archiveTask(data) {
    return new Observable<TodoTask>(observer => {
      const task = this.tasks.find(task => task._id === data._id);
      if (task) {
        task.archived = true;
      }
      observer.next(task);
      observer.complete();
      observer.error('Could not archive task');
    });
  }
  
  unarchiveTask(data) {
    return new Observable<TodoTask>(observer => {
      const task = this.tasks.find(task => task._id === data._id);
      if (task) {
        task.archived = false;
      }
      observer.next(task);
      observer.complete();
      observer.error('Could not archive task');
    });
  }
  
  deleteTask(data) {
    return new Observable<TodoTask>(observer => {
      const idx = this.tasks.findIndex(task => task._id === data._id);
      if (idx > -1) {
        this.tasks.splice(idx, 1);
      }
      observer.next(data);
      observer.complete();
      observer.error('Could not archive task');
    });
  }
}
