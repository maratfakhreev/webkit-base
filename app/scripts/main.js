import 'jquery-hammerjs';
import 'backbone-routefilter';
import 'backbone-stickit';
import 'backbone-validation';
import 'backbone-nested-model';
import 'marionette';
import 'velocity-ui';
import 'nprogress';

import 'scripts/modules/main';
import App from 'scripts/application';

// document.addEventListener('deviceready', (function() {
//   App.start();
// }), false);

$(document).ready(function() {
  App.start();
});
