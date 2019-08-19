import React, { Component } from 'react';
import api from '../../services/api'

import { Container } from './styles'

import logo from '../../assets/logo.svg'

import Modal from '../../components/Modal'

class Main extends Component {
  state = {
    box_name: '',
    show: false,
    boxes: []
  };

  async componentDidMount() {
    const box_id = localStorage.getItem('box')
    const {data: boxes} = await api.get('boxes');

    if (box_id) {
      this.openBox(box_id);
    } else {
      this.setState({boxes});
    }
  }

  handleSubmit = async e => {
    e.preventDefault();
    
    const response = await api.post('boxes', {
      title: this.state.box_name
    });

    this.setState({ box_name: '' });
    
    this.openBox(response.data._id)
  };
  
  handleInputChange = ({target: { value: box_name }}) => {
    this.setState({ box_name });
  };

  openBox = (_id) => {
    localStorage.setItem('box', _id)
    this.props.history.push(`/box/${_id}`)
  }

  render() {
    return (
      <Container>
        <form onSubmit={this.handleSubmit}>
          <img src={logo} alt=""/>
          <input
            placeholder="Create a Box"
            required={true}
            value={this.state.box_name}
            onChange={this.handleInputChange}
          />
          <button type="submit">Create</button>
          <button onClick={() => this.setState({show: true})} type="button" className="created">Created Boxes</button>
        </form>
        <Modal
          close={() => this.setState({show: false})}
          show={this.state.show}>
          <div className="list">
            <h1>List of Boxes</h1>
            {
              this.state.boxes.map(i => <button className="box-btn" type="button" onClick={() => this.openBox(i._id)} key={i._id}>{i.title}</button>)
            }
          </div>
        </Modal>
      </Container>
    );
  };
}

export default Main