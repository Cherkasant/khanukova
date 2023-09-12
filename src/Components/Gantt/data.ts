export const GanttData = [
  {
    TaskID: 1,
    Tasks: 'Project Initiation',
    StartDate: new Date('04/02/2019'),
    EndDate: new Date('04/21/2019'),
    subtasks: [
      { TaskID: 2, Tasks: 'Identify Site location', StartDate: new Date('04/02/2019'), Duration: 4, Progress: 50 },
      {
        TaskID: 3,
        Tasks: 'Perform Soil test',
        StartDate: new Date('04/02/2019'),
        Duration: 4,
        Progress: 50,
        Predeceesor: '2FS'
      },
      { TaskID: 4, Tasks: 'Soil test approval', StartDate: new Date('04/02/2019'), Duration: 4, Progress: 50 }
    ]
  },
  {
    TaskID: 5,
    Tasks: 'Project Estimation',
    StartDate: new Date('04/02/2019'),
    EndDate: new Date('04/21/2019'),
    subtasks: [
      {
        TaskID: 6,
        Tasks: 'Develop floor plan for estimation',
        StartDate: new Date('04/04/2019'),
        Duration: 3,
        Progress: 50
      },
      { TaskID: 7, Tasks: 'List materials', StartDate: new Date('04/04/2019'), Duration: 3, Progress: 50 },
      { TaskID: 8, Tasks: 'Estimation approval', StartDate: new Date('04/04/2019'), Duration: 3, Progress: 50 }
    ]
  }
];
