import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send, Search } from 'lucide-react';
import UserLayout from '../../components/user/Layout';

interface Message {
  id: string;
  sender: {
    name: string;
    image: string;
  };
  preview: string;
  time: string;
  unread: boolean;
}

interface Chat {
  id: string;
  messages: {
    id: string;
    sender: string;
    content: string;
    time: string;
  }[];
}

function MessageList({ messages, selectedChat, onSelectChat }: { 
  messages: Message[];
  selectedChat: string | null;
  onSelectChat: (id: string) => void;
}) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search messages..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {messages.map((message) => (
          <motion.button
            key={message.id}
            className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
              selectedChat === message.id ? 'bg-green-50' : ''
            }`}
            onClick={() => onSelectChat(message.id)}
            whileHover={{ x: 5 }}
          >
            <div className="flex items-start gap-4">
              <img
                src={message.sender.image}
                alt={message.sender.name}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold truncate">{message.sender.name}</h3>
                  <span className="text-sm text-gray-500">{message.time}</span>
                </div>
                <p className="text-gray-600 truncate">{message.preview}</p>
              </div>
              {message.unread && (
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
              )}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function ChatWindow({ chat }: { chat: Chat }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-semibold">Chat</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chat.messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.sender === 'user'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100'
              }`}
            >
              <p>{message.content}</p>
              <p className={`text-xs mt-1 ${
                message.sender === 'user' ? 'text-green-100' : 'text-gray-500'
              }`}>
                {message.time}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <motion.button
            className="bg-green-600 text-white p-2 rounded-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Send className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default function Messages() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  const messages: Message[] = [
    {
      id: '1',
      sender: {
        name: 'City Food Bank',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150'
      },
      preview: 'Thank you for your donation! We will be there at 2 PM.',
      time: '10:30 AM',
      unread: true
    },
    {
      id: '2',
      sender: {
        name: 'Local Shelter',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150'
      },
      preview: 'Can we schedule a pickup for tomorrow?',
      time: 'Yesterday',
      unread: false
    }
  ];

  const chat: Chat = {
    id: '1',
    messages: [
      {
        id: '1',
        sender: 'other',
        content: 'Hello! Thank you for your donation listing.',
        time: '10:00 AM'
      },
      {
        id: '2',
        sender: 'user',
        content: 'You are welcome! When would you like to pick it up?',
        time: '10:05 AM'
      },
      {
        id: '3',
        sender: 'other',
        content: 'We can come by at 2 PM today. Would that work for you?',
        time: '10:10 AM'
      },
      {
        id: '4',
        sender: 'user',
        content: 'Yes, 2 PM works perfectly! I will have everything ready.',
        time: '10:15 AM'
      }
    ]
  };

  return (
    <UserLayout title="Messages">
      <div className="grid md:grid-cols-2 gap-6 h-[calc(100vh-12rem)]">
        <MessageList
          messages={messages}
          selectedChat={selectedChat}
          onSelectChat={setSelectedChat}
        />
        {selectedChat ? (
          <ChatWindow chat={chat} />
        ) : (
          <div className="bg-white rounded-lg shadow-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <MessageSquare className="h-12 w-12 mx-auto mb-4" />
              <p>Select a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </UserLayout>
  );
}