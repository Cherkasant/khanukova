export enum TableColumns {
  item = 'Item',
  dependence = 'Dependence',
  status = 'Status',
  label = 'Labels',
  responsible = 'Responsible',
  duration = 'Duration',
  launchDate = 'Launch date',
  deadline = 'Deadline',
  priority = 'Priority',
  progress = 'Progress'
}

export enum Status {
  ToDo = 'To Do',
  InProgress = 'In progress',
  Delayed = 'Delayed',
  OnHold = 'On Hold',
  Canceled = 'Canceled',
  Ready = 'Ready for QA',
  Approved = 'Approved',
  NotApproved = 'Not Approved',
  Completed = 'Completed'
}

export enum Priority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High'
}
