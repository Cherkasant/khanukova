export type TaskType = {
  milestone_name: string
  description: string
  attachment: string | null
  responsible: Array<string>
  priority: string
  start_date: string
  deadline: string
  duration: number
  labels: string
  color_labels: string
  dependence: Array<string>
  progress: number
  status: string
  payment_status: string
  project: string
}

export type TaskTypeWithID = {
  id: number
  milestone_name: string
  description: string
  attachment: string | null
  responsible: Array<string> | []
  priority: string
  start_date: string
  deadline: string
  duration: number
  labels: string
  color_labels: string
  dependence: Array<string> | []
  progress: number
  status: string
  payment_status: string
  project: string
}
// "milestone_name": "string",
//     "description": "string",
//     "attachment": "string",
//     "responsible": [
//   "string"
// ],
//     "priority": "string",
//     "start_date": "string",
//     "deadline": "string",
//     "labels": "string",
//     "color_labels": "string",
//     "dependence": [
//   "string"
// ],
//     "status": "string",
//     "payment_status": "string",
//     "project": "string"

export type CardTaskType = Array<TaskTypeWithID>

export type TaskFormPayload = {
  data: TaskType
  callback: () => void
}
