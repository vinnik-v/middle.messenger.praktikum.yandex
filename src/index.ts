import './index.scss';
import dropdownClickListener from './functions/dropdownClickListener';
import fileInputHandle from './functions/fileInputHandle';
import fileAcceptHandle from './functions/fileAcceptHandle';
import changeProfileDataHandle from './functions/changeProfileDataHandle';
import changePasswordHandle from './functions/changePasswordHandle';
import router, { navigate } from './router/router';

document.addEventListener('DOMContentLoaded', () => {
  router();
});

document.addEventListener('click', (e: Event) => {

  fileInputHandle(e);
  if (fileAcceptHandle(e) === null) return;

  const page = (<HTMLElement>e.target).getAttribute('page');
  
  if (page) {

    navigate(page);
    history.pushState(null, '', page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }

  changePasswordHandle(e);
  changeProfileDataHandle(e);
  dropdownClickListener(e, '#attach-file-button', 'choose-file-dropdown');
  dropdownClickListener(e, '#chat-window-header-button', 'chat-window-header-dropdown');
  dropdownClickListener(e, '#add-user-button', 'add-user-modal');
  dropdownClickListener(e, '#delete-user-button', 'delete-user-modal');
  dropdownClickListener(e, '#profile-photo', 'change-profile-photo-modal');
});
