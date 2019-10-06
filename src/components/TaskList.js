import React from 'react';

const TaskItem = ({ task, onClick, className }) => (
  <li key={task.task}>
    <button className="task" onClick={() => onClick(task)}>
      <span className={className} />
      {task.task} ({task.id})
    </button>
  </li>
);

const TaskList = ({ tasks, indegree, ...rest }) => (
  <div>
    <ul>
      {tasks.map((t, i) => {
        const isCompleted = t.completedAt;
        const isLock = indegree[t.id] !== 0;
        const className = isLock
          ? 'lock'
          : isCompleted
          ? 'completed'
          : 'incompleted';

        return (
          <TaskItem key={t.task} task={t} className={className} {...rest} />
        );
      })}
    </ul>
  </div>
);

export default TaskList;
