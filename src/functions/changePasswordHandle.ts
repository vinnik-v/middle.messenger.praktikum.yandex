export default function changePasswordHandle(e: Event) {
    if ((<HTMLElement>e.target).id === 'change-password-button') {
        const form = document.getElementById('profile-form');
        console.log(form);
        if (form) {
          form.innerHTML = '';
          const newHTML = `<div class="profile-form__field">
                              <label for="oldPassword" class="profile-form__field-name">Старый пароль</label>
                              <input id="oldPassword" name="oldPassword" type="password" placeholder="Старый пароль" class="profile-form__input" value="some password">
                          </div>
                          <div class="profile-form__field">
                              <label for="newPassword" class="profile-form__field-name">Новый пароль</label>
                              <input id="newPassword" name="newPassword" type="password" placeholder="Новый пароль" class="profile-form__input" value="some password">
                          </div>
                          <div class="profile-form__field">
                              <label for="newPassword" class="profile-form__field-name">Повторите новый пароль</label>
                              <input id="newPassword" name="newPassword" type="password" placeholder="Повторите новый пароль" class="profile-form__input" value="some password">
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
