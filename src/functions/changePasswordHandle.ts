export default function changePasswordHandle(e: Record<string, any>) {
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
}