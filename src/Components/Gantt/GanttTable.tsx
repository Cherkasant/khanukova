import 'gantt-task-react-pro/dist/index.css';
import { GanttComponent, TaskFieldsModel } from '@syncfusion/ej2-react-gantt';

import { GanttData } from './data';

const GanttTable = () => {
  const taskValues: TaskFieldsModel = {
    id: 'TaskID',
    name: 'Tasks',
    duration: 'Duration',
    progress: 'Progress',
    child: 'subtasks'
  };

  return (
    <GanttComponent
      dataSource={GanttData}
      taskFields={taskValues}
      timelineSettings={{ timelineViewMode: 'Week' }}
      showColumnMenu={true}></GanttComponent>
  );
};
export default GanttTable;
