const renderFeed = (apiUrl) => {
  const root = document.getElementById('root');
  
  // feed
  const main = document.createElement('main');
  main.setAttribute('role', 'main');
  root.appendChild(main);

  const feed = document.createElement('div');
  feed.className = 'container';
  feed.style.paddingLeft = '3rem';
  feed.style.paddingRight = '3rem';
  feed.style.paddingBottom = '1rem';
  feed.setAttribute('id', 'feed');
  main.appendChild(feed);

  const post = document.createElement('div');
  post.className = 'button is-primary';
  post.style.paddingBottom = '1rem';
  post.appendChild(document.createTextNode('POST'));
  feed.appendChild(post);

  // post modal
  const postModal = document.createElement('modal');
  postModal.className = 'modal';
  root.appendChild(postModal);

  const postModalBackground = document.createElement('div');
  postModalBackground.className = 'modal-background';
  postModal.appendChild(postModalBackground);

  const postModalCard = document.createElement('div');
  postModalCard.className = 'modal-content';
  postModal.appendChild(postModalCard);

  const postModalHeader = document.createElement('header');
  postModalHeader.className = 'modal-card-head';
  postModalHeader.appendChild(document.createTextNode('POST'));
  postModalCard.appendChild(postModalHeader);

  const postModalSection = document.createElement('section');
  postModalSection.className = 'modal-card-body';
  postModalCard.appendChild(postModalSection);

  const postTitle = document.createElement('div');
  postTitle.className = 'field';
  postModalSection.appendChild(postTitle);

  const postTitleLabel = document.createElement('label');
  postTitleLabel.className = 'label';
  postTitleLabel.appendChild(document.createTextNode('Title'));
  postTitle.appendChild(postTitleLabel);

  const postTitleControl = document.createElement('div');
  postTitleControl.className = 'control';
  postTitle.appendChild(postTitleControl);

  const postTitleInput = document.createElement('input');
  postTitleInput.className = 'input';
  postTitleInput.setAttribute('type', 'text');
  postTitleInput.setAttribute('placeholder', 'title');
  postTitleControl.appendChild(postTitleInput);

  const postText = document.createElement('div');
  postText.className = 'field';
  postModalSection.appendChild(postText);

  const postTextLabel = document.createElement('label');
  postTextLabel.className = 'label';
  postTextLabel.appendChild(document.createTextNode('Text'));
  postText.appendChild(postTextLabel);

  const postTextControl = document.createElement('div');
  postTextControl.className = 'control';
  postText.appendChild(postTextControl);

  const postTextInput = document.createElement('input');
  postTextInput.className = 'input';
  postTextInput.setAttribute('type', 'text');
  postTextInput.setAttribute('placeholder', 'text');
  postTextControl.appendChild(postTextInput);

  const postModalFooter = document.createElement('footer');
  postModalFooter.className = 'modal-card-foot';
  postModalCard.appendChild(postModalFooter);

  const postSubmitButton = document.createElement('button');
  postSubmitButton.className = 'button';
  postSubmitButton.appendChild(document.createTextNode('Submit'));
  postModalFooter.appendChild(postSubmitButton);

  const postCancelButton = document.createElement('button');
  postCancelButton.className = 'button is-light';
  postCancelButton.appendChild(document.createTextNode('Cancel'));
  postModalFooter.appendChild(postCancelButton);

  // event listeners
  post.addEventListener('click', () => {
    postModal.classList.add('is-active');
    root.classList.add('is-clipped');
  });

  postModalBackground.addEventListener('click', () => {
    postModal.classList.remove('is-active');
    root.classList.remove('is-clipped');
  });

  postCancelButton.addEventListener('click', () => {
    postModal.classList.remove('is-active');
    root.classList.remove('is-clipped');
  });

  postSubmitButton.addEventListener('click', () => {
    postSubmitButton.classList.add('is-loading');
    const title = postTitleInput.value;
    const text = postTextInput.value;
    const token = localStorage.getItem('token');
    const payload = {
      'title': title,
      'text': text,
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(payload)
    }
    /*
    console.log()
    fetch(`${apiUrl}/post`, options)
    .then(response => response.json())
    .then(response => console.log(response))
    */
    postSubmitButton.classList.remove('is-loading');
    postModal.classList.remove('is-active');
    root.classList.remove('is-clipped');
  });
  
  const token = localStorage.getItem('token');
  const options = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    },
  }
  fetch(`${apiUrl}/user/feed`, options)
  .then(response => response.json())
  .then(json => {
    json.posts.sort((a, b) => {
      return parseInt(a.meta.published) < parseInt(b.meta.published);
    });
    renderFeedTemplate(apiUrl, json.posts);
  });
}
  
const renderFeedTemplate = (apiUrl, posts) => {
  const feed = document.getElementById('feed');
  for (let i = 0; i < posts.length; i++) {

    const content = document.createElement('article');
    content.className = 'message is-info';
    feed.appendChild(content);

    const title = document.createElement('div');
    title.className = 'message-header';
    title.appendChild(document.createTextNode(posts[i].title));
    content.appendChild(title);

    const text = document.createElement('div');
    text.className = 'message-body';
    text.appendChild(document.createTextNode(posts[i].text));
    content.appendChild(text);

    const meta = document.createElement('div');
    meta.className = 'message-body';
    content.appendChild(meta);

    const author = document.createElement('div');
    author.className = 'is-italic'
    author.appendChild(document.createTextNode(`Posted by u/${posts[i].meta.author}`));
    meta.appendChild(author);

    const br = document.createElement('br');
    meta.appendChild(br);

    const info = document.createElement('div');
    info.className = 'level';
    meta.append(info);

    const numUpvotes = document.createElement('div');
    numUpvotes.className = 'level-item';
    numUpvotes.appendChild(document.createTextNode(`#upvotes: ${posts[i].meta.upvotes.length}`));
    info.appendChild(numUpvotes);

    const numComments = document.createElement('div');
    numComments.className = 'level-item';
    numComments.appendChild(document.createTextNode(`#comments: ${posts[i].comments.length}`));
    info.appendChild(numComments);

    const subrereddit = document.createElement('div');
    subrereddit.className = 'level-item';
    subrereddit.appendChild(document.createTextNode(`s/${posts[i].meta.subseddit}`));
    info.appendChild(subrereddit);

    const actions = document.createElement('div');
    actions.className = 'level';
    meta.append(actions);

    const upvote = document.createElement('div');
    upvote.className = 'button level-item is-primary';
    upvote.appendChild(document.createTextNode('Upvote'));
    actions.appendChild(upvote);

    const removeUpvote = document.createElement('div');
    removeUpvote.className = 'button level-item is-primary';
    removeUpvote.appendChild(document.createTextNode('Remove Upvote'));
    actions.appendChild(removeUpvote);

    const comment = document.createElement('div');
    comment.className = 'button level-item is-primary';
    comment.appendChild(document.createTextNode('Comment'));
    actions.appendChild(comment);

    const showComments = document.createElement('div');
    showComments.className = 'button level-item is-primary';
    showComments.appendChild(document.createTextNode('Show comments'));
    actions.appendChild(showComments);

    const showUpvotes = document.createElement('div');
    showUpvotes.className = 'button level-item is-primary';
    showUpvotes.appendChild(document.createTextNode('Show upvotes'));
    actions.appendChild(showUpvotes);

    // show comments modal
    const showCommentsModal = document.createElement('modal');
    showCommentsModal.className = 'modal';
    root.appendChild(showCommentsModal);

    const showCommentsModalBackground = document.createElement('div');
    showCommentsModalBackground.className = 'modal-background';
    showCommentsModal.appendChild(showCommentsModalBackground);

    const showCommentsModalCard = document.createElement('div');
    showCommentsModalCard.className = 'modal-content';
    showCommentsModal.appendChild(showCommentsModalCard);

    const showCommentsModalHeader = document.createElement('header');
    showCommentsModalHeader.className = 'modal-card-head';
    showCommentsModalHeader.appendChild(document.createTextNode('COMMENTS'));
    showCommentsModalCard.appendChild(showCommentsModalHeader);

    const showCommentsModalSection = document.createElement('section');
    showCommentsModalSection.className = 'modal-card-body';
    showCommentsModalCard.appendChild(showCommentsModalSection);

    for (let j = 0; j < posts[i].comments.length; j++) {
      const commentText = document.createElement('div');
      commentText.appendChild(document.createTextNode(posts[i].comments[j].comment));
      commentText.appendChild(document.createElement('br'));
      commentText.appendChild(document.createTextNode(`Posted by u/${posts[i].comments[j].author}`));
      commentText.appendChild(document.createElement('br'));
      showCommentsModalSection.appendChild(commentText);
    }

    const showCommentsModalFooter = document.createElement('footer');
    showCommentsModalFooter.className = 'modal-card-foot';
    showCommentsModalCard.appendChild(showCommentsModalFooter);

    const showCommentsCancelButton = document.createElement('button');
    showCommentsCancelButton.className = 'button is-light';
    showCommentsCancelButton.appendChild(document.createTextNode('Cancel'));
    showCommentsModalFooter.appendChild(showCommentsCancelButton);
    
    // event listeners
    
    upvote.addEventListener('click', () => {
      const token = localStorage.getItem('token');
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        }
      }
      fetch(`${apiUrl}/post/vote?id=${posts[i].id}`, options)
      .then(response => response.json())
      .then(response => {
        if (response.status == 200) {
          upvote.removeChild(upvote.firstChild);
          upvote.appendChild(document.createTextNode('Remove Upvote'));
        }
      })
    });

    removeUpvote.addEventListener('click', () => {
      const token = localStorage.getItem('token');
      const options = {
        method: 'Delete',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        }
      }
      fetch(`${apiUrl}/post/vote?id=${posts[i].id}`, options)
      .then(response => response.json())
      .then(response => {
        if (response.status == 200) {
          upvote.removeChild(upvote.firstChild);
          upvote.appendChild(document.createTextNode('Upvote'));
        }
      })
    });

    showComments.addEventListener('click', () => {
      showCommentsModal.classList.add('is-active');
      root.classList.add('is-clipped');
    });

    showCommentsModalBackground.addEventListener('click', () => {
      showCommentsModal.classList.remove('is-active');
      root.classList.remove('is-clipped');
    });

    showCommentsCancelButton.addEventListener('click', () => {
      showCommentsModal.classList.remove('is-active');
      root.classList.remove('is-clipped');
    });
    
  }
}

export { renderFeed };