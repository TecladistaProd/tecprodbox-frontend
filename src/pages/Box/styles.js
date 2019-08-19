import s from 'styled-components'

export const Container = s.div`
  max-width: 900px;
  padding-top: 50px;
  margin: 0 auto 0;
    
  header {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  header h1 {
    font-size: 21px;
    padding-left: 15px;
    margin-left: 15px;
    border-left: 1px solid #ddd;
  }

  header button svg {
    margin-right: 10px;
  }

  header button:hover {
    opacity: 0.9;
  }

  .upload {
    border-radius: 4px;
    padding: 30px;
    text-align: center;
    border: 1px dashed #ddd;
    color: #999;
    cursor: pointer;
    max-width: 90%;
    margin: 50px auto;
  }

  ul {
    margin: 30px 0;
    list-style: none;
  }

  ul li {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  ul li + li {
    padding-top: 20px;
    margin-top: 20px;
    border-top: 1px solid #eee;
  }

  ul li .file-info {
    display: flex;
    align-items: center;
    text-decoration: none;
  }

  ul li .file-info strong {
    font-weight: normal;
    font-size: 14px;
    margin-left: 10px;
    color: #333;
  }

  ul li span {
    color: #999;
    font-size: 13px;
  }

  ul li span button {
    margin: 0 0 0 7px;
    border: 1px solid rgba(75, 75, 75, .025);
    border-radius: 50%;
    width: 30px;
    height: 30px;
  }

  ul li span button:hover {
    opacity: .7;
  }

  ul li span button.edit {
    background: #329dcd;
  }

  ul li span button.delete {
    background: #dd233c;
  }
  
  .fab {
    background: #7159c1;
    border: none;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    position: absolute;
    bottom: 30px;
    right: 40px;
  }
  .fab:hover {
    opacity: .7;
  }

  .edit-file {
    margin-top: 15px;
    display: flex;
    align-items: stretch;
    width: 100%;
    flex-direction: column;
  }

  .edit-file input, .edit-file button {
    height: 48px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    padding: 0 20px;
    margin-top: 30px;
  }

  .edit-file button {
    margin-top: 10px;
    background: #7159c1;
    color: #fff;
    font-weight: bold;
    border: 0;
  }

  .edit-file button:hover {
    opacity: .7
  }
`