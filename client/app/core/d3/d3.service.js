(function() {
  'use strict';

  angular.module('core.d3', [])
    .factory('d3Service', ['$document', '$q', '$rootScope',
      function ($document, $q, $rootScope) {
        var scriptTag = $document[0].createElement('script'); 
        var s = $document[0].getElementsByTagName('body')[0];
        var d = $q.defer();

        // Create a script tag with d3 as the source
        // and call our onScriptLoad callback when it
        // has been loaded
        
        scriptTag.async = true;
        scriptTag.src = '../../../lib/d3/d3.min.js';
        scriptTag.onreadystatechange = function () {
          if (this.readyState === 'complete') {
            onScriptLoad();
          }
        }
        scriptTag.onload = onScriptLoad;

        // append the script to the 
        s.appendChild(scriptTag);

        function onScriptLoad() {
          // Load client in the browser
          $rootScope.$apply(function() { d.resolve(window.d3); });
        }

        return {
          d3: function() { return d.promise; }
        };
      }
    ]);

})();
