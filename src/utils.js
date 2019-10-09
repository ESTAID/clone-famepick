export const normalizeGroups = data => {
  const sortedGroupName = data.reduce((acc, curr) => {
    return { ...acc, [curr.group]: true };
  }, {});

  return Object.keys(sortedGroupName).map(groupName => ({
    name: groupName,
    active: false
  }));
};

export const setDependencies = data => {
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

export const setIndegree = data => {
  return data.map(res => res.dependencyIds.length);
};

export const setAllClear = group => {
  group.active = false;
  return group;
};
