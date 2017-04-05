import React from 'react';
import './Marker.css';

const Marker = function Marker(props) {
  return <div className="marker">{props.index}</div>;
};

Marker.propTypes = {
  Name: React.PropTypes.string.isRequired,
};

export default Marker;
