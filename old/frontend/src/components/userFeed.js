const renderFeed = (apiUrl) => {
  const root = document.getElementById('root');
  
  // feed
  const main = document.createElement('main');
  main.setAttribute('role', 'main');
  root.appendChild(main);

  const feed = document.createElement('div');

  while(feed.firstChild) {
    feed.removeChild(feed.firstChild);
  }

  feed.className = 'container';
  feed.style.paddingLeft = '3rem';
  feed.style.paddingRight = '3rem';
  feed.style.paddingBottom = '1rem';
  feed.setAttribute('id', 'feed');
  main.appendChild(feed);

  const post = document.createElement('div');
  post.className = 'button is-primary';
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

  const postSubrereddit = document.createElement('div');
  postSubrereddit.className = 'field';
  postModalSection.appendChild(postSubrereddit);

  const postSubreredditLabel = document.createElement('label');
  postSubreredditLabel.className = 'label';
  postSubreredditLabel.appendChild(document.createTextNode('Text'));
  postSubrereddit.appendChild(postSubreredditLabel);

  const postSubreredditControl = document.createElement('div');
  postSubreredditControl.className = 'control';
  postSubrereddit.appendChild(postSubreredditControl);

  const postSubreredditInput = document.createElement('input');
  postSubreredditInput.className = 'input';
  postSubreredditInput.setAttribute('type', 'text');
  postSubreredditInput.setAttribute('placeholder', 'subrereddit');
  postSubreredditControl.appendChild(postSubreredditInput);

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
    const subrereddit = postSubreredditInput.value;
    const token = localStorage.getItem('token');
    const payload = {
      'title': title,
      'text': text,
      'subseddit': subrereddit
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(payload)
    }
    
    fetch(`${apiUrl}/post`, options);
    
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
  fetch(`${apiUrl}/user/feed?p=0&n=10`, options)
  .then(response => response.json())
  .then(json => {
    json.posts.sort((a, b) => {
      return parseInt(a.meta.published) < parseInt(b.meta.published);
    });
    renderFeedTemplate(apiUrl, json.posts);
  });

  let counter = 10;
  let go = true;
  window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight && go) {
      fetch(`${apiUrl}/user/feed?p=${counter}&n=10`, options)
      .then(response => response.json())
      .then(json => {
        json.posts.sort((a, b) => {
          return parseInt(a.meta.published) < parseInt(b.meta.published);
        });
        if (json.posts.length) {
          renderFeedTemplate(apiUrl, json.posts);
          counter += 10;
        } else {
          go = false;
        }
      });
    }
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

    const br = document.createElement('br');
    meta.appendChild(br);

    const info = document.createElement('div');
    info.className = 'level';
    meta.append(info);

    const author = document.createElement('div');
    author.className = 'button is-italic'
    author.appendChild(document.createTextNode(`Posted by u/${posts[i].meta.author}`));
    info.appendChild(author);

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

    // author modal
    const authorModal = document.createElement('modal');
    authorModal.className = 'modal';
    root.appendChild(authorModal);

    const authorModalBackground = document.createElement('div');
    authorModalBackground.className = 'modal-background';
    authorModal.appendChild(authorModalBackground);

    const authorModalCard = document.createElement('div');
    authorModalCard.className = 'modal-content';
    authorModal.appendChild(authorModalCard);

    const authorModalHeader = document.createElement('header');
    authorModalHeader.className = 'modal-card-head';
    authorModalHeader.appendChild(document.createTextNode(posts[i].meta.author));
    authorModalCard.appendChild(authorModalHeader);

    const authorModalSection = document.createElement('section');
    authorModalSection.className = 'modal-card-body';
    authorModalCard.appendChild(authorModalSection);

    const authorModalFooter = document.createElement('footer');
    authorModalFooter.className = 'modal-card-foot';
    authorModalCard.appendChild(authorModalFooter);

    const authorCancelButton = document.createElement('button');
    authorCancelButton.className = 'button is-light';
    authorCancelButton.appendChild(document.createTextNode('Cancel'));
    authorModalFooter.appendChild(authorCancelButton);

    // comment modal
    const commentModal = document.createElement('modal');
    commentModal.className = 'modal';
    root.appendChild(commentModal);

    const commentModalBackground = document.createElement('div');
    commentModalBackground.className = 'modal-background';
    commentModal.appendChild(commentModalBackground);

    const commentModalCard = document.createElement('div');
    commentModalCard.className = 'modal-content';
    commentModal.appendChild(commentModalCard);

    const commentModalHeader = document.createElement('header');
    commentModalHeader.className = 'modal-card-head';
    commentModalHeader.appendChild(document.createTextNode('COMMENT'));
    commentModalCard.appendChild(commentModalHeader);

    const commentModalSection = document.createElement('section');
    commentModalSection.className = 'modal-card-body';
    commentModalCard.appendChild(commentModalSection);

    const commentText = document.createElement('div');
    commentText.className = 'field';
    commentModalSection.appendChild(commentText);

    const commentTextControl = document.createElement('div');
    commentTextControl.className = 'control';
    commentText.appendChild(commentTextControl);

    const commentTextInput = document.createElement('input');
    commentTextInput.className = 'input';
    commentTextInput.setAttribute('type', 'text');
    commentTextInput.setAttribute('placeholder', 'comment');
    commentTextControl.appendChild(commentTextInput);

    const commentModalFooter = document.createElement('footer');
    commentModalFooter.className = 'modal-card-foot';
    commentModalCard.appendChild(commentModalFooter);

    const commentSubmitButton = document.createElement('button');
    commentSubmitButton.className = 'button';
    commentSubmitButton.appendChild(document.createTextNode('Submit'));
    commentModalFooter.appendChild(commentSubmitButton);

    const commentCancelButton = document.createElement('button');
    commentCancelButton.className = 'button is-light';
    commentCancelButton.appendChild(document.createTextNode('Cancel'));
    commentModalFooter.appendChild(commentCancelButton);

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

    // show upvotes modal
    const showUpvotesModal = document.createElement('modal');
    showUpvotesModal.className = 'modal';
    root.appendChild(showUpvotesModal);

    const showUpvotesModalBackground = document.createElement('div');
    showUpvotesModalBackground.className = 'modal-background';
    showUpvotesModal.appendChild(showUpvotesModalBackground);

    const showUpvotesModalCard = document.createElement('div');
    showUpvotesModalCard.className = 'modal-content';
    showUpvotesModal.appendChild(showUpvotesModalCard);

    const showUpvotesModalHeader = document.createElement('header');
    showUpvotesModalHeader.className = 'modal-card-head';
    showUpvotesModalHeader.appendChild(document.createTextNode('UPVOTES'));
    showUpvotesModalCard.appendChild(showUpvotesModalHeader);

    const showUpvotesModalSection = document.createElement('section');
    showUpvotesModalSection.className = 'modal-card-body';
    showUpvotesModalCard.appendChild(showUpvotesModalSection);

    for (let j = 0; j < posts[i].meta.upvotes.length; j++) {
      const token = localStorage.getItem('token');
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        }
      }
      fetch(`${apiUrl}/user?id=${posts[i].meta.upvotes[j]}`, options)
      .then(response => response.json())
      .then(response => {
        const upvotesText = document.createElement('div');
      upvotesText.appendChild(document.createTextNode(response.username));
      upvotesText.appendChild(document.createElement('br'));
      showUpvotesModalSection.appendChild(upvotesText);
      })
    }

    const showUpvotesModalFooter = document.createElement('footer');
    showUpvotesModalFooter.className = 'modal-card-foot';
    showUpvotesModalCard.appendChild(showUpvotesModalFooter);

    const showUpvotesCancelButton = document.createElement('button');
    showUpvotesCancelButton.className = 'button is-light';
    showUpvotesCancelButton.appendChild(document.createTextNode('Cancel'));
    showUpvotesModalFooter.appendChild(showUpvotesCancelButton);
    
    // event listeners

    author.addEventListener('click', () => {
      authorModal.classList.add('is-active');
      root.classList.add('is-clipped');
      if (!authorModalSection.firstChild) {
        const token = localStorage.getItem('token');
        const options = {
          headers: {
            'Content-Type': 'authorization/json',
            'Authorization': `Token ${token}`
          }
        }
        fetch(`${apiUrl}/user?username=${posts[i].meta.author}`, options)
        .then(response => response.json())
        .then(user => {
          const authorUsernameTitle = document.createElement('div');
          authorUsernameTitle.className = 'has-text-weight-bold';
          authorUsernameTitle.appendChild(document.createTextNode('Username'));
          authorModalSection.appendChild(authorUsernameTitle);

          const authorUsername = document.createElement('div');
          authorUsername.appendChild(document.createTextNode(user.username));
          authorModalSection.appendChild(authorUsername);

          const authorEmailTitle = document.createElement('div');
          authorEmailTitle.className = 'has-text-weight-bold';
          authorEmailTitle.appendChild(document.createTextNode('Email'));
          authorModalSection.appendChild(authorEmailTitle);

          const authorEmail = document.createElement('div');
          authorEmail.appendChild(document.createTextNode(user.email));
          authorModalSection.appendChild(authorEmail);

          const authorNameTitle = document.createElement('div');
          authorNameTitle.className = 'has-text-weight-bold';
          authorNameTitle.appendChild(document.createTextNode('Name'));
          authorModalSection.appendChild(authorNameTitle);

          const authorName = document.createElement('div');
          authorName.appendChild(document.createTextNode(user.name));
          authorModalSection.appendChild(authorName);

          const authorPostsTitle = document.createElement('div');
          authorPostsTitle.className = 'has-text-weight-bold';
          authorPostsTitle.appendChild(document.createTextNode('Posts'));
          authorModalSection.appendChild(authorPostsTitle);

          for (let j = 0; j < user.posts.length; j++) {
            fetch(`${apiUrl}/post?id=${user.posts[j]}`, options)
            .then(response => response.json())
            .then(post => {
              const authorPostTitle = document.createElement('div');
              authorPostTitle.className = 'has-text-weight-bold';
              authorPostTitle.appendChild(document.createTextNode(post.title));
              authorModalSection.appendChild(authorPostTitle);

              const authorPostText = document.createElement('div');
              authorPostText.appendChild(document.createTextNode(post.text));
              authorModalSection.appendChild(authorPostText);
            })
          }

        })
      }
    });

    authorModalBackground.addEventListener('click', () => {
      authorModal.classList.remove('is-active');
      root.classList.remove('is-clipped');
    })

    authorCancelButton.addEventListener('click', () => {
      authorModal.classList.remove('is-active');
      root.classList.remove('is-clipped');
    })
    
    upvote.addEventListener('click', () => {
      const token = localStorage.getItem('token');
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        }
      }
      fetch(`${apiUrl}/post/vote?id=${posts[i].id}`, options);
    });

    removeUpvote.addEventListener('click', () => {
      const token = localStorage.getItem('token');
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        }
      }
      fetch(`${apiUrl}/post/vote?id=${posts[i].id}`, options);
    });

    comment.addEventListener('click', () => {
      commentModal.classList.add('is-active');
      root.classList.add('is-clipped');
    });

    commentModalBackground.addEventListener('click', () => {
      commentModal.classList.remove('is-active');
      root.classList.remove('is-clipped');
    });

    commentCancelButton.addEventListener('click', () => {
      commentModal.classList.remove('is-active');
      root.classList.remove('is-clipped');
    });

    commentSubmitButton.addEventListener('click', () => {
      const comment = commentTextInput.value;
      if (comment) {
        commentSubmitButton.classList.add('is-loading');
        const token = localStorage.getItem('token');
        const payload = {
          'comment': comment
        }
        const options = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
          },
          body: JSON.stringify(payload)
        }
        fetch(`${apiUrl}/post/comment?id=${posts[i].id}`, options);
        commentSubmitButton.classList.remove('is-loading');
        commentModal.classList.remove('is-active');
        root.classList.remove('is-clipped');
      }
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

    showUpvotes.addEventListener('click', () => {
      showUpvotesModal.classList.add('is-active');
      root.classList.add('is-clipped');
    });

    showUpvotesModalBackground.addEventListener('click', () => {
      showUpvotesModal.classList.remove('is-active');
      root.classList.remove('is-clipped');
    });

    showUpvotesCancelButton.addEventListener('click', () => {
      showUpvotesModal.classList.remove('is-active');
      root.classList.remove('is-clipped');
    });
    
  }
}

export { renderFeed };