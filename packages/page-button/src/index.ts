import Swal from 'sweetalert2';
export { Swal };

export async function displayHTML(html: string) {
  let screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  let swalWidth = screenWidth < 800 ? '80%' : '800px';

  if (!document.head.querySelector('#readModeStyle')) {
    let style = document.createElement('style');
    style.type = 'text/css';
    style.id = 'readModeStyle';
    style.innerHTML = `
      .text-left { text-align: left !important; }
      .scrollable { max-height: 90vh; overflow-y: auto; }
  `;
    document.head.appendChild(style);
  }

  Swal.fire({
    title: '',
    html,
    width: swalWidth,
    padding: '0em',
    background: '#fff',
    backdrop: 'rgba(128,128,128,0.4)',
    showConfirmButton: false,
    showClass: { popup: '', backdrop: '' },
    customClass: { htmlContainer: 'text-left scrollable swal-font' },
    willClose: () => {
      const scrollable = document.querySelector('.scrollable');
      if (scrollable) {
        localStorage.setItem('scrollPos' + window.location.href, `${scrollable.scrollTop}`);
      }
    },
    didOpen: () => {
      const scrollable = document.querySelector('.scrollable');
      if (scrollable) {
        scrollable.scrollTop = parseInt(localStorage.getItem('scrollPos' + window.location.href) || '0');
      }
    }
  });
}

export * from './segmentText';
export * from './getParagraphs';
