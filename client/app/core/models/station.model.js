(function() {

  angular
    .module('core.models')
    .factory('StationModel', StationModel);

  /**
   * StationModel - factory for station models
   * 
   * @return {object} stationModel - returns the stationModel constructor function
   */
  function StationModel () {

    var stationModel = {
      constructor: constructor
    };

    return stationModel;

    /////////////////////////////////////

    /**
     * constructor - station model constructor function
     * 
     * @param {object} station - station to base station model
     * @return {object} - pseudoclassical instatiation will return a new station object
     */
    function constructor (station) {
      this._id = station._id;
      this.borough = station.borough;
      this.stationId = station.stationId;
      this.latitude = station.latitude;
      this.longitude = station.longitude;
      this.totalDocks = station.totalDocks;
      this.postalCode = station.postalCode;
      this.hours = station.hours;
    }
  }

})();
