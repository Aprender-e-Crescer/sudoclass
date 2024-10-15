import { useState } from 'react';
import { Trash2 } from 'lucide-react'; 
import Frame2815 from'@/assets/Frame 2815.svg'

const initialNotifications = [
  { id: 1, title: "Aprender e Crescer", message: "(Felipe Pardim): Uma nova atividade foi postada em AOO", time: "há 6m" },
  { id: 2, title: "Aprender e Crescer", message: "(Felipe Pardim): Uma nova atividade foi postada em AOO", time: "há 6m" },
  { id: 3, title: "Aprender e Crescer", message: "(Felipe Pardim): Uma nova atividade foi postada em AOO", time: "há 6m" },
  { id: 4, title: "Aprender e Crescer", message: "(Felipe Pardim): Uma nova atividade foi postada em AOO", time: "há 6m" },
];

const NotificationBar = () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <div className="w-80 h-screen bg-gray-100 border-l border-gray-300 rounded-l-lg shadow-md overflow-y-auto p-5 font-sans">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Central de notificações</h2>
        <button className="text-xl" onClick={clearNotifications}>
          <Trash2 /> {}
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div key={notification.id} className="flex items-center bg-gray-200 rounded-md p-3 gap-2">
              <div className="flex-shrink-0">
                <img
                  src={Frame2815}
                  alt="App Icon"
                  className="w-10 h-10 rounded-md"
                />
              </div>
              <div className="flex-1">
                <strong>{notification.title}</strong>
                <p>{notification.message}</p>
              </div>
              <div className="text-sm text-gray-600 flex-shrink-0">{notification.time}</div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-4">Nenhuma notificação</p>
        )}
      </div>
    </div>
  );
};

export default NotificationBar;
