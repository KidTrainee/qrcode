import RNLanguages from 'react-native-languages';
import i18n from 'i18n-js';

import en from './en.json';
import ptbr from './ptbr.json';
import de from './de.json';


i18n.locale = RNLanguages.language;
i18n.fallbacks = true;
i18n.translations = {
  en,
  de,
  'pt-BR': ptbr,
};

export default i18n;
