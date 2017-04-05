import React, {Component} from 'react';
import './Marker.css';
import Map from '../helpers/Map';

class Marker extends Component {
  constructor(props) {
    super(props);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onClick = this.onClick.bind(this);
    this.state = {
      showName: false,
      favorite: props.favorite
    };
  }
  onMouseEnter() {
    this.setState({
      showName: true,
    });
  }
  onMouseLeave() {
    this.setState({
      showName: false,
    });
  }
  onClick() {
    if(!this.state.favorite) {
      this.setState({
        favorite: true
      });
      Map.addToFavs(this.props.Name);
    }
  }
  render() {
    const data = {...this.props};
    const style = {visibility: this.state.showName ? 'visible' : 'hidden'};
    const className = `marker ${this.state.favorite ? 'favorite' : ''}`;
    return (
      <div
        className={className}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onClick={this.onClick}
      >
        <div>{data.index + 1}</div>
        <div style={style} className="tooltiptext">
          {data.Name}
        </div>
      </div>
    );
  }
}

Marker.propTypes = {
  index: React.PropTypes.number.isRequired,
};

export default Marker;
