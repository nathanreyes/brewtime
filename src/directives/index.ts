import type { App } from 'vue';

import { default as focus } from './focus';
import { default as select } from './select';

export default function useDirectives(app: App) {
  app.directive('focus', focus).directive('select', select);
}
