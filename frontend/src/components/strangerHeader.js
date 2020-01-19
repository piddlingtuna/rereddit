import { renderUser } from './user.js';

const renderHeader = (apiUrl) => {
  const root = document.getElementById('root');

  const navbar = document.createElement('nav');
  navbar.className = 'navbar is-primary is-fixed-top';
  navbar.setAttribute('role', 'navigation');
  root.appendChild(navbar);

  const navbarBrand = document.createElement('div');
  navbarBrand.className = 'navbar-brand is-spaced';
  navbar.appendChild(navbarBrand);

  const logo = document.createElement('div');
  logo.className = 'navbar-item is-size-3 is-italic has-text-weight-bold';
  logo.appendChild(document.createTextNode('rereddit'));
  navbarBrand.appendChild(logo);

  const navbarMenu = document.createElement('div');
  navbarMenu.className = 'navbar-menu';
  navbar.appendChild(navbarMenu);

  const navbarEnd = document.createElement('div');
  navbarEnd.className = 'navbar-end';
  navbarMenu.appendChild(navbarEnd);

  const search = document.createElement('div');
  search.className = 'navbar-item';
  navbarEnd.appendChild(search);

  const searchInputDiv = document.createElement('div');
  searchInputDiv.className = 'control';
  search.appendChild(searchInputDiv);
  
  const searchInput = document.createElement('input');
  searchInput.className = 'input';
  searchInput.setAttribute('type', 'text');
  searchInput.setAttribute('placeholder', 'search');
  searchInputDiv.appendChild(searchInput);

  const searchButtonDiv = document.createElement('div');
  searchButtonDiv.className = 'control';
  search.appendChild(searchButtonDiv);

  const searchButton = document.createElement('div');
  searchButton.className = 'button is-info';
  searchButton.appendChild(document.createTextNode('SEARCH'));
  searchButtonDiv.appendChild(searchButton);

  const buttons = document.createElement('div');
  buttons.className = 'navbar-item buttons';
  navbarEnd.appendChild(buttons);

  const logIn = document.createElement('div');
  logIn.className = 'button is-info';
  logIn.appendChild(document.createTextNode('LOG IN'));
  buttons.appendChild(logIn);

  const signUp = document.createElement('div');
  signUp.className = 'button is-info';
  signUp.appendChild(document.createTextNode('SIGN UP'));
  buttons.appendChild(signUp);

  // log in modal
  const logInModal = document.createElement('modal');
  logInModal.className = 'modal';
  root.appendChild(logInModal);

  const logInModalBackground = document.createElement('div');
  logInModalBackground.className = 'modal-background';
  logInModal.appendChild(logInModalBackground);

  const logInModalCard = document.createElement('div');
  logInModalCard.className = 'modal-content';
  logInModal.appendChild(logInModalCard);

  const logInModalHeader = document.createElement('header');
  logInModalHeader.className = 'modal-card-head';
  logInModalHeader.appendChild(document.createTextNode('LOG IN'));
  logInModalCard.appendChild(logInModalHeader);

  const logInModalSection = document.createElement('section');
  logInModalSection.className = 'modal-card-body';
  logInModalCard.appendChild(logInModalSection);

  const logInUsername = document.createElement('div');
  logInUsername.className = 'field';
  logInModalSection.appendChild(logInUsername);

  const logInUsernameLabel = document.createElement('label');
  logInUsernameLabel.className = 'label';
  logInUsernameLabel.appendChild(document.createTextNode('Username'));
  logInUsername.appendChild(logInUsernameLabel);

  const logInUsernameControl = document.createElement('div');
  logInUsernameControl.className = 'control';
  logInUsername.appendChild(logInUsernameControl);

  const logInUsernameInput = document.createElement('input');
  logInUsernameInput.className = 'input';
  logInUsernameInput.setAttribute('type', 'text');
  logInUsernameInput.setAttribute('placeholder', 'username');
  logInUsernameControl.appendChild(logInUsernameInput);

  const logInPassword = document.createElement('div');
  logInPassword.className = 'field';
  logInModalSection.appendChild(logInPassword);

  const logInPasswordLabel = document.createElement('label');
  logInPasswordLabel.className = 'label';
  logInPasswordLabel.appendChild(document.createTextNode('Password'));
  logInPassword.appendChild(logInPasswordLabel);

  const logInPasswordControl = document.createElement('div');
  logInPasswordControl.className = 'control';
  logInPassword.appendChild(logInPasswordControl);

  const logInPasswordInput = document.createElement('input');
  logInPasswordInput.className = 'input';
  logInPasswordInput.setAttribute('type', 'password');
  logInPasswordInput.setAttribute('placeholder', 'password');
  logInPasswordControl.appendChild(logInPasswordInput);

  const logInModalFooter = document.createElement('footer');
  logInModalFooter.className = 'modal-card-foot';
  logInModalCard.appendChild(logInModalFooter);

  const logInSubmitButton = document.createElement('button');
  logInSubmitButton.className = 'button';
  logInSubmitButton.appendChild(document.createTextNode('Submit'));
  logInModalFooter.appendChild(logInSubmitButton);

  const logInCancelButton = document.createElement('button');
  logInCancelButton.className = 'button is-light';
  logInCancelButton.appendChild(document.createTextNode('Cancel'));
  logInModalFooter.appendChild(logInCancelButton);

  // sign up modal
  const signUpModal = document.createElement('modal');
  signUpModal.className = 'modal';
  root.appendChild(signUpModal);

  const signUpModalBackground = document.createElement('div');
  signUpModalBackground.className = 'modal-background';
  signUpModal.appendChild(signUpModalBackground);

  const signUpModalCard = document.createElement('div');
  signUpModalCard.className = 'modal-content';
  signUpModal.appendChild(signUpModalCard);

  const signUpModalHeader = document.createElement('header');
  signUpModalHeader.className = 'modal-card-head';
  signUpModalHeader.appendChild(document.createTextNode('SIGN UP'));
  signUpModalCard.appendChild(signUpModalHeader);

  const signUpModalSection = document.createElement('section');
  signUpModalSection.className = 'modal-card-body';
  signUpModalCard.appendChild(signUpModalSection);

  const signUpUsername = document.createElement('div');
  signUpUsername.className = 'field';
  signUpModalSection.appendChild(signUpUsername);

  const signUpUsernameLabel = document.createElement('label');
  signUpUsernameLabel.className = 'label';
  signUpUsernameLabel.appendChild(document.createTextNode('Username'));
  signUpUsername.appendChild(signUpUsernameLabel);

  const signUpUsernameControl = document.createElement('div');
  signUpUsernameControl.className = 'control';
  signUpUsername.appendChild(signUpUsernameControl);

  const signUpUsernameInput = document.createElement('input');
  signUpUsernameInput.className = 'input';
  signUpUsernameInput.setAttribute('type', 'text');
  signUpUsernameInput.setAttribute('placeholder', 'username');
  signUpUsernameControl.appendChild(signUpUsernameInput);

  const signUpPassword = document.createElement('div');
  signUpPassword.className = 'field';
  signUpModalSection.appendChild(signUpPassword);

  const signUpPasswordLabel = document.createElement('label');
  signUpPasswordLabel.className = 'label';
  signUpPasswordLabel.appendChild(document.createTextNode('Password'));
  signUpPassword.appendChild(signUpPasswordLabel);

  const signUpPasswordControl = document.createElement('div');
  signUpPasswordControl.className = 'control';
  signUpPassword.appendChild(signUpPasswordControl);

  const signUpPasswordInput = document.createElement('input');
  signUpPasswordInput.className = 'input';
  signUpPasswordInput.setAttribute('type', 'password');
  signUpPasswordInput.setAttribute('placeholder', 'password');
  signUpPasswordControl.appendChild(signUpPasswordInput);

  const signUpEmail = document.createElement('div');
  signUpEmail.className = 'field';
  signUpModalSection.appendChild(signUpEmail);

  const signUpEmailLabel = document.createElement('label');
  signUpEmailLabel.className = 'label';
  signUpEmailLabel.appendChild(document.createTextNode('Email'));
  signUpEmail.appendChild(signUpEmailLabel);

  const signUpEmailControl = document.createElement('div');
  signUpEmailControl.className = 'control';
  signUpEmail.appendChild(signUpEmailControl);

  const signUpEmailInput = document.createElement('input');
  signUpEmailInput.className = 'input';
  signUpEmailInput.setAttribute('type', 'email');
  signUpEmailInput.setAttribute('placeholder', 'email');
  signUpEmailControl.appendChild(signUpEmailInput);

  const signUpName = document.createElement('div');
  signUpName.className = 'field';
  signUpModalSection.appendChild(signUpName);

  const signUpNameLabel = document.createElement('label');
  signUpNameLabel.className = 'label';
  signUpNameLabel.appendChild(document.createTextNode('Name'));
  signUpName.appendChild(signUpNameLabel);

  const signUpNameControl = document.createElement('div');
  signUpNameControl.className = 'control';
  signUpName.appendChild(signUpNameControl);

  const signUpNameInput = document.createElement('input');
  signUpNameInput.className = 'input';
  signUpNameInput.setAttribute('type', 'text');
  signUpNameInput.setAttribute('placeholder', 'name');
  signUpNameControl.appendChild(signUpNameInput);

  const signUpModalFooter = document.createElement('footer');
  signUpModalFooter.className = 'modal-card-foot';
  signUpModalCard.appendChild(signUpModalFooter);

  const signUpSubmitButton = document.createElement('button');
  signUpSubmitButton.className = 'button';
  signUpSubmitButton.appendChild(document.createTextNode('Submit'));
  signUpModalFooter.appendChild(signUpSubmitButton);

  const signUpCancelButton = document.createElement('button');
  signUpCancelButton.className = 'button is-light';
  signUpCancelButton.appendChild(document.createTextNode('Cancel'));
  signUpModalFooter.appendChild(signUpCancelButton);

  // event listeners

  logIn.addEventListener('click', () => {
    logInModal.classList.add('is-active');
    root.classList.add('is-cliped');
  });

  logInModalBackground.addEventListener('click', () => {
    logInSubmitButton.classList.remove('is-loading');
    logInModal.classList.remove('is-active');
    root.classList.remove('is-cliped');
  });

  logInCancelButton.addEventListener('click', () => {
    logInSubmitButton.classList.remove('is-loading');
    logInModal.classList.remove('is-active');
    root.classList.remove('is-cliped');
  })

  logInSubmitButton.addEventListener('click', () => {
    logInSubmitButton.classList.add('is-loading');
    const username = logInUsernameInput.value;
    const password = logInPasswordInput.value;
    if (!username) {
      alert('Error', 'No username');
    } else if (!password) {
      alert('Error', 'No password');
    } else {
      const payload = {
        'username': username,
        'password': password
      }
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      }
      fetch(`${apiUrl}/auth/login`, options)
      .then(response => {
        if (response.status !== 200) {
          alert('Error', 'Invalid username or password');
        } else {
          alert('Success');
          return response.json();
        }
      })
      .then(response => {
        if (response) {
          localStorage.setItem('token', response.token);
          renderUser(apiUrl);
        }
      })
    }
    logInSubmitButton.classList.remove('is-loading');
    logInModal.classList.remove('is-active');
    root.classList.remove('is-cliped');
  });

  signUp.addEventListener('click', () => {
    signUpModal.classList.add('is-active');
    root.classList.add('is-cliped');
  });

  signUpModalBackground.addEventListener('click', () => {
    signUpSubmitButton.classList.remove('is-loading');
    signUpModal.classList.remove('is-active');
    root.classList.remove('is-cliped');
  });

  signUpCancelButton.addEventListener('click', () => {
    signUpSubmitButton.classList.remove('is-loading');
    signUpModal.classList.remove('is-active');
    root.classList.remove('is-cliped');
  });

  signUpSubmitButton.addEventListener('click', () => {
    signUpSubmitButton.classList.add('is-loading');
    const username = signUpUsernameInput.value;
    const password = signUpPasswordInput.value;
    const email = signUpEmailInput.value;
    const name = signUpNameInput.value;
    if (!username) {
      alert('Error, No username');
    } else if (!password) {
      alert('Error, No password');
    } else if (!email) {
      alert('Error, No email');
    } else if (!name) {
      alert('Error, No name');
    } else {
      const payload = {
        'username': username,
        'password': password,
        'email': email,
        'name': name
      }
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      }
      fetch(`${apiUrl}/auth/signup`, options)
      .then(response => {
        if (response.status !== 200) {
          alert('Error', 'Invalid something');
        } else {
          alert('Success');
          return response.json();
        }
      })
      .then(response => {
        if (response) {
          localStorage.setItem('token', response.token);
          renderUser(apiUrl);
        }
      })
    }
    signUpSubmitButton.classList.remove('is-loading');
    signUpModal.classList.remove('is-active');
    root.classList.remove('is-cliped');
  });

}

export { renderHeader };