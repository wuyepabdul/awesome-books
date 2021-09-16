const navigationLinks = document.querySelectorAll('.navItem');
const sections = document.querySelectorAll('section');
const anchors = document.querySelectorAll('.navigation a');

navigationLinks.forEach((navlink) => {
  navlink.addEventListener('click', (e) => {
    // this makes all of the sections invisible
    sections.forEach((section) => {
      section.classList.replace('visible', 'invisible');
    });
    // this removes the border bottom from all of the navlinks
    anchors.forEach((aTag) => {
      aTag.classList.remove('activeLink');
      aTag.classList.add('inactive');
    });

    // make visible only the section whose link was clicked
    const activeSection = document.querySelector(e.target.getAttribute('href'));
    activeSection.classList.replace('invisible', 'visible');
    // add border only to the active navlink
    e.target.classList.remove('inactive');
    e.target.classList.add('activeLink');
  });
});
