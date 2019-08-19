import s from 'styled-components';

export const ModalContainer = s.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(20,21,22, .7);
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  animation: toUp 500ms ease-in-out;
  z-index: 2;
  @keyframes toUp {
    0% {
      top: 3000px;
      opacity: 0;
    }
    75% {
      opacity: 1;
    }
    100% {
      top: 0px;
    }
  }
  .box {
    position: relative;
    align-self: center;
    width: 520px;
    max-width: 90%;
    height: 230px;
    padding: 1rem;
    border-radius: 10px;
    background-color: #fff;
    border: 1px solid #eee;
  }
  .close:first-child {
    background: none;
    color: #989898;
    font-weight: bold;
    border: none;
    position: absolute;
    top: 10px;
    right: 16px;
  }
  .close:first-child:hover {
    opacity: .75;
  }
`