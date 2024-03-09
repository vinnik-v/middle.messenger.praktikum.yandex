export default function changeProfileDataHandle(e: Record<string, any>) {
    if (e.target.id === 'change-data-button') {
        const form = document.getElementById('proflle-form');
        if (form) {
          const formFields = Array.from(form.children).map(item => Array.from(item.children).filter(elem => elem.className === 'profile-form__input')[0]);
          formFields.forEach(item => {
            if (item instanceof HTMLInputElement) {
              item.disabled = false;
            }
          })
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
}