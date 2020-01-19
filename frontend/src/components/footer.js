const renderFooter = () => {
  const root = document.getElementById('root');

  const footer = document.createElement('nav');
  footer.className = 'navbar is-primary';
  root.appendChild(footer);

  const navbarBrand = document.createElement('div');
  navbarBrand.className = 'navbar-brand';
  footer.appendChild(navbarBrand);

  const logo = document.createElement('div');
  logo.className = 'navbar-item is-size-4 is-italic has-text-weight-bold';
  logo.appendChild(document.createTextNode('rereddit'));
  navbarBrand.appendChild(logo);
}

export { renderFooter };