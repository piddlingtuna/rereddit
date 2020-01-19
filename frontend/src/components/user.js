import { renderHeader } from './userHeader.js';
import { renderFeed } from './userFeed.js';
import { renderFooter } from './footer.js';

const renderUser = (apiUrl) => {
  const root = document.getElementById('root');
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }
  renderHeader(apiUrl);
  renderFeed(apiUrl);
  renderFooter();
}

export { renderUser };