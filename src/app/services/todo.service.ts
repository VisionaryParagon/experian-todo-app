import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class User {
  details: UserDetails;
  lists: TodoList[];
  items?: TodoItem[];

  constructor() {
    this.details = new UserDetails();
    this.lists = new Array<TodoList>();
  }
}

export class UserDetails {
  firstName: string;
  lastName: string;
  image?: string;
}

export class TodoList {
  id: string;
  name: string;
  slug: string;

  constructor() {
    this.id = Math.random().toString(36).substr(2, 10);
    this.name = '';
    this.slug = '';
  }
}

export class TodoItem {
  id: string;
  description: string;
  list: string;
  archived: boolean;

  constructor() {
    this.id = Math.random().toString(36).substr(2, 10);
    this.archived = false;
  }
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  user: User = {
    details: {
      firstName: 'Stephen',
      lastName: 'Dickens',
      image: '../../assets/images/stephen-dickens.jpg'
    },
    lists: [
      {
        id: 'j657r8p9te',
        name: 'Groceries',
        slug: 'groceries'
      },
      {
        id: 'j657r8p9tf',
        name: 'Chores',
        slug: 'chores'
      },
      {
        id: 'j657r8p9tg',
        name: 'Christmas Shopping',
        slug: 'christmas-shopping'
      }
    ],
    items: [
      {
        id: '91nzf4gelf',
        description: 'Apples',
        list: 'Groceries',
        archived: false
      },
      {
        id: '91nzf4gelg',
        description: 'Bananas',
        list: 'Groceries',
        archived: false
      },
      {
        id: '91nzf4gelh',
        description: 'Crepes',
        list: 'Groceries',
        archived: false
      },
      {
        id: '91nzf4geli',
        description: 'Doritos',
        list: 'Groceries',
        archived: false
      },
      {
        id: 'hp66sqq3y7',
        description: 'Vacuum',
        list: 'Chores',
        archived: false
      },
      {
        id: 'h6xf8c7h4q',
        description: 'Slippers for mom',
        list: 'Christmas Shopping',
        archived: false
      },
      {
        id: 'h6xf8c7h4r',
        description: 'Sweater for dad',
        list: 'Christmas Shopping',
        archived: false
      }
    ]
  }

  constructor() { }

  // User
  getUser() {
    return new Observable<User>(observer => {
      observer.next(this.user);
      observer.complete();
      observer.error('Could not get user');
    });
  }

  // Lists
  validateList(name) {
    return new Observable<TodoList>(observer => {
      observer.next(this.user.lists.filter(list => list.name.toLowerCase() === name.toLowerCase())[0]);
      observer.complete();
      observer.error('Could not validate list');
    });
  }

  getLists() {
    return new Observable<TodoList[]>(observer => {
      observer.next(this.user.lists);
      observer.complete();
      observer.error('Could not get lists');
    });
  }

  getList(slug) {
    return new Observable<TodoList>(observer => {
      observer.next(this.user.lists.filter(list => list.slug === slug)[0]);
      observer.complete();
      observer.error('Could not get list');
    });
  }

  addList(data) {
    return new Observable<TodoList>(observer => {
      this.user.lists.push(data);
      observer.next(this.user.lists.find(list => list.id === data.id));
      observer.complete();
      observer.error('Could not add list');
    });
  }

  deleteList(data) {
    return new Observable<TodoList>(observer => {
      const idx = this.user.lists.findIndex(list => list.id === data.id);
      if (idx > -1) {
        this.user.lists.splice(idx, 1);
      }
      observer.next(data);
      observer.complete();
      observer.error('Could not delete list');
    });
  }

  // Items
  validateItem(data) {
    return new Observable<TodoItem>(observer => {
      const val = this.user.items
        .filter(item => item.list === data.list)
        .filter(item => item.description.toLowerCase() === data.description.toLowerCase());
      observer.next(val[0]);
      observer.complete();
      observer.error('Could not validate item');
    });
  }

  getItems() {
    return new Observable<TodoItem[]>(observer => {
      observer.next(this.user.items);
      observer.complete();
      observer.error('Could not get items');
    });
  }

  addItem(data) {
    return new Observable<TodoItem>(observer => {
      this.user.items.push(data);
      observer.next(this.user.items.find(item => item.id === data.id));
      observer.complete();
      observer.error('Could not add item');
    });
  }
  
  updateItem(data) {
    return new Observable<TodoItem>(observer => {
      const item = this.user.items.find(item => item.id === data.id);
      if (item) {
        item.description = data.description;
      }
      observer.next(item);
      observer.complete();
      observer.error('Could not update item');
    });
  }
  
  archiveItems(data) {
    return new Observable<TodoItem[]>(observer => {
      data.forEach(item => {
        this.user.items.find(i => i.id === item.id).archived = true;
      });
      observer.next(this.user.items);
      observer.complete();
      observer.error('Could not archive items');
    });
  }
  
  unarchiveItems(data) {
    return new Observable<TodoItem[]>(observer => {
      data.forEach(item => {
        this.user.items.find(i => i.id === item.id).archived = false;
      });
      observer.next(this.user.items);
      observer.complete();
      observer.error('Could not archive item');
    });
  }
  
  deleteItems(data) {
    return new Observable<TodoItem[]>(observer => {
      data.forEach(item => {
        const idx = this.user.items.findIndex(i => i.id === item.id);
        if (idx > -1) {
          this.user.items.splice(idx, 1);
        }
      });
      observer.next(this.user.items);
      observer.complete();
      observer.error('Could not archive item');
    });
  }
}
