define([
  'jquery',
  'underscore',
  'views/base/view',
], function($, _, View) {
  "use strict";

  var BodyView = View.extend({
    template: 'body.html',
    noWrap: true,

    regions: {
      sidebar: '#sidebar_container',
      content: '#content_container',
    },
  });

  return BodyView;
});
