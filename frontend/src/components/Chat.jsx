import React, { useState, useEffect, useRef } from 'react';
import { db } from '../firebase/config';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { FaPaperPlane, FaTimes } from 'react-icons/fa';

const Chat = ({ tripId, onClose }) => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Listen for new messages
  useEffect(() => {
    if (!tripId) return;

    const messagesRef = collection(db, 'chats', tripId, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push({ id: doc.id, ...doc.data() });
      });
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [tripId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '' || !tripId || !currentUser) return;

    const messagesRef = collection(db, 'chats', tripId, 'messages');

    try {
      await addDoc(messagesRef, {
        text: newMessage,
        senderId: currentUser.uid,
        senderName: currentUser.displayName || 'User',
        timestamp: serverTimestamp(),
      });
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    return new Date(timestamp.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[500px] bg-white rounded-lg shadow-2xl flex flex-col z-50">
      {/* Header */}
      <div className="flex justify-between items-center p-3 bg-primary text-white rounded-t-lg">
        <h3 className="font-bold text-lg">Chat del Viaje</h3>
        <button onClick={onClose} className="text-xl hover:text-gray-200">
          <FaTimes />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex mb-3 ${msg.senderId === currentUser.uid ? 'justify-end' : 'justify-start'}`}>
            <div className={`rounded-lg px-3 py-2 max-w-xs ${msg.senderId === currentUser.uid ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
              <p className="text-sm font-bold mb-1">{msg.senderName}</p>
              <p className="text-base">{msg.text}</p>
              <p className="text-xs text-right mt-1 opacity-75">{formatDate(msg.timestamp)}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-3 border-t flex items-center">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button type="submit" className="ml-3 bg-primary text-white p-3 rounded-full hover:bg-primary-dark disabled:bg-gray-400" disabled={!newMessage.trim()}>
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
};

export default Chat;
