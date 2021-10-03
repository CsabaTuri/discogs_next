import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html,body {
    max-width: 100%;
    overflow-x: hidden;
    background-color: ${(props) => props.theme.bg};
  }
  body{
    background-color: ${(props) => props.theme.bg};
    color: ${(props) => props.theme.fg};
    font-family: Open-Sans, Helvetica, Sans-Serif;
    font-weight:100;
  
  }
a,th,td{
  color: ${(props) => props.theme.fg};
  margin:1em;
  word-break: break-all;
  &:active{
    color: ${(props) => props.theme.fg};
  }
  &:hover{
    color: ${(props) => props.theme.fg};
  }
}
button{
  margin:1em
}
.video-container {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%;
}
.video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
#chat-div {
  position: fixed;
  z-index: 10;
  bottom: 2em;
  background: ${(props) => props.theme.bg}; 
  border: thin solid ${(props) => props.theme.fg}
}
#chat {
  /* width */
::-webkit-scrollbar {
  width: 3px;
}

/* Track */
::-webkit-scrollbar-track {
  background: ${(props) => props.theme.bg}; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #0dcaf0; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #0dcaf0; 
}
}

  `;

export default GlobalStyle;
