import React, { Component } from 'react';
import api from '../../services/api'
import socket from 'socket.io-client'

import { distanceInWords } from 'date-fns'
import en from 'date-fns/locale/en'
import Dropzone from 'react-dropzone'
import { MdInsertDriveFile, MdHome, MdEdit, MdDelete } from 'react-icons/md'

import logo from '../../assets/logo.svg'

import { Container } from './styles';

import Modal from '../../components/Modal'

class Box extends Component {
  state = {
    box: {},
    show: false,
    file: {},
    new_name: ''
  }

  async componentDidMount(){

    try{
      const { match: { params: { id: box_id } } } = this.props
      const { data: box } = await api.get(`boxes/${box_id}`)
      this.subscribeToNewFiles();
      this.setState({ box })
    } catch(err) {
      this.toHome()
    }
  }

  subscribeToNewFiles = () => {
    const { match: { params: { id: box_id } } } = this.props

    const io = socket('https://tecprodbox-backend.herokuapp.com')

    io.emit('connect_room', box_id)
  
    io.on('file', data => {
      this.setState({ box: { ...this.state.box, files: [data, ...this.state.box.files] } })
    });
    io.on('remove', _id => {
      const {box} = this.state;
      box.files = box.files.filter(i => i._id !== _id);
      this.setState({box});
    });
    io.on('changed', file => {
      const {box} = this.state;
      let index = box.files.findIndex(i => i._id === file._id);
      box.files[index] = file;
      this.setState({box});
    });
  }

  handleUpload = async (files) => {
    for(let file of files) {
      const { box } = this.state

      const data = new FormData();

      data.append('file', file)
      try{
        await api.post(`boxes/${box._id}/files`, data)
      } catch(err) {
        console.log(err.message)
      }
    }
  }

  fileDelete = async _id => {
    try{
      await api.delete(`files/${_id}`);
    }catch(err) {
      return null
    }
  }

  toHome = () => {
    localStorage.removeItem('box')
    this.props.history.push('/')
  }

  handleInputName = ({ target: { value: new_name } }) => {
    this.setState({new_name})
  }

  changeName = async () => {
    if (this.state.new_name && typeof this.state.new_name === 'string') {
      try {
        await api.put(`files/${this.state.file._id}`, {
          new_name: `${this.state.new_name}.${this.state.file.title.split('.')[1]}`,
        });
      } catch (err) {} finally {
        this.setState({ new_name: '', file: {}, show: false})
      }
    }
  }

  render(){
    const { box } = this.state;

    return (
      <Container>
        <header>
          <img src={logo} alt="logo"/>
          <h1>{ box.title }</h1>
        </header>
        <Dropzone onDropAccepted={this.handleUpload}>
          {
            ({getRootProps, getInputProps}) => (
              <div className="upload" {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag files in your pc and drop here</p>
              </div>
            )
          }
        </Dropzone>
        <ul>
          {
            box.files && box.files.map(file => (<li key={file._id}>
              <a className="file-info" href={file.url} target="_blank">
                <MdInsertDriveFile size={24} color="#a5cfff"/>
                <strong>{file.title}</strong>
              </a>
              <span>
                <span>{distanceInWords(file.createdAt, new Date(), { locale: en } )} ago</span>
                <button onClick={() => this.setState({ show: true, file })} className="edit" type="button"><MdEdit size={18} color="#fff"/></button>
                <button onClick={() => this.fileDelete(file._id)} className="delete" type="button"><MdDelete size={18} color="#fff"/></button>
              </span>
            </li>))
          }
        </ul>
        <button onClick={this.toHome} className="fab"><MdHome size={24} color="#fff"/></button>
        <Modal show={this.state.show} close={() => this.setState({show: false})}>
          <div className="edit-file">
            <h2>{this.state.file.title &&
              this.state.file.title.split('.')[0]}</h2>
            <input value={this.state.new_name} onChange={this.handleInputName} placeholder="New Name"/>
            <button onClick={this.changeName}>Change</button>
          </div>
        </Modal>
      </Container>
    );
  };
}

export default Box;
