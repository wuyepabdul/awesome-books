const navigationLinks = document.querySelectorAll('.navItem');
const sections = document.querySelectorAll('section');

navigationLinks.forEach((navlink) => {
  navlink.addEventListener('click', (e) => {
    // this makes all of the sections invisible
    sections.forEach((section) => {
      section.classList.replace('visible', 'invisible');
    });

    // make visible only the section whose link was clicked
    const activeLink = document.querySelector(e.target.getAttribute('href'));
    activeLink.classList.replace('invisible', 'visible');
  });
});
