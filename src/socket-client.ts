import { Manager, Socket } from 'socket.io-client';

let socket:Socket;

export const connectToServer = ( token:string ) =>{
    
    const manager = new Manager('https://teslo-shop-production-1aa2.up.railway.app/socket.io/socket.io.js', {
        extraHeaders:{
            authentication: token
        }
    });

    socket?.removeAllListeners();
    socket = manager.socket('/');
    console.log("🚀 ~ file: socket-client.ts:7 ~ connectToServer ~ socket:", socket);
    
    addListeners();
    
}

const addListeners = () =>{
    const serverStatusLabel = document.querySelector("#server-status")!;
    const clientUl = document.querySelector("#client-ul")!;
    const messageForm = document.querySelector<HTMLFormElement>("#message-form")!;
    const messageInput =document.querySelector<HTMLInputElement>("#message-input")!;

    const messagesUl = document.querySelector<HTMLUListElement>('#messages-ul')
    
    //socket.on es para escuchar el eventos del servidor
    //socket.emmit es para enviar u

    socket.on('connect', ()=>{
        serverStatusLabel.innerHTML = 'connected';
    });


    socket.on('disconnect', ()=>{
        serverStatusLabel.innerHTML = 'disconnected';
    })

    //clients-updated
    socket.on('clients-updated', (clients: string[])=>{
        console.log({clients})
        let clientsHtml = '';
        clients.forEach( clientId => {
            clientsHtml += `
                <li>${clientId}</li>
            `
        });

        clientUl.innerHTML = clientsHtml;
    });

    messageForm.addEventListener('submit', (event)=>{
        event.preventDefault();
        if(messageInput.value.trim().length <= 0) return;

        socket.emit('messages-from-client', { 
            id: 'Yo!!', 
            message: messageInput.value 
        })

        messageInput.value = '';
    })

    socket.on('messages-from-server', (payload: {fullName: string, message: string})=>{
        const newMessage = `
        <li>
            <strong> ${payload.fullName}</strong>
            <span>${payload.message}</span>
        </li>
        `

        const li = document.createElement('li');
        li.innerHTML = newMessage;

        messagesUl?.append( li );
    })
}