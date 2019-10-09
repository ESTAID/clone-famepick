import React from 'react';

const TodoItem = ({ todo, onClick, style }) => (
  <li style={list} key={todo.task}>
    <span style={style.span} />
    <button style={style.button} onClick={() => onClick(todo)}>
      {todo.task} ({todo.id})
    </button>
  </li>
);

const TodoList = ({ todos, indegree, ...rest }) => (
  <div>
    <ul style={ul}>
      {todos.map((t, i) => {
        const isCompleted = t.completedAt;
        const isLock = indegree[t.id] !== 0;
        const style = {
          span: isLock ? lock : isCompleted ? completed : incompleted,
          button: button(isLock, isCompleted)
        };

        return <TodoItem key={t.task} todo={t} style={style} {...rest} />;
      })}
    </ul>
  </div>
);

export default TodoList;

const ul = {
  margin: '0px 10px',
  padding: '0'
};

const list = {
  listStyle: 'none',
  display: 'flex',
  alignItems: 'center',
  height: '50px'
};

const button = (isLock, isCompleted) => ({
  background: 'none',
  fontSize: '15px',
  fontWeight: 400,
  marginLeft: '5px',
  borderColor: 'white',
  color: isLock ? 'gray' : 'black',
  textDecoration: isCompleted ? 'line-through' : 'none'
});

const lock = {
  background: 'url(/locked.svg)',
  backgroundRepeat: 'no-repeat',
  width: '20px',
  height: '20px',
  display: 'inline-block'
};

const incompleted = {
  background: 'url(/incomplete.svg)',
  backgroundRepeat: 'no-repeat',
  width: '20px',
  height: '20px',
  display: 'inline-block'
};

const completed = {
  background: 'url(/completed.svg)',
  backgroundRepeat: 'no-repeat',
  width: '20px',
  height: '20px',
  display: 'inline-block'
};
