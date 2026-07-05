import React, { useState, useEffect, useRef } from 'react';
import { db } from '../firebase/config';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { FaPaperPlane, FaTimes } from 'react-icons/fa';
import UserAvatar from './UserAvatar';

const Chat = ({ tripId, onClose, onNewMessage, otherUserName, otherUserPhotoURL, otherUserId }) => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  const lastMessageCountRef = useRef(0);

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

      // Notify parent if there are new messages from others
      if (msgs.length > lastMessageCountRef.current) {
        const newMsgs = msgs.slice(lastMessageCountRef.current);
        const hasNewFromOther = newMsgs.some(m => m.senderId !== currentUser?.uid);
        if (hasNewFromOther && onNewMessage) {
          onNewMessage();
        }
      }
      lastMessageCountRef.current = msgs.length;

      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [tripId, currentUser, onNewMessage]);

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
    <div className="fixed bottom-4 right-4 w-96 h-[500px] bg-white dark:bg-gray-800 rounded-lg shadow-2xl flex flex-col z-[1001] border border-gray-200 dark:border-gray-700 animate-slide-up">
      {/* Header */}
      <div className="flex justify-between items-center p-3 bg-primary text-white rounded-t-lg">
        <div className="flex items-center gap-3">
          <UserAvatar 
            userId={otherUserId} 
            fallbackName={otherUserName} 
            className="border border-white/50" 
          />
          <div>
            <h3 className="font-bold text-lg leading-none">{otherUserName || 'Chat del Viaje'}</h3>
            <span className="text-xs text-white/80">En línea</span>
          </div>
        </div>
        <button onClick={onClose} className="text-xl hover:text-gray-200 p-2">
          <FaTimes />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
        {messages.map((msg) => {
          const isMine = msg.senderId === currentUser.uid;
          const photoToUse = isMine ? currentUser.photoURL : otherUserPhotoURL;
          
          return (
            <div
              key={msg.id}
              className={`flex mb-3 ${isMine ? 'justify-end' : 'justify-start'}`}>
              
              {!isMine && (
                <div className="flex-shrink-0 mr-2 self-end mb-1">
                  <UserAvatar
                    userId={otherUserId}
                    fallbackName={msg.senderName}
                    size="w-8 h-8"
                    className="border border-gray-300 dark:border-gray-600 shadow-sm"
                  />
                </div>
              )}

              <div className={`rounded-2xl px-4 py-2 max-w-[75%] shadow-sm ${isMine ? 'bg-primary text-white rounded-br-sm' : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-bl-sm border border-gray-100 dark:border-gray-600'}`}>
                <p className="text-sm break-words">{msg.text}</p>
                <p className="text-[10px] text-right mt-1 opacity-70">{formatDate(msg.timestamp)}</p>
              </div>

              {isMine && (
                <div className="flex-shrink-0 ml-2 self-end mb-1">
                  {photoToUse ? (
                    <img src={photoToUse} alt="Me" className="w-8 h-8 rounded-full object-cover border border-primary/30 shadow-sm" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 shadow-sm">
                      <span className="text-primary text-xs font-bold">{currentUser.displayName?.charAt(0)?.toUpperCase() || '?'}</span>
                    </div>
                  )}
                </div>
              )}

            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200 dark:border-gray-700 flex items-center bg-white dark:bg-gray-800 rounded-b-lg">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-primary bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
        />
        <button type="submit" className="ml-3 bg-primary text-white p-3 rounded-full hover:bg-primary-dark transition-colors disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed shadow-sm" disabled={!newMessage.trim()}>
          <FaPaperPlane className="relative -left-[1px]" />
        </button>
      </form>
    </div>
  );
};

export default Chat;
