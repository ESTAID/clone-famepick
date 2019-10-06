import React from 'react';

const Header = ({ title, onClick, hasActiveGroup }) => (
  <div>
    <h1>{title}</h1>
    {hasActiveGroup ? <button onClick={onClick}>ALL GROUPS</button> : null}
  </div>
);

export default Header;
