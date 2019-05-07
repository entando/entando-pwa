import { createBrowserHistory } from 'history';

export const htmlSanitizer = html => {
  let newHtml;
  newHtml = html.replace(/#!U;([^!#]*)!#/gm, '$1');
  newHtml = newHtml.replace(/#!C;([a-zA-Z0-9]{3})([0-9]*)!#/gm, '/$1/$1$2');
  return newHtml;
};

export const history = createBrowserHistory();
