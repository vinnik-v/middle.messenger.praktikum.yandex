import './index.scss';
import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';
import dropdownClickListener from './functions/dropdownClickListener';
import fileInputHandle from './functions/fileInputHandle';
import fileAcceptHandle from './functions/fileAcceptHandle';
import changeProfileDataHandle from './functions/changeProfileDataHandle';

const pages: Record<string, any[]> = {
  'login': [ Pages.LoginPage, 'sdsdf' ],
  'register': [ Pages.RegisterPage ],
  '404': [ Pages.NotFoundPage ],
  'error': [ Pages.ErrorPage ],
  'main': [ Pages.MainPage ],
  'profile': [ Pages.ProfilePage ],
};

Object.entries(Components).forEach(([ name, component ]) => {
  Handlebars.registerPartial(name, component);
});

function navigate(page: string, param?: string) {
  const [ source, args ] = pages[page];
  console.log(param);
  const handlebarsFunct = Handlebars.compile(source);
  document.body.innerHTML = handlebarsFunct(args);
}

document.addEventListener('DOMContentLoaded', () => {
  navigate('login');

  
});

document.addEventListener('click', (e: Record<string, any>) => {

  fileInputHandle(e);
  if (fileAcceptHandle(e) === null) return;

  const page = e.target.getAttribute('page');
  console.log(page);
  if (page) {
    navigate(page, 'sdfsdf');

    e.preventDefault();
    e.stopImmediatePropagation();
  }

  // console.log(e);
  // const changeDataButton = e.target.id('#change-data-button');
  // if (changeDataButton) {
  //   console.log(changeDataButton);
  // }

  if (e.target.id === 'change-password-button') {
    const form = document.getElementById('proflle-form');
    if (form) {
      form.innerHTML = '';
      const newHTML = `<div class="profile-form__field">
                          <span class="profile-form__field-name">Старый пароль</span>
                          <input type="password" placeholder="Старый пароль" class="profile-form__input" value="some password">
                      </div>
                      <div class="profile-form__field">
                          <span class="profile-form__field-name">Новый пароль</span>
                          <input type="password" placeholder="Новый пароль" class="profile-form__input" value="some password">
                      </div>
                      <div class="profile-form__field">
                          <span class="profile-form__field-name">Повторите новый пароль</span>
                          <input type="password" placeholder="Повторите новый пароль" class="profile-form__input" value="some password">
                      </div>`
      form.innerHTML = newHTML;
    
      const profileFooter = document.getElementById('profile-footer');
      if (profileFooter) {
        const button = document.createElement('button');
        button.classList.add('form-button');
        button.classList.add('form-button_main');
        button.style.width = '280px';
        button.setAttribute('page', 'profile');
        button.textContent = 'Сохранить';
        profileFooter.innerHTML = '';
        profileFooter.appendChild(button);
      }
    }
  }

  changeProfileDataHandle(e);
  dropdownClickListener(e, '#attach-file-button', 'choose-file-dropdown');
  dropdownClickListener(e, '#chat-window-header-button', 'chat-window-header-dropdown');
  dropdownClickListener(e, '#add-user-button', 'add-user-modal');
  dropdownClickListener(e, '#delete-user-button', 'delete-user-modal');
  dropdownClickListener(e, '#profile-photo', 'change-profile-photo-modal');
});

