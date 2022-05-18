// Conserto do bug de carregamento: a URL com #, invoca a função do body antes de ser carregada
window.addEventListener("scroll", onScroll);
onScroll();

function onScroll() {
  showNavigationOnScroll();
  showBackToTopButtonOnScroll();

  activateMenuAtCurrentSection(home);
  activateMenuAtCurrentSection(services);
  activateMenuAtCurrentSection(about);
  activateMenuAtCurrentSection(contact);
}

function activateMenuAtCurrentSection(section) {
  // Linha imaginária
  const targetLine = scrollY + innerHeight / 2;

  // Verificar se a seção passou da linha alvo
  // Topo da seção
  const sectionTop = section.offsetTop;
  // Altura da seção (final da seção)
  const sectionHeight = section.offsetHeight;
  // O topo da seção atingiu ou passou da linha alvo?
  const sectionTopReachOrPassedTargetLine = targetLine >= sectionTop;

  // Verificar se a base está abaixo da linha alvo
  // Final da seção em
  const sectionEndsAt = sectionTop + sectionHeight;
  // O final da seção passou da linha alvo?
  const sectionEndPassedTargetLine = targetLine >= sectionEndsAt;
  // Limites da seção: se o topo atingiu ou passou AND o final da seção atingiu a linha alvo
  const sectionBoundaries =
    sectionTopReachOrPassedTargetLine && !sectionEndPassedTargetLine;

  const sectionID = section.getAttribute(`id`);
  const menuElement = document.querySelector(`.menu a[href*=${sectionID}]`);

  menuElement.classList.remove(`active`);
  if (sectionBoundaries) {
    menuElement.classList.add(`active`);
  }
}

function showNavigationOnScroll() {
  let navigation = document.querySelector("nav#navigation");
  if (scrollY > 0) {
    return navigation.classList.add("scroll");
  } else {
    return navigation.classList.remove("scroll");
  }
}

function showBackToTopButtonOnScroll() {
  let backToTopButton = document.querySelector("#backToTopButton");
  if (scrollY > 450) {
    return backToTopButton.classList.add("show");
  } else {
    return backToTopButton.classList.remove("show");
  }
}

function openMenu() {
  document.body.classList.add("menu-expanded");
}

function closeMenu() {
  document.body.classList.remove("menu-expanded");
}

ScrollReveal({
  origin: "top",
  distance: "5rem",
  duration: 1100,
}).reveal(`
#home, 
#home img, 
#home .stats, 
#services,
#services header,
#services .card,
#about, 
#about header,
#about header .content`);
