import React from 'react';

const Header = ({ title, onClick, hasActiveGroup }) => (
  <div style={wrapper}>
    <h1 style={header}>{title}</h1>
    {hasActiveGroup ? (
      <button style={button} onClick={onClick}>
        ALL GROUPS
      </button>
    ) : null}
    <hr style={hr} />
  </div>
);

export default Header;

const wrapper = {
  marginTop: '20px'
};
const button = {
  float: 'right',
  height: '39px',
  fontSize: '12px',
  color: '#6666FF'
};
const header = {
  display: 'inline-block',
  fontWeight: 300,
  margin: 0
};
const hr = {
  opacity: 0.5
};
