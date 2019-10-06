import React from 'react';

const GroupItem = ({ group, onClick }) => (
  <section>
    <button onClick={onClick} value={group.name}>
      {group.name}
    </button>
  </section>
);

const GroupList = ({ groups, ...rest }) =>
  groups.map(g => <GroupItem key={g.name} group={g} {...rest} />);

export default GroupList;
