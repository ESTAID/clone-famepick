import React from 'react';

const GroupItem = ({ group, onClick, index }) => (
  <div style={wrapper}>
    <span style={arrow} />
    <button style={button} onClick={() => onClick(group, index)}>
      {group.name}
    </button>
    <hr />
  </div>
);

const GroupList = ({ groups, ...rest }) =>
  groups.map((g, i) => (
    <div key={g.name}>
      <GroupItem group={g} index={i} {...rest} />
      <hr style={hr} />
    </div>
  ));

export default GroupList;

const wrapper = {
  margin: '10px',
  height: '50px',
  display: 'flex',
  alignItems: 'center'
};

const arrow = {
  background: 'url(/right-arrow.svg)',
  backgroundRepeat: 'no-repeat',
  width: '8px',
  height: '8px',
  display: 'inline-block'
};

const button = {
  fontSize: '15px',
  fontWeight: 400
};

const hr = {
  opacity: 0.5
};
