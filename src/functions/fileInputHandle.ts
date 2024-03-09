export default function fileInputHandle(e: Record<string, any>) {
    if (e.target.id === 'file-input') {
        const fileInput = e.target;
        const fileLabel = document.getElementById('file-label');
    
        if (fileInput) {
          fileInput.addEventListener('change', () => {
            if (fileLabel && fileInput.files && fileInput.files.length > 0) {
              fileLabel.textContent = fileInput.files[0].name;
              const errorElem = document.getElementById('change-profile-error-text');
              if (errorElem) errorElem.remove();
            } else if (fileLabel) {
              fileLabel.textContent = 'Выберите файл на компьютере';
            }
          });
        }
      }
}