import {renderStranger } from './stranger.js';

const renderHeader = (apiUrl) => {
  const token = localStorage.getItem('token');
  const options = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    }
  }
  fetch(`${apiUrl}/user`, options)
  .then(response => response.json())
  .then(user => {
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

    const profile = document.createElement('div');
    profile.className = 'button is-info';
    profile.appendChild(document.createTextNode('PROFILE'));
    buttons.appendChild(profile);

    const editProfile = document.createElement('div');
    editProfile.className = 'button is-info';
    editProfile.appendChild(document.createTextNode('EDIT PROFILE'));
    buttons.appendChild(editProfile);

    const logOut = document.createElement('div');
    logOut.className = 'button is-info';
    logOut.appendChild(document.createTextNode('LOG OUT'));
    buttons.appendChild(logOut);

    // profile modal
    const profileModal = document.createElement('modal');
    profileModal.className = 'modal';
    root.appendChild(profileModal);

    const profileModalBackground = document.createElement('div');
    profileModalBackground.className = 'modal-background';
    profileModal.appendChild(profileModalBackground);

    const profileModalCard = document.createElement('div');
    profileModalCard.className = 'modal-content';
    profileModal.appendChild(profileModalCard);

    const profileModalHeader = document.createElement('header');
    profileModalHeader.className = 'modal-card-head';
    profileModalHeader.appendChild(document.createTextNode('PROFILE'));
    profileModalCard.appendChild(profileModalHeader);

    const profileModalSection = document.createElement('section');
    profileModalSection.className = 'modal-card-body';
    profileModalCard.appendChild(profileModalSection);

    const profileUsernameTitle = document.createElement('div');
    profileUsernameTitle.className = 'has-text-weight-bold';
    profileUsernameTitle.appendChild(document.createTextNode('Username:'));
    profileModalSection.appendChild(profileUsernameTitle);

    const profileUsername = document.createElement('div');
    profileUsername.appendChild(document.createTextNode(user.username));
    profileModalSection.appendChild(profileUsername)

    profileModalSection.appendChild(document.createElement('br'));

    const profileEmailTitle = document.createElement('div');
    profileEmailTitle.className = 'has-text-weight-bold';
    profileEmailTitle.appendChild(document.createTextNode('Email:'));
    profileModalSection.appendChild(profileEmailTitle);

    const profileEmail = document.createElement('div');
    profileEmail.appendChild(document.createTextNode(user.email));
    profileModalSection.appendChild(profileEmail)

    profileModalSection.appendChild(document.createElement('br'));

    const profileNameTitle = document.createElement('div');
    profileNameTitle.className = 'has-text-weight-bold';
    profileNameTitle.appendChild(document.createTextNode('Name:'));
    profileModalSection.appendChild(profileNameTitle);

    const profileName = document.createElement('div');
    profileName.appendChild(document.createTextNode(user.name));
    profileModalSection.appendChild(profileName)

    profileModalSection.appendChild(document.createElement('br'));

    const profilePostsTitle = document.createElement('div');
    profilePostsTitle.className = 'has-text-weight-bold';
    profilePostsTitle.appendChild(document.createTextNode('#posts:'));
    profileModalSection.appendChild(profilePostsTitle);

    const profilePosts = document.createElement('div');
    profilePosts.appendChild(document.createTextNode(user.posts.length));
    profileModalSection.appendChild(profilePosts)

    profileModalSection.appendChild(document.createElement('br'));

    const profileUpvotesTitle = document.createElement('div');
    profileUpvotesTitle.className = 'has-text-weight-bold';
    profileUpvotesTitle.appendChild(document.createTextNode('#upvotes:'));
    profileModalSection.appendChild(profileUpvotesTitle);

    const profileUpvotes = document.createElement('div');
    profileUpvotes.appendChild(document.createTextNode('TODO'));
    profileModalSection.appendChild(profileUpvotes)

    profileModalSection.appendChild(document.createElement('br'));

    const profileFollowingTitle = document.createElement('div');
    profileFollowingTitle.className = 'has-text-weight-bold';
    profileFollowingTitle.appendChild(document.createTextNode('#following:'));
    profileModalSection.appendChild(profileFollowingTitle);

    const profileFollowing = document.createElement('div');
    profileFollowing.appendChild(document.createTextNode(user.following.length));
    profileModalSection.appendChild(profileFollowing)

    profileModalSection.appendChild(document.createElement('br'));

    const profileFollowedTitle = document.createElement('div');
    profileFollowedTitle.className = 'has-text-weight-bold';
    profileFollowedTitle.appendChild(document.createTextNode('#followed:'));
    profileModalSection.appendChild(profileFollowedTitle);

    const profileFollowed = document.createElement('div');
    profileFollowed.appendChild(document.createTextNode(user.followed_num));
    profileModalSection.appendChild(profileFollowed)

    const profileModalFooter = document.createElement('footer');
    profileModalFooter.className = 'modal-card-foot';
    profileModalCard.appendChild(profileModalFooter);

    const profileCancelButton = document.createElement('button');
    profileCancelButton.className = 'button is-light';
    profileCancelButton.appendChild(document.createTextNode('Cancel'));
    profileModalFooter.appendChild(profileCancelButton);

    // edit profile modal
    const editProfileModal = document.createElement('modal');
    editProfileModal.className = 'modal';
    root.appendChild(editProfileModal);

    const editProfileModalBackground = document.createElement('div');
    editProfileModalBackground.className = 'modal-background';
    editProfileModal.appendChild(editProfileModalBackground);

    const editProfileModalCard = document.createElement('div');
    editProfileModalCard.className = 'modal-content';
    editProfileModal.appendChild(editProfileModalCard);

    const editProfileModalHeader = document.createElement('header');
    editProfileModalHeader.className = 'modal-card-head';
    editProfileModalHeader.appendChild(document.createTextNode('EDIT PROFILE'));
    editProfileModalCard.appendChild(editProfileModalHeader);

    const editProfileModalSection = document.createElement('section');
    editProfileModalSection.className = 'modal-card-body';
    editProfileModalCard.appendChild(editProfileModalSection);

    const editProfilePassword = document.createElement('div');
    editProfilePassword.className = 'field';
    editProfileModalSection.appendChild(editProfilePassword);

    const editProfilePasswordLabel = document.createElement('label');
    editProfilePasswordLabel.className = 'label';
    editProfilePasswordLabel.appendChild(document.createTextNode('Password'));
    editProfilePassword.appendChild(editProfilePasswordLabel);

    const editProfilePasswordControl = document.createElement('div');
    editProfilePasswordControl.className = 'control';
    editProfilePassword.appendChild(editProfilePasswordControl);

    const editProfilePasswordInput = document.createElement('input');
    editProfilePasswordInput.className = 'input';
    editProfilePasswordInput.setAttribute('type', 'password');
    editProfilePasswordControl.appendChild(editProfilePasswordInput);

    const editProfileEmail = document.createElement('div');
    editProfileEmail.className = 'field';
    editProfileModalSection.appendChild(editProfileEmail);

    const editProfileEmailLabel = document.createElement('label');
    editProfileEmailLabel.className = 'label';
    editProfileEmailLabel.appendChild(document.createTextNode('Email'));
    editProfileEmail.appendChild(editProfileEmailLabel);

    const editProfileEmailControl = document.createElement('div');
    editProfileEmailControl.className = 'control';
    editProfileEmail.appendChild(editProfileEmailControl);

    const editProfileEmailInput = document.createElement('input');
    editProfileEmailInput.className = 'input';
    editProfileEmailInput.setAttribute('type', 'email');
    editProfileEmailInput.setAttribute('placeholder', user.email);
    editProfileEmailControl.appendChild(editProfileEmailInput);

    const editProfileName = document.createElement('div');
    editProfileName.className = 'field';
    editProfileModalSection.appendChild(editProfileName);

    const editProfileNameLabel = document.createElement('label');
    editProfileNameLabel.className = 'label';
    editProfileNameLabel.appendChild(document.createTextNode('Name'));
    editProfileName.appendChild(editProfileNameLabel);

    const editProfileNameControl = document.createElement('div');
    editProfileNameControl.className = 'control';
    editProfileName.appendChild(editProfileNameControl);

    const editProfileNameInput = document.createElement('input');
    editProfileNameInput.className = 'input';
    editProfileNameInput.setAttribute('type', 'text');
    editProfileNameInput.setAttribute('placeholder', user.name);
    editProfileNameControl.appendChild(editProfileNameInput);

    const editProfileModalFooter = document.createElement('footer');
    editProfileModalFooter.className = 'modal-card-foot';
    editProfileModalCard.appendChild(editProfileModalFooter);

    const editProfileSubmitButton = document.createElement('button');
    editProfileSubmitButton.className = 'button';
    editProfileSubmitButton.appendChild(document.createTextNode('Submit'));
    editProfileModalFooter.appendChild(editProfileSubmitButton);

    const editProfileCancelButton = document.createElement('button');
    editProfileCancelButton.className = 'button is-light';
    editProfileCancelButton.appendChild(document.createTextNode('Cancel'));
    editProfileModalFooter.appendChild(editProfileCancelButton);

    // event listeners
    logOut.addEventListener('click', () => {
      localStorage.removeItem('token');
      renderStranger(apiUrl);
    });

    profile.addEventListener('click', () => {
      profileModal.classList.add('is-active');
      root.classList.add('is-cliped');
    });
  
    profileModalBackground.addEventListener('click', () => {
      profileModal.classList.remove('is-active');
      root.classList.remove('is-cliped');
    });

    profileCancelButton.addEventListener('click', () => {
      profileModal.classList.remove('is-active');
      root.classList.remove('is-cliped');
    });

    editProfile.addEventListener('click', () => {
      editProfileModal.classList.add('is-active');
      root.classList.add('is-cliped');
    });

    editProfileSubmitButton.addEventListener('click', () => {
      editProfileSubmitButton.classList.add('is-loading');
      const token = localStorage.getItem('token');
      const password = editProfilePasswordInput.value;
      const email = editProfileEmailInput.value;
      const name = editProfileNameInput.value;
      const payload = {}
      if (password) {
        payload.password = password;
      }
      if (email) {
        payload.email = email;
      }
      if (name) {
        payload.name = name;
      }
      console.log(payload)
      console.log(JSON.stringify(payload))
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify(payload)
      }
      fetch(`${apiUrl}/user`, options);
      editProfileSubmitButton.classList.remove('is-loading');
      editProfileModal.classList.remove('is-active');
      root.classList.remove('is-cliped');
    });
  
    editProfileModalBackground.addEventListener('click', () => {
      editProfileModal.classList.remove('is-active');
      root.classList.remove('is-cliped');
    });

    editProfileCancelButton.addEventListener('click', () => {
      editProfileModal.classList.remove('is-active');
      root.classList.remove('is-cliped');
    });
  })
}

export { renderHeader };