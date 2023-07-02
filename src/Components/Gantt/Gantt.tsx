import { GanttComponent, TaskFieldsModel } from '@syncfusion/ej2-react-gantt';

import { GanttData } from './data';

const Gantt = () => {
  const taskValues: TaskFieldsModel = {
    id: 'TaskID',
    name: 'TaskName',
    duration: 'Duration',
    progress: 'Progress',
    child: 'subtasks',
    dependency: 'Predeceesor'
  };
  return (
    <GanttComponent
      dataSource={GanttData}
      taskFields={taskValues}
      timelineSettings={{ timelineViewMode: 'Week' }}></GanttComponent>
  );
};
export default Gantt;
