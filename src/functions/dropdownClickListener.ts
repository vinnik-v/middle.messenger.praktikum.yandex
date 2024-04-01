export default function dropdownClickListener(e: Event, buttonId: string, dropdownId: string) {
    const button = (<HTMLElement>e.target).closest(buttonId);
    if (button) {
      const dropdown = document.getElementById(dropdownId);
      if (dropdown) {
        if (dropdown.classList.contains('display-none')) dropdown.classList.remove('display-none');
        else dropdown.classList.add('display-none');
      }
    }
}
