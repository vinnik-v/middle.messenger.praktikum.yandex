export default function fileAcceptHandle(e: Event) {
    if ((<HTMLElement>e.target).id === 'file-accept-button') {
        const fileInput = (<HTMLInputElement>document.getElementById('avatar'));
        if (!fileInput.files || fileInput.files.length === 0) {
          const modal = document.getElementById('change-profile-photo-modal');
          if (modal) {
            const errorElem = document.getElementById('change-profile-error-text');
            if (!errorElem) {
              const newErrorElem = document.createElement('div');
              newErrorElem.classList.add('error-text');
              newErrorElem.id = 'change-profile-error-text';
              newErrorElem.textContent = 'Нужно выбрать файл';
              modal.children[0].appendChild(newErrorElem);
            }
            return null;
          }
        } else {
          const errorElem = document.getElementById('change-profile-error-text');
          if (errorElem) errorElem.remove();
        }
      }
}
