// import React from 're\'
import s from 'styled-components';

export const Container = s.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  form {
    width: 300px;
    display: flex;
    flex-direction: column;
  }
  
  form input,
  form button {
    height: 48px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    padding: 0 20px;
    margin-top: 30px;
  }
  
  form button {
    margin-top: 10px;
    background: #7159c1;
    color: #fff;
    font-weight: bold;
    border: 0;
  }
  
  form button:hover {
    opacity: 0.8;
  }

  form button.created {
    background: #7f7fcf;
  }

  .list {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  .list .box-btn {
    height: 30px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    padding: 0 20px;
    margin-top: 10px;
    background: #7159c1;
    color: #fff;
    font-weight: bold;
    border: 0;
  }

  .list .box-btn:hover {
    opacity: .7
  }
  
`