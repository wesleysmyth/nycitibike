(function() {

  angular
    .module('core.models')
    .factory('StationModel', StationModel);

  function StationModel () {

    var stationModel = {
      constructor: constructor
    };

    return stationModel;

    /////////////////////////////////////

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
