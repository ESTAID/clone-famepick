import React, { Component } from 'react';
import './App.css';
import getData from './api';
import Header from './components/Header';
import GroupList from './components/GroupList';
import TodoList from './components/TodoList';

import * as util from './utils';
export default class App extends Component {
  state = {
    todos: [],
    byGroups: [],
    dependencies: [],
    indegree: [],
    title: ''
  };

  componentDidMount() {
    getData().then(res => {
      this.setState({
        ...this.state,
        todos: res,
        byGroups: util.normalizeGroups(res),
        indegree: util.setIndegree(res),
        dependencies: util.setDependencies(res)
      });
    });
  }

  componentDidUpdate(_, prevState) {
    console.log(this.state);
    this.updateTitle(prevState);
  }

  updateTitle = prevState => {
    const { byGroups } = this.state;

    if (!byGroups.length) {
      return;
    }

    if (prevState.byGroups !== byGroups) {
      const activeGroup = this.getActiveGroup();

      this.setState({
        ...this.state,
        title: activeGroup ? activeGroup.name : 'Things To Do'
      });
    }
  };

  handleGroupNameClick = (group, index) => {
    this.setState({
      ...this.state,
      byGroups: this.updateActiveGroup(index)
    });
  };

  updateActiveGroup = index => {
    const { byGroups } = this.state;
    const copy = [...byGroups];

    copy[index].active = true;

    return copy;
  };

  handleAllGroupsClick = () => {
    const { byGroups } = this.state;

    this.setState({
      ...this.state,
      byGroups: byGroups.map(util.setAllClear)
    });
  };

  handleTaskClick = task => {
    const { todos, indegree } = this.state;
    const copyTodos = [...todos];
    const selectedId = task.id;
    const selectedTodo = copyTodos.find(todo => todo.id === selectedId);
    const isLockTask = indegree[selectedId] !== 0;

    if (isLockTask) return;

    selectedTodo.completedAt =
      selectedTodo.completedAt === null ? true : !selectedTodo.completedAt;

    this.setState({
      ...this.state,
      todos: copyTodos,
      indegree: this.computeIndegree(copyTodos, selectedId)
    });
  };

  computeIndegree = (todos, id) => {
    const { indegree, dependencies } = this.state;
    const copyIndegree = [...indegree];
    const selectedDependency = dependencies[id];

    selectedDependency.forEach(dependency => {
      if (copyIndegree[dependency] > 0) {
        if (todos[id].completedAt === true) {
          copyIndegree[dependency] -= 1;
        } else {
          copyIndegree[dependency] += 1;
        }
      }
    });

    return copyIndegree;
  };

  getActiveGroup = () => {
    const activeGroup = this.state.byGroups.find(g => g.active);
    return activeGroup ? activeGroup : false;
  };

  getActiveTodos = activeGroup =>
    this.state.todos.filter(todo => todo.group === activeGroup.name);

  render() {
    const activeGroup = this.getActiveGroup();

    return (
      <div>
        <Header
          title={this.state.title}
          onClick={this.handleAllGroupsClick}
          hasActiveGroup={!!activeGroup}
        />
        {activeGroup ? (
          <TodoList
            todos={this.getActiveTodos(activeGroup)}
            onClick={this.handleTaskClick}
            indegree={this.state.indegree}
          />
        ) : (
          <GroupList
            groups={this.state.byGroups}
            onClick={this.handleGroupNameClick}
          />
        )}
      </div>
    );
  }
}
