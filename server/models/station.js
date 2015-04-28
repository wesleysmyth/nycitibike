(function(){
  'use strict';
  
  /**
   * module.exports - exports the Station model constructor function as a module
   * 
   * @param {object} mongoose - instance of mongoose
   * @param {schema} schema - schema object
   * @return {function} - Station model constructor function
   */  
  module.exports = function (mongoose, schema) {
    return mongoose.model('Station', schema.stationSchema);
  };

})();
