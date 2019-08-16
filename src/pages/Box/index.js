import React, { Component } from 'react';
import api from '../../services/api'
import socket from 'socket.io-client'

import { distanceInWords } from 'date-fns'
import en from 'date-fns/locale/en'
import Dropzone from 'react-dropzone'
import { MdInsertDriveFile } from 'react-icons/md'

import './styles.css';

import logo from '../../assets/logo.svg'

class Box extends Component {
  state = {
    box: {}
  }

  async componentDidMount(){
    this.subscribeToNewFiles();

    const { match: { params: { id: box_id } } } = this.props
    const { data: box } = await api.get(`boxes/${box_id}`)
    
    this.setState({ box })
  }

  subscribeToNewFiles = () => {
    const { match: { params: { id: box_id } } } = this.props

    const io = socket('https://tecprodbox-backend.herokuapp.com')

    io.emit('connect_room', box_id)
  
    io.on('file', data => {
      this.setState({ box: { ...this.state.box, files: [data, ...this.state.box.files] } })
    })
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

  render(){
    const { box } = this.state;

    return (
      <div id="box-container">
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
              <span>{distanceInWords(file.createdAt, new Date(), { locale: en } )} ago</span>
            </li>))
          }
        </ul>
      </div>
    );
  };
}

export default Box;
