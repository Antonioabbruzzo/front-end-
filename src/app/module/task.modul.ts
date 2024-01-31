export class Task {
  id: number | undefined;
  title: string;
  description: string;
  completed: boolean | undefined;

  constructor(t: Task) {

    this.id = t.id;
    this.completed = t.completed;
    this.description = t.description;
    this.title = t.title;
  }
}