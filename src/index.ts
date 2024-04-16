import './index.scss';
import dropdownClickListener from './functions/dropdownClickListener';
// import changeProfileDataHandle from './functions/changeProfileDataHandle';
// import changePasswordHandle from './functions/changePasswordHandle';
import { routerInit } from './classes/Router';

document.addEventListener('DOMContentLoaded', () => {
  routerInit();
});

document.addEventListener('click', (e: Event) => {

  // changePasswordHandle(e);
  // changeProfileDataHandle(e);
  dropdownClickListener(e, '#attach-file-button', 'choose-file-dropdown');
  dropdownClickListener(e, '#chat-window-header-button', 'chat-window-header-dropdown');
  dropdownClickListener(e, '#add-user-button', 'add-user-modal');
  dropdownClickListener(e, '#delete-user-button', 'delete-user-modal');
  dropdownClickListener(e, '#delete-chat-button', 'delete-chat-modal');
  dropdownClickListener(e, '#profile-photo', 'change-profile-photo-modal');
});
