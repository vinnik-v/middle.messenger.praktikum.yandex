import './index.scss';
import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';
import dropdownClickListener from './functions/dropdownClickListener';

const pages: Record<string, any[]> = {
  'login': [ Pages.LoginPage, 'sdsdf' ],
  'register': [ Pages.RegisterPage ],
  '404': [ Pages.NotFoundPage ],
  'error': [ Pages.ErrorPage ],
  'main': [ Pages.MainPage ],
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
  const page = e.target.getAttribute('page');
  if (page) {
    navigate(page, 'sdfsdf');

    e.preventDefault();
    e.stopImmediatePropagation();
  }

  dropdownClickListener(e, '#attach-file-button', 'choose-file-dropdown');
  dropdownClickListener(e, '#chat-window-header-button', 'chat-window-header-dropdown');

});

