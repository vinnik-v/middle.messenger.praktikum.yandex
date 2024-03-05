import './index.scss';
import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';

const pages: Record<string, any[]> = {
  'login': [ Pages.LoginPage ],
  'register': [ Pages.RegisterPage ],
  '404': [ Pages.NotFoundPage ],
  'error': [ Pages.ErrorPage ],
};

Object.entries(Components).forEach(([ name, component ]) => {
  Handlebars.registerPartial(name, component);
});

function navigate(page: string) {
  const [ source, args ] = pages[page];
  const handlebarsFunct = Handlebars.compile(source);
  document.body.innerHTML = handlebarsFunct(args);
}

document.addEventListener('DOMContentLoaded', () => navigate('login')); //login

document.addEventListener('click', (e: Record<string, any>) => {
  const page = e.target.getAttribute('page');
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
