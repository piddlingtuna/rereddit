/**
 * Written by A. Hinds with Z. Afzal 2018 for UNSW CSE.
 * 
 * Updated 2019.
 */

// import your own scripts here.

// your app must take an apiUrl as an argument --
// this will allow us to verify your apps behaviour with 
// different datasets.
function initApp(apiUrl) {
  // your app initialisation goes here

  const root = document.getElementById('root');

  // create header
  const header = document.createElement('header');
  header.setAttribute('id', 'nav');
  header.className = 'banner';
  root.appendChild(header);

  // create logo
  const logo = document.createElement('h1');
  logo.setAttribute('id', 'logo');
  logo.className = 'flex-center';
  const logoText = document.createTextNode('Rereddit');
  logo.appendChild(logoText);
  header.appendChild(logo);

  // create nav bar
  const nav = document.createElement('ul');
  nav.className = 'nav';
  header.appendChild(nav);

  // search
  const search = document.createElement('li');
  search.className = 'nav-item';
  nav.appendChild(search);

  const searchButton = document.createElement('input');
  search.setAttributeNode(document.createAttribute('data-id-search'));
  search.setAttribute('id', 'search');
  search.setAttribute('placeholder', 'Search Rereddit');
  search.setAttribute('type', 'search');
  search.appendChild(searchButton);

  // log in
  const logIn = document.createElement('li');
  logIn.className = 'nav-item'
  nav.appendChild(logIn);

  const logInButton = document.createElement('button');
  const logInAttr = document.createAttribute('data-id-login');
  logInButton.setAttributeNode(logInAttr);
  logInButton.className = 'button button-primary';
  const logInText = document.createTextNode('Log In');
  logInButton.appendChild(logInText);
  logIn.appendChild(logInButton);

  // sign up
  const signUp = document.createElement('li');
  signUp.className = 'nav-item'
  nav.appendChild(signUp);

  const signUpButton = document.createElement('button');
  const signUpAttr = document.createAttribute('data-id-signup');
  signUpButton.setAttributeNode(signUpAttr);
  signUpButton.className = 'button button-secondary';
  const signUpText = document.createTextNode('Sign Up');
  signUpButton.appendChild(signUpText);
  signUp.appendChild(signUpButton);

  // feed
  const main = document.createElement('main');
  main.setAttribute('role', 'main');
  root.appendChild(main);

  const feed = document.createElement('ul');
  const feedAttr = document.createAttribute('data-id-feed');
  feed.setAttributeNode(feedAttr);
  feed.setAttribute('id', 'feed');
  main.appendChild(feed);

  // feed header
  const feedHeader = document.createElement('div');
  feedHeader.className = 'feed-header';
  feed.appendChild(feedHeader);

  const feedTitle = document.createElement('h3');
  feedTitle.className = 'feed-title alt-text';
  const feedTitleText = document.createTextNode('Popular Posts');
  feedTitle.appendChild(feedTitleText);
  feedHeader.appendChild(feedTitle);

  const feedButton = document.createElement('button');
  feedButton.className = 'button button-secondary';
  const feedButtonText = document.createTextNode('Post');
  feedButton.appendChild(feedButtonText);
  feedHeader.appendChild(feedButton);

  // footer
  const footer = document.createElement('footer');
  root.appendChild(footer);

  const footerPar = document.createElement('p');
  const footerText = document.createTextNode('Rereddit');
  footerPar.appendChild(footerText);
  footer.appendChild(footerPar);

  // click log in
  logIn.addEventListener('click', () => {
    const username = prompt('Please enter username', 'username');
    const password = prompt('Please enter your password', 'password');
    const payload = {
      'username': username,
      'password': password,
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }
    logInRequest(apiUrl, options);
  });

  // click sign up
  signUp.addEventListener('click', () => {
    const username = prompt('Please enter username', 'username');
    const password = prompt('Please enter your password', 'password');
    const email = prompt('Please enter your email', 'email');
    const name = prompt('Please enter your name', 'name');
    const payload = {
      'username': username,
      'password': password,
      'email': email,
      'name': name
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }
    signUpRequest(apiUrl, options);
  });

  // get public posts
  renderPublicFeed(apiUrl);
}

const logInRequest = (apiUrl, options) => {
  fetch(`${apiUrl}/auth/login`, options)
    .then(response => {
      if (response.status !== 200) {
        alert('Invalid username or password');
      } else {
        return response.json();
      }
    })
    .then(response => {
      if (response) {
        localStorage.setItem('token', response.token);
        const options = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
          }
        }
        renderUserFeed(apiUrl, options);
      }
    })
}

const signUpRequest = (apiUrl, options) => {
  fetch(`${apiUrl}/auth/signup`, options)
    .then(response => {
      if (response.status !== 200) {
        alert('Invalid username or password');
      } else {
        alert('Success!');
        return response.json();
      }
    })
    .then(response => {
      if (response) {
        localStorage.setItem('token', response.token);
        const options = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
          }
        }
        renderUserFeed(apiUrl, options);
      }
    })
}

const renderPublicFeed = (apiUrl) => {
  fetch(`${apiUrl}/post/public`)
    .then(response => response.json())
    .then(json => {
      json.posts.sort((a, b) => {
        return parseInt(a.meta.published) < parseInt(b.meta.published);
      });
      while (feed.firstChild) {
        feed.removeChild(feed.firstChild);
      }
      renderFeed(json.posts);
    });
}

const renderUserFeed = (apiUrl, options) => {
  fetch(`${apiUrl}/user/feed`, options)
    .then(response => response.json())
    .then(json => {
      json.posts.sort((a, b) => {
        return parseInt(a.meta.published) < parseInt(b.meta.published);
      });
      const feed = document.getElementById('feed');
      while (feed.firstChild) {
        feed.removeChild(feed.firstChild);
      }
      renderFeed(json.posts);
    });
}

const renderFeed = (posts) => {

  const feed = document.getElementById('feed');

  for (let i = 0; i < posts.length; i++) {
    const post = document.createElement('li');
    const postAttr = document.createAttribute('data-id-post');
    post.setAttributeNode(postAttr);
    post.className = 'post';
    feed.appendChild(post);

    const vote = document.createElement('div');
    const voteAttr = document.createAttribute('data-id-upvotes');
    vote.setAttributeNode(voteAttr);
    vote.className = 'vote';
    post.appendChild(vote);

    const content = document.createElement('div');
    content.className = 'content';
    post.appendChild(content);

    const title = document.createElement('h4');
    const titleAttr = document.createAttribute('data-id-title');
    title.setAttributeNode(titleAttr);
    title.className = 'post-title alt-text';
    const titleText = document.createTextNode(posts[i].title);
    title.appendChild(titleText);
    content.appendChild(title);

    const text = document.createElement('p');
    const textText = document.createTextNode(posts[i].text);
    text.appendChild(textText);
    content.appendChild(text);

    const author = document.createElement('p');
    const authorAttr = document.createAttribute('data-id-author');
    author.setAttributeNode(authorAttr);
    authorAttr.className = 'post-author';
    const authorText = document.createTextNode(`Posted by u/${posts[i].meta.author}`);
    author.appendChild(authorText);
    content.appendChild(author);
  }

}

export default initApp;
