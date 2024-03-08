export default function dropdownClickListener(e: Record<string, any>, buttonId: string, dropdownId: string) {
    const button = e.target.closest(buttonId);
    if (button) {
      const dropdown = document.getElementById(dropdownId);
      if (dropdown) {
        if (dropdown.classList.contains('display-none')) dropdown.classList.remove('display-none');
        else dropdown.classList.add('display-none');
      }
    }
  }