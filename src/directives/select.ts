export default {
  mounted: (el: HTMLInputElement | HTMLTextAreaElement) => {
    (el as any)._focus_handler = el.addEventListener('focus', () => {
      el.select();
    });
  },
  beforeUnmount: (el: HTMLElement) => {
    if ((el as any)._focus_handler) {
      el.removeEventListener('focus', (el as any)._focus_handler);
    }
  },
};
