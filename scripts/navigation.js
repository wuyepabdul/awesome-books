const navigationLinks = document.querySelectorAll('.navItem');
const sections = document.querySelectorAll('section');
const anchors = document.querySelectorAll('.navigation a');
const nowParagraph = document.getElementById('now');

navigationLinks.forEach((navlink) => {
  navlink.addEventListener('click', (e) => {
    sections.forEach((section) => {
      section.classList.replace('visible', 'invisible');
    });
    anchors.forEach((aTag) => {
      aTag.classList.remove('activeLink');
      aTag.classList.add('inactive');
    });

    const activeSection = document.querySelector(e.target.getAttribute('href'));
    activeSection.classList.replace('invisible', 'visible');
    e.target.classList.remove('inactive');
    e.target.classList.add('activeLink');
  });
});

// eslint-disable-next-line no-undef
const { DateTime } = luxon;
const now = DateTime.now();
nowParagraph.textContent = now.toLocaleString(DateTime.DATETIME_MED);
