import React, { Component } from 'react';
import api from '../../services/api'

import './styles.css';

import logo from '../../assets/logo.svg'

class Main extends Component {
  state = {
    box_name: ''
  };

  handleSubmit = async e => {
    e.preventDefault();
    
    const response = await api.post('boxes', {
      title: this.state.box_name
    });

    this.setState({ box_name: '' });
    
    this.props.history.push(`/box/${response.data._id}`)
  };
  
  handleInputChange = ({target: { value: box_name }}) => {
    this.setState({ box_name });
  };

  render() {
    return (
      <div id="main-container">
        <form onSubmit={this.handleSubmit}>
          <img src={logo} alt=""/>
          <input
            placeholder="Create a Box"
            required={true}
            value={this.state.box_name}
            onChange={this.handleInputChange}
          />
          <button type="submit">Create</button>
        </form>
      </div>
    );
  };
}

export default Main