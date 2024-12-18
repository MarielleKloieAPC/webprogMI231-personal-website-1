const tabs = document.querySelectorAll('.tab');
    const sections = document.querySelectorAll('section');
    const header = document.getElementById('header');

    let lastScrollY = window.scrollY;

    function activateTab(sectionId) {
      tabs.forEach(tab => {
        if (tab.dataset.section === sectionId) {
          tab.classList.add('active');
        } else {
          tab.classList.remove('active');
        }
      });
    }

    window.addEventListener('scroll', () => {
      let currentSection = '';

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - sectionHeight / 3) {
          currentSection = section.id;
        }
      });

      activateTab(currentSection);

      if (window.scrollY > lastScrollY) {
        header.classList.add('hidden');
      } else {
        header.classList.remove('hidden');
      }

      lastScrollY = window.scrollY;
    });

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const section = document.getElementById(tab.dataset.section);
        section.scrollIntoView({ behavior: 'smooth' });
        activateTab(tab.dataset.section);
      });
    });