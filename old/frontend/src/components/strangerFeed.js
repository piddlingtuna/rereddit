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

  fetch(`${apiUrl}/post/public`)
  .then(response => response.json())
  .then(json => {
    json.posts.sort((a, b) => {
      return parseInt(a.meta.published) < parseInt(b.meta.published);
    });
    while(feed.firstChild) {
      feed.removeChild(feed.firstChild);
    }
    renderFeedTemplate(json.posts);
  });
}
  
const renderFeedTemplate = (posts) => {
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

    const info = document.createElement('div');
    info.className = 'level';
    meta.append(info);

    const author = document.createElement('div');
    author.className = 'is-italic'
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
  }
}

export { renderFeed };