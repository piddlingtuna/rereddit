
import { renderHeader } from './strangerHeader.js';
import { renderFeed } from './strangerFeed.js';
import { renderFooter } from './footer.js';

const renderStranger = (apiUrl) => {
  const root = document.getElementById('root');
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }
  renderHeader(apiUrl);
  renderFeed(apiUrl);
  renderFooter();
}

export { renderStranger };