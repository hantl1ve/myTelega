const newMessage = document.querySelector('.content_body_chat_input_newtext');
const sendIcon = document.querySelector('.content_body_chat_input_sendIcons')
const chatArea = document.querySelector('.content_body_chat_area')

// Меняем иконку 
newMessage.addEventListener('input', (e) => {
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
  if (newMessage.value.length > 0) {
    const hoursMinutes = new Date().getHours() + ':' + new Date().getMinutes();
    
    const msg = newMessage.value;
    const msgsFromLS = localStorage.getItem('messages');

    if (!msgsFromLS) {
      localStorage.setItem('messages', JSON.stringify([msg]));
    } else {
      const msgsArr = JSON.parse(msgsFromLS);
      msgsArr.push(msg);
      localStorage.setItem('messages', JSON.stringify(msgsArr));
    };

    chatArea.insertAdjacentHTML('beforeend', `
      <div class="content_body_chat_area_message_wrapper">
        <div class="content_body_chat_area_message content_body_chat_area_myMessage">
          <span>${newMessage.value}</span>
          <span class="content_body_chat_area_message_time">${hoursMinutes}</span>
        </div>
      </div>
    `)
    newMessage.value = '';
    newMessage.dispatchEvent(new Event('input'));
  };
});


// Рендерим чаты
function renderChats (chats) {
  const sidebarChatlist = document.querySelector('.sidebar_chatlist');

  sidebarChatlist.innerHTML = '';

  if (chats.length === 0) {
    sidebarChatlist.insertAdjacentHTML('beforeend', `
    <div class="sidebar_chatlist_noResult">
      <p>Not result</p>
      <span>There were not result</span>
      <span>Try a new search</span>
    </div>
    `)
  }

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
};
renderChats(chats);

// Поиск чатов

const sidebarSearch = document.querySelector('.sidebar_header_input');

sidebarSearch.addEventListener('input', (e) => {
  const filterChats = chats.filter((chat) => chat.name.toLowerCase().includes(e.target.value.toLowerCase()));
  renderChats(filterChats);
});

//Рендер сообщений из localStorage

function renderMessageFromLS() {
  const msgs = localStorage.getItem('messages');
  if (msgs) {
    const msgsArr = JSON.parse(msgs);
    msgsArr.forEach((msg) => {
    chatArea.insertAdjacentHTML('beforeend', `
      <div class="content_body_chat_area_message_wrapper">
        <div class="content_body_chat_area_message content_body_chat_area_myMessage">
          <span>${msg}</span>
          <span class="content_body_chat_area_message_time">...</span>
        </div>
      </div>
    `);
    })
  };
};

renderMessageFromLS();