const text = document.querySelector('.content_body_chat_input_newtext');
const sendIcon = document.querySelector('.content_body_chat_input_sendIcons')
const chatArea = document.querySelector('.content_body_chat_area')

// Меняем иконку 
text.addEventListener('input', (e) => {
  if (e.target.value.length > 0) {
    sendIcon.classList.remove('record');
    sendIcon.classList.add('send');
    
  } else {
    sendIcon.classList.remove('send');
    sendIcon.classList.add('record');
  }
});

// Отправка сообщения


sendIcon.addEventListener('click', () => {
  if (text.value.length > 0) {
    const hoursMinutes = new Date().getHours() + ':' + new Date().getMinutes();
    chatArea.insertAdjacentHTML('beforeend', `
      <div class="content_body_chat_area_message_wrapper">
        <div class="content_body_chat_area_message content_body_chat_area_myMessage">
          <span>${text.value}</span>
          <span class="content_body_chat_area_message_time">${hoursMinutes}</span>
        </div>
      </div>
    `)
    text.value = '';
    text.dispatchEvent(new Event('input'));
  };
});


// Рендерим чаты

const chats = [
  {
    avatar: './img/joker.jpg',
    name: 'Jack Napier',
    prevewMessage: 'Ахахахахахахахахаххахахахахахаахаха',
    lastTime: '19:89',
  },
  {
    avatar: './img/vvp.webp',
    name: 'You know my name',
    prevewMessage: 'Крым есть? Найду моё?',
    lastTime: '20:14',
  },
  {
    avatar: './img/Propper.jpg',
    name: 'Propper',
    prevewMessage: 'Готов вычистить твоё труднодоступное место',
    lastTime: '19:58',
  },
  {
    avatar: './img/sponge.jpg',
    name: 'Sponge Bob',
    prevewMessage: 'Я не сумасшедший, я просто немного нездоров',
    lastTime: '19:99',
  },
  {
    avatar: './img/starlord.webp',
    name: 'Peter Quill',
    prevewMessage: 'Давайте кое-что уточним. Этот перец — наш трофей. Все вопросы решаются через нас. Иначе решаем их мы, причем чаще всего радикально.',
    lastTime: '19:76',
  },
];

const sidebarChatlist = document.querySelector('.sidebar_chatlist');

chats.forEach((chat) => {
  sidebarChatlist.insertAdjacentHTML('beforeend',`
    <div class="sidebar_chatlist_chat">
      <img src="${chat.avatar}" alt="user avatar" class="sidebar_chatlist_chat_avatar">
      <div class="sidebar_chatlist_chat_usertext">
        <div class="sidebar_chatlist_chat_usertext_title"><span>${chat.name}</span><span class="sidebar_chatlist_chat_usertext_title_time">${chat.lastTime}</span></div>
        <p class="sidebar_chatlist_chat_usertext_subtitle">${chat.prevewMessage}</p>
      </div>
    </div>
  `)
});