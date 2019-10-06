import React, { Component } from 'react';
import './App.css';
import getData from './api';
import Header from './components/Header';
import GroupList from './components/GroupList';
import TaskList from './components/TaskList';

export default class App extends Component {
  state = {
    data: [],
    groups: [],
    dependencies: [],
    indegree: [],
    title: 'Things To Do'
  };

  componentDidMount() {
    getData().then(res => {
      const groups = setGroups(res);
      const indegree = setIndegree(res);
      const dependencies = setDependencies(res);

      this.setState({
        ...this.state,
        data: res,
        groups,
        indegree,
        dependencies
      });
    });
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  handleGroupNameClick = ev => {
    const groupName = ev.target.value;
    const groups = this.state.groups;

    groups.map(setAllClear).find(g => g.name === groupName).active = true;

    this.setState({
      ...this.state,
      title: groupName,
      groups
    });
  };

  handleAllGroupsClick = () => {
    const groups = this.state.groups;

    this.setState({
      ...this.state,
      groups: groups.map(setAllClear),
      title: 'Things To Do'
    });
  };

  handleTaskClick = task => {
    const selectedId = Number(task.id);
    const copyState = [...this.state.data];
    const selectedTask = copyState.find(s => s.id === selectedId);

    selectedTask.completedAt =
      selectedTask.completedAt === null ? true : !selectedTask.completedAt;

    const indegree = this.computeIndegree(copyState, selectedId);

    this.setState({
      ...this.state,
      data: copyState,
      indegree
    });
  };

  computeIndegree = (state, id) => {
    const copyIndegree = [...this.state.indegree];
    const selectedDependency = this.state.dependencies[id];

    selectedDependency.forEach(dependency => {
      if (copyIndegree[dependency] > 0) {
        if (state[id].completedAt === true) {
          copyIndegree[dependency] -= 1;
        } else {
          copyIndegree[dependency] += 1;
        }
      }
    });

    return copyIndegree;
  };

  getActiveGroup = () => {
    const activeGroup = this.state.groups.find(g => g.active);

    if (activeGroup) {
      return this.state.data.filter(d => d.group === activeGroup.name);
    }

    return [];
  };

  render() {
    const activeGroup = this.getActiveGroup();
    const hasActiveGroup = !!activeGroup.length;

    return (
      <div>
        <Header
          title={this.state.title}
          onClick={this.handleAllGroupsClick}
          hasActiveGroup={hasActiveGroup}
        />
        {hasActiveGroup ? (
          <TaskList
            tasks={activeGroup}
            onClick={this.handleTaskClick}
            indegree={this.state.indegree}
          />
        ) : (
          <GroupList
            groups={this.state.groups}
            onClick={this.handleGroupNameClick}
          />
        )}
      </div>
    );
  }
}

//utils
const setGroups = data => {
  const sortedGroupName = data.reduce((acc, curr) => {
    return { ...acc, [curr.group]: true };
  }, {});

  return Object.keys(sortedGroupName).map(groupName => ({
    name: groupName,
    active: false
  }));
};

const setDependencies = data => {
  const dependencies = [];
  for (let i = 0; i < data.length; i++) {
    const ids = data[i].dependencyIds;
    dependencies[i] = [];
    for (let j = 0; j < ids.length; j++) {
      dependencies[ids[j]].push(data[i].id);
    }
  }

  return dependencies;
};

const setIndegree = data => {
  return data.map(res => res.dependencyIds.length);
};

const setAllClear = group => {
  group.active = false;
  return group;
};
