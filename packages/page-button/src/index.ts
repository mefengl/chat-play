import Swal from 'sweetalert2';

export function displayHTML(html: string[]) {
  let screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  let swalWidth = screenWidth < 800 ? '100%' : '800px';

  Swal.fire({
    title: '',
    html: html.join('<br />'),
    width: swalWidth,
    padding: '3em',
    background: '#fff',
    backdrop: 'rgba(128,128,128,0.4)',
    showConfirmButton: false,
    showClass: { popup: '', backdrop: '' },
    customClass: { htmlContainer: 'text-left scrollable' },
    willClose: () => {
      const scrollable = document.querySelector('.scrollable');
      if (scrollable) {
        localStorage.setItem('scrollPos', `${scrollable.scrollTop}`);
      }
    },
    didOpen: () => {
      const scrollable = document.querySelector('.scrollable');
      if (scrollable) {
        scrollable.scrollTop = parseInt(localStorage.getItem('scrollPos') || '0');
      }
    }
  });

  if (!document.head.querySelector('#readModeStyle')) {
    let style = document.createElement('style');
    style.type = 'text/css';
    style.id = 'readModeStyle';
    style.innerHTML = `
      .text-left { text-align: left !important; }
      .scrollable { max-height: 80vh; overflow-y: auto; }
  `;
    document.head.appendChild(style);
  }
}
