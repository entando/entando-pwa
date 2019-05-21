import it from 'i18n/translations/it.json';

// English is the default message in each of our source files, so no need for a separate en.json file
const en = {};

export const messagePluralObjectToString = (messageObject) => {
  const keys = Object.keys(messageObject);
  let value;
  const phrases = keys.map((v) => {
    let msg = messageObject[v];
    let matchobj = msg.match(/\{(.?[^}])*\}/);
    if (matchobj) {
      value = matchobj[0];
    }
    return value ? `${v}{${msg.replace(value, '#')}}` : `${v}{${msg}}`;
  });
  let valueVar = value.replace(/[{}]/g, '');
  return `{${valueVar},plural,${phrases.join('')}}`;
};

const lookForPluralEach = (dict) => {
  const keys = Object.keys(dict);
  keys.forEach(key => {
    if (typeof dict[key] !== 'string') {
      dict[key] = messagePluralObjectToString(dict[key]);
    }
  })
};

const lookForPlural = (languages) => {
  const langcodes = Object.keys(languages);
  langcodes.map(lang => lookForPluralEach(languages[lang]));
  return languages;
};

export default lookForPlural({ en, it });
