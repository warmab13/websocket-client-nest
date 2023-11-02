import { connectToServer } from './socket-client'
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
   <h2>WebSocket - Client</h2>

   <input id="jwt-token" placeholder="Json web token"/>
   <button id="btn-connect">Connect</button>
   <br>
   <span id="server-status"> Offline </span>

   <ul id="client-ul">
    <li>No clients connected</li>
   </ul>

   <form id="message-form">
    <input placeholder="message" id="message-input" />
   </form>

   <h3>Messages</h3>
   <ul id="messages-ul">

   </ul>
  </div>
`

//connectToServer();

const jwtToken = document.querySelector<HTMLInputElement>('#jwt-token')!;
const btnConnect = document.querySelector<HTMLButtonElement>('#btn-connect');

btnConnect?.addEventListener('click', ()=>{
  if( jwtToken.value.trim().length <= 0) return alert('Enter a valid JWT');

  connectToServer(jwtToken.value.trim());
})