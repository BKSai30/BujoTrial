export interface Reminder {
  id: number;
  title: string;
  description: string;
  type: string;
  petName: string;
  dueDateTime: string;
  completed: boolean;
  createdAt: string;
}
