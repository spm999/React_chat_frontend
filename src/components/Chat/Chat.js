import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import queryString from 'query-string';
import io from 'socket.io-client';

import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './Chat.css';
const ENDPOINT = 'http://localhost:5000';


let socket;

const Chat = () => {

  const location = useLocation();
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState('');
  // const ENDPOINT = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT, { transports: ['websocket', 'polling', 'flashsocket'] });

    setName(name);
    setRoom(room);
    socket.emit('join', { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });


    return () => {
      socket.disconnect();
      socket.off();

  }
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages(messages => [...messages, message]);
    });
    socket.on("roomData", ({ users }) => {
        setUsers(users);
    });
  }, []);



  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  return (
    <div className='outerContainer'>
      <div className='container'>
        <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <TextContainer users={users}/>
    </div>
  );
};

export default Chat;
