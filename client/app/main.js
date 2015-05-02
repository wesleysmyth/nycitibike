(function() {
  'use strict';

  angular
    .module('app.main', [])
    .controller('Main', Main);

    function Main ($state, $http, dataservice, StationModel, $stateParams) {

      // set $scope to vm (view model)
      var vm = this;

      vm.zipCodes = [10001, 10002, 10003, 10004, 10005, 10006, 10007, 
      10009, 10010, 10011, 10012, 10013, 10014, 10016, 10017, 10018, 10019, 
      10020, 10022, 10023, 10036, 10038, 10045, 10155, 10168, 10280, 10282, 
      11201, 11205, 11211, 11216, 11217, 11238, 11249];

      vm.stationNames = ["Wythe Ave & Metropolitan Ave", "E 30 St & Park Ave S", "E 23 St & 1 Ave", "Railroad Ave & Kay Ave", "6 Ave & Broome St", "Little West St & 1 Pl", "Catherine St & Monroe St", "Central Park S & 6 Ave", "E 59 St & Sutton Pl", "Grand St & Greene St", "E 27 St & 1 Ave", "E 43 St & 2 Ave", "W 45 St & 8 Ave", "South End Ave & Liberty St", "E 55 St & Lexington Ave", "E 16 St & Irving Pl", "S 3 St & Bedford Ave", "W 15 St & 7 Ave", "11 Ave & W 41 St", "W 53 St & 10 Ave", "9 Ave & W 45 St", "Broadway & W 29 St", "W 44 St & 5 Ave", "E 20 St & FDR Drive", "E 12 St & 3 Ave", "W 37 St & 5 Ave", "W 39 St & 9 Ave", "10 Ave & W 28 St", "8 Ave & W 33 St", "E 24 St & Park Ave S", "W 33 St & 7 Ave", "E 16 St & 5 Ave", "W 47 St & 10 Ave", "W 26 St & 8 Ave", "E 17 St & Broadway", "W 45 St & 6 Ave", "Broadway & W 51 St", "FDR Drive & E 35 St", "Broadway & W 32 St", "Broadway & W 60 St", "Henry St & Grand St", "E 20 St & Park Ave", "W 46 St & 11 Ave", "E 25 St & 2 Ave", "1 Ave & E 15 St", "6 Ave & W 33 St", "E 14 St & Avenue B", "W 51 St & 6 Ave", "9 Ave & W 22 St", "W 29 St & 9 Ave", "W 56 St & 10 Ave", "12 Ave & W 40 St", "E 39 St & 2 Ave", "W 43 St & 10 Ave", "E 47 St & 1 Ave", "Pershing Square South", "Pershing Square North", "W 38 St & 8 Ave", "W 52 St & 5 Ave", "E 51 St & Lexington Ave", "8 Ave & W 31 St", "E 33 St & 5 Ave", "2 Ave & E 31 St", "W 43 St & 6 Ave", "W 34 St & 11 Ave", "E 33 St & 2 Ave", "Broadway & W 39 St", "W 42 St & 8 Ave", "S 5 Pl & S 4 St", "11 Ave & W 59 St", "Forsyth St & Broome St", "Water - Whitehall Plaza", "1 Ave & E 30 St", "Metropolitan Ave & Bedford Ave", "E 48 St & Madison Ave", "Lexington Ave & E 24 St", "Sands St & Navy St", "Front St & Washington St", "W 52 St & 11 Ave", "St James Pl & Pearl St", "Franklin St & W Broadway", "Park Ave & St Edwards St", "W 17 St & 8 Ave", "Atlantic Ave & Fort Greene Pl", "Clinton St & Joralemon St", "MacDougal St & Prince St", "Lexington Ave & Classon Ave", "E 56 St & Madison Ave", "Barrow St & Hudson St", "Nassau St & Navy St", "Greenwich St & Warren St", "E 2 St & Avenue C", "Cleveland Pl & Spring St", "Hudson St & Reade St", "E 40 St & 5 Ave", "E 37 St & Lexington Ave", "Henry St & Atlantic Ave", "LaGuardia Pl & W 3 St", "Warren St & Church St", "E 47 St & 2 Ave", "E 25 St & 1 Ave", "W 18 St & 6 Ave", "E 39 St & 3 Ave", "Broadway & W 49 St", "W 16 St & The High Line", "Old Fulton St", "Gallatin Pl & Livingston St", "Liberty St & Broadway", "Columbia Heights & Cranberry St", "Spruce St & Nassau St", "Great Jones St", "W 14 St & The High Line", "E 48 St & 3 Ave", "W 13 St & 7 Ave", "Bank St & Washington St", "St Marks Pl & 2 Ave", "Cadman Plaza E & Tillary St", "Joralemon St & Adams St", "E 11 St & 2 Ave", "Flushing Ave & Carlton Ave", "Willoughby St & Fleet St", "DeKalb Ave & S Portland Ave", "Fulton St & Rockwell Pl", "Willoughby Ave & Hall St", "Myrtle Ave & St Edwards St", "Perry St & Bleecker St", "Harrison St & Hudson St", "Laight St & Hudson St", "Lafayette St & Jersey St", "Mott St & Prince St", "W 11 St & 6 Ave", "W 13 St & 5 Ave", "MacDougal St & Washington Sq", "Lispenard St & Broadway", "DeKalb Ave & Vanderbilt Ave", "Johnson St & Gold St", "Washington Park", "South St & Whitehall St", "Broad St & Bridge St", "Avenue D & E 8 St", "Maiden Ln & Pearl St", "Stanton St & Chrystie St", "Elizabeth St & Hester St", "Broadway & W 36 St", "Ashland Pl & Hanson Pl", "Howard St & Centre St", "Adelphi St & Myrtle Ave", "Washington Ave & Greene Ave", "Lafayette Ave & Fort Greene Pl", "Duane St & Greenwich St", "Concord St & Bridge St", "Peck Slip & Front St", "E 10 St & 5 Ave", "Grand Army Plaza & Central Park S", "Broadway & E 14 St", "Kent Ave & S 11 St", "Greenwich Ave & 8 Ave", "2 Ave & E 58 St", "Monroe St & Classon Ave", "Washington Square E", "Division St & Bowery", "Madison St & Montgomery St", "Pike St & E Broadway", "Lafayette St & E 8 St", "3 Ave & Schermerhorn St", "E 15 St & 3 Ave", "E 2 St & Avenue B", "Avenue D & E 3 St", "Shevchenko Pl & E 7 St", "Canal St & Rutgers St", "Mercer St & Spring St", "E 58 St & 3 Ave", "Cliff St & Fulton St", "Broadway & Battery Pl", "Allen St & E Houston St", "State St & Smith St", "Murray St & West St", "St James Pl & Oliver St", "Norfolk St & Broome St", "Washington Ave & Park Ave", "Cadman Plaza West & Montague St", "E 6 St & Avenue B", "Fulton St & William St", "South St & Gouverneur Ln", "E 43 St & Vanderbilt Ave", "Cadman Plaza E & Red Cross Pl", "Lawrence St & Willoughby St", "Clinton St & Tillary St", "Leonard St & Church St", "Watts St & Greenwich St", "Vesey Pl & River Terrace", "DeKalb Ave & Hudson Ave", "E 19 St & 3 Ave", "E 11 St & 1 Ave", "W 20 St & 7 Ave", "Pike St & Monroe St", "Cherry St", "Reade St & Broadway", "Greenwich St & N Moore St", "Sullivan St & Washington Sq", "Old Slip & Front St", "Washington Pl & Broadway", "Madison St & Clinton St", "Avenue D & E 12 St", "Clinton Ave & Flushing Ave", "Stanton St & Mangin St", "W 13 St & 6 Ave", "Columbia St & Rivington St", "Monroe St & Bedford Ave", "Rivington St & Ridge St", "W Broadway & Spring St", "Bank St & Hudson St", "Clinton St & Grand St", "W Houston St & Hudson St", "S Portland Ave & Hanson Pl", "Emerson Pl & Myrtle Ave", "W 56 St & 6 Ave", "Bayard St & Baxter St", "Front St & Maiden Ln", "Bialystoker Pl & Delancey St", "William St & Pine St", "E 11 St & Broadway", "E 47 St & Park Ave", "Christopher St & Greenwich St", "Lafayette Ave & Classon Ave", "Allen St & Hester St", "Broadway & W 37 St", "Fulton St & Grand Ave", "West Thames St", "Clinton Ave & Myrtle Ave", "Franklin Ave & Myrtle Ave", "Carmine St & 6 Ave", "Washington Pl & 6 Ave", "E 53 St & Lexington Ave", "Willoughby Ave & Walworth St", "John St & William St", "Mercer St & Bleecker St", "6 Ave & Canal St", "W 31 St & 7 Ave", "E 55 St & 2 Ave", "University Pl & E 14 St", "Greenwich Ave & Charles St", "Centre St & Worth St", "W 4 St & 7 Ave S", "Duffield St & Willoughby St", "W 26 St & 10 Ave", "Broadway & Berry St", "Clark St & Henry St", "Centre St & Chambers St", "Jay St & Tech Pl", "Lefferts Pl & Franklin Ave", "Bond St & Schermerhorn St", "E 5 St & Avenue C", "E 9 St & Avenue C", "Lafayette Ave & St James Pl", "Atlantic Ave & Furman St", "Allen St & Rivington St", "Fulton St & Clermont Ave", "Pitt St & Stanton St", "Washington St & Gansevoort St", "Hicks St & Montague St", "9 Ave & W 14 St", "E 2 St & 2 Ave", "Broadway & E 22 St", "Market St & Cherry St", "Henry St & Poplar St", "DeKalb Ave & Skillman St", "E 6 St & Avenue D", "Suffolk St & Stanton St", "Pearl St & Anchorage Pl", "Forsyth St & Canal St", "Barclay St & Church St", "Pearl St & Hanover Square", "Cumberland St & Lafayette Ave", "Clermont Ave & Park Ave", "Carlton Ave & Park Ave", "W 59 St & 10 Ave", "Front St & Gold St", "Clermont Ave & Lafayette Ave", "W 54 St & 9 Ave", "West St & Chambers St", "York St & Jay St", "E 3 St & 1 Ave", "Bus Slip & State St", "E 7 St & Avenue A", "9 Ave & W 18 St", "E 13 St & Avenue A", "Hanover Pl & Livingston St", "W 21 St & 6 Ave", "E 45 St & 3 Ave", "E 4 St & 2 Ave", "Hancock St & Bedford Ave", "Macon St & Nostrand Ave", "St Marks Pl & 1 Ave", "Bedford Ave & S 9th St", "W 27 St & 7 Ave", "E 52 St & 2 Ave", "E 10 St & Avenue A", "Broadway & W 24 St", "W 49 St & 8 Ave", "W 24 St & 7 Ave", "W 37 St & 10 Ave", "8 Ave & W 52 St", "W 52 St & 9 Ave", "1 Ave & E 44 St", "E 51 St & 1 Ave", "W 22 St & 8 Ave", "Broadway & W 58 St", "E 53 St & Madison Ave", "11 Ave & W 27 St", "W 20 St & 11 Ave", "W 22 St & 10 Ave", "S 4 St & Wythe Ave", "E 20 St & 2 Ave", "9 Ave & W 16 St", "Broadway & W 41 St", "Dean St & 4 Ave", "E 56 St & 3 Ave", "W 25 St & 6 Ave", "Broadway & W 55 St", "W 20 St & 8 Ave", "Grand St & Havemeyer St", "E 32 St & Park Ave", "Broadway & W 53 St", "Rivington St & Chrystie St", "E 31 St & 3 Ave", "W 41 St & 8 Ave", "5 Ave & E 29 St"];
      vm.stations = [
        { stationId: 72, stationName: "W 52 St & 11 Ave" },
        { stationId: 79, stationName: "Franklin St & W Broadway" },
        { stationId: 82, stationName: "St James Pl & Pearl St" },
        { stationId: 83, stationName: "Atlantic Ave & Fort Greene Pl" },
        { stationId: 116, stationName: "W 17 St & 8 Ave" },
        { stationId: 119, stationName: "Park Ave & St Edwards St" },
        { stationId: 120, stationName: "Lexington Ave & Classon Ave" },
        { stationId: 127, stationName: "Barrow St & Hudson St" },
        { stationId: 128, stationName: "MacDougal St & Prince St" },
        { stationId: 137, stationName: "E 56 St & Madison Ave" },
        { stationId: 143, stationName: "Clinton St & Joralemon St" },
        { stationId: 144, stationName: "Nassau St & Navy St" },
        { stationId: 146, stationName: "Hudson St & Reade St" },
        { stationId: 147, stationName: "Greenwich St & Warren St" },
        { stationId: 150, stationName: "E 2 St & Avenue C" },
        { stationId: 151, stationName: "Cleveland Pl & Spring St" },
        { stationId: 152, stationName: "Warren St & Church St" },
        { stationId: 153, stationName: "E 40 St & 5 Ave" },
        { stationId: 157, stationName: "Henry St & Atlantic Ave" },
        { stationId: 160, stationName: "E 37 St & Lexington Ave" },
        { stationId: 161, stationName: "LaGuardia Pl & W 3 St" },
        { stationId: 164, stationName: "E 47 St & 2 Ave" },
        { stationId: 167, stationName: "E 39 St & 3 Ave" },
        { stationId: 168, stationName: "W 18 St & 6 Ave" },
        { stationId: 173, stationName: "Broadway & W 49 St" },
        { stationId: 174, stationName: "E 25 St & 1 Ave" },
        { stationId: 195, stationName: "Liberty St & Broadway" },
        { stationId: 212, stationName: "W 16 St & The High Line" },
        { stationId: 216, stationName: "Columbia Heights & Cranberry St" },
        { stationId: 217, stationName: "Old Fulton St" },
        { stationId: 218, stationName: "Gallatin Pl & Livingston St" },
        { stationId: 223, stationName: "W 13 St & 7 Ave" },
        { stationId: 224, stationName: "Spruce St & Nassau St" },
        { stationId: 225, stationName: "W 14 St & The High Line" },
        { stationId: 228, stationName: "E 48 St & 3 Ave" },
        { stationId: 229, stationName: "Great Jones St" },
        { stationId: 232, stationName: "Cadman Plaza E & Tillary St" },
        { stationId: 233, stationName: "Joralemon St & Adams St" },
        { stationId: 236, stationName: "St Marks Pl & 2 Ave" },
        { stationId: 237, stationName: "E 11 St & 2 Ave" },
        { stationId: 238, stationName: "Bank St & Washington St" },
        { stationId: 239, stationName: "Willoughby St & Fleet St" },
        { stationId: 241, stationName: "DeKalb Ave & S Portland Ave" },
        { stationId: 242, stationName: "Flushing Ave & Carlton Ave" },
        { stationId: 243, stationName: "Fulton St & Rockwell Pl" },
        { stationId: 244, stationName: "Willoughby Ave & Hall St" },
        { stationId: 245, stationName: "Myrtle Ave & St Edwards St" },
        { stationId: 247, stationName: "Perry St & Bleecker St" },
        { stationId: 248, stationName: "Laight St & Hudson St" },
        { stationId: 249, stationName: "Harrison St & Hudson St" },
        { stationId: 250, stationName: "Lafayette St & Jersey St" },
        { stationId: 251, stationName: "Mott St & Prince St" },
        { stationId: 252, stationName: "MacDougal St & Washington Sq" },
        { stationId: 253, stationName: "W 13 St & 5 Ave" },
        { stationId: 254, stationName: "W 11 St & 6 Ave" },
        { stationId: 257, stationName: "Lispenard St & Broadway" },
        { stationId: 258, stationName: "DeKalb Ave & Vanderbilt Ave" },
        { stationId: 259, stationName: "South St & Whitehall St" },
        { stationId: 260, stationName: "Broad St & Bridge St" },
        { stationId: 261, stationName: "Johnson St & Gold St" },
        { stationId: 262, stationName: "Washington Park" },
        { stationId: 263, stationName: "Elizabeth St & Hester St" },
        { stationId: 264, stationName: "Maiden Ln & Pearl St" },
        { stationId: 265, stationName: "Stanton St & Chrystie St" },
        { stationId: 266, stationName: "Avenue D & E 8 St" },
        { stationId: 267, stationName: "Broadway & W 36 St" },
        { stationId: 268, stationName: "Howard St & Centre St" },
        { stationId: 270, stationName: "Adelphi St & Myrtle Ave" },
        { stationId: 271, stationName: "Ashland Pl & Hanson Pl" },
        { stationId: 274, stationName: "Lafayette Ave & Fort Greene Pl" },
        { stationId: 275, stationName: "Washington Ave & Greene Ave" },
        { stationId: 276, stationName: "Duane St & Greenwich St" },
        { stationId: 278, stationName: "Concord St & Bridge St" },
        { stationId: 279, stationName: "Peck Slip & Front St" },
        { stationId: 280, stationName: "E 10 St & 5 Ave" },
        { stationId: 281, stationName: "Grand Army Plaza & Central Park S" },
        { stationId: 282, stationName: "Kent Ave & S 11 St" },
        { stationId: 284, stationName: "Greenwich Ave & 8 Ave" },
        { stationId: 285, stationName: "Broadway & E 14 St" },
        { stationId: 289, stationName: "Monroe St & Classon Ave" },
        { stationId: 290, stationName: "2 Ave & E 58 St" },
        { stationId: 291, stationName: "Madison St & Montgomery St" },
        { stationId: 293, stationName: "Lafayette St & E 8 St" },
        { stationId: 294, stationName: "Washington Square E" },
        { stationId: 295, stationName: "Pike St & E Broadway" },
        { stationId: 296, stationName: "Division St & Bowery" },
        { stationId: 297, stationName: "E 15 St & 3 Ave" },
        { stationId: 298, stationName: "3 Ave & Schermerhorn St" },
        { stationId: 300, stationName: "Shevchenko Pl & E 7 St" },
        { stationId: 301, stationName: "E 2 St & Avenue B" },
        { stationId: 302, stationName: "Avenue D & E 3 St" },
        { stationId: 303, stationName: "Mercer St & Spring St" },
        { stationId: 304, stationName: "Broadway & Battery Pl" },
        { stationId: 305, stationName: "E 58 St & 3 Ave" },
        { stationId: 306, stationName: "Cliff St & Fulton St" },
        { stationId: 307, stationName: "Canal St & Rutgers St" },
        { stationId: 308, stationName: "St James Pl & Oliver St" },
        { stationId: 309, stationName: "Murray St & West St" },
        { stationId: 310, stationName: "State St & Smith St" },
        { stationId: 311, stationName: "Norfolk St & Broome St" },
        { stationId: 312, stationName: "Allen St & E Houston St" },
        { stationId: 313, stationName: "Washington Ave & Park Ave" },
        { stationId: 314, stationName: "Cadman Plaza West & Montague St" },
        { stationId: 315, stationName: "South St & Gouverneur Ln" },
        { stationId: 316, stationName: "Fulton St & William St" },
        { stationId: 317, stationName: "E 6 St & Avenue B" },
        { stationId: 318, stationName: "E 43 St & Vanderbilt Ave" },
        { stationId: 320, stationName: "Leonard St & Church St" },
        { stationId: 321, stationName: "Cadman Plaza E & Red Cross Pl" },
        { stationId: 322, stationName: "Clinton St & Tillary St" },
        { stationId: 323, stationName: "Lawrence St & Willoughby St" },
        { stationId: 324, stationName: "DeKalb Ave & Hudson Ave" },
        { stationId: 325, stationName: "E 19 St & 3 Ave" },
        { stationId: 326, stationName: "E 11 St & 1 Ave" },
        { stationId: 327, stationName: "Vesey Pl & River Terrace" },
        { stationId: 328, stationName: "Watts St & Greenwich St" },
        { stationId: 329, stationName: "Greenwich St & N Moore St" },
        { stationId: 330, stationName: "Reade St & Broadway" },
        { stationId: 331, stationName: "Pike St & Monroe St" },
        { stationId: 332, stationName: "Cherry St" },
        { stationId: 334, stationName: "W 20 St & 7 Ave" },
        { stationId: 335, stationName: "Washington Pl & Broadway" },
        { stationId: 336, stationName: "Sullivan St & Washington Sq" },
        { stationId: 337, stationName: "Old Slip & Front St" },
        { stationId: 339, stationName: "Avenue D & E 12 St" },
        { stationId: 340, stationName: "Madison St & Clinton St" },
        { stationId: 341, stationName: "Stanton St & Mangin St" },
        { stationId: 342, stationName: "Columbia St & Rivington St" },
        { stationId: 343, stationName: "Clinton Ave & Flushing Ave" },
        { stationId: 344, stationName: "Monroe St & Bedford Ave" },
        { stationId: 345, stationName: "W 13 St & 6 Ave" },
        { stationId: 346, stationName: "Bank St & Hudson St" },
        { stationId: 347, stationName: "W Houston St & Hudson St" },
        { stationId: 348, stationName: "W Broadway & Spring St" },
        { stationId: 349, stationName: "Rivington St & Ridge St" },
        { stationId: 350, stationName: "Clinton St & Grand St" },
        { stationId: 351, stationName: "Front St & Maiden Ln" },
        { stationId: 352, stationName: "W 56 St & 6 Ave" },
        { stationId: 353, stationName: "S Portland Ave & Hanson Pl" },
        { stationId: 354, stationName: "Emerson Pl & Myrtle Ave" },
        { stationId: 355, stationName: "Bayard St & Baxter St" },
        { stationId: 356, stationName: "Bialystoker Pl & Delancey St" },
        { stationId: 357, stationName: "E 11 St & Broadway" },
        { stationId: 358, stationName: "Christopher St & Greenwich St" },
        { stationId: 359, stationName: "E 47 St & Park Ave" },
        { stationId: 360, stationName: "William St & Pine St" },
        { stationId: 361, stationName: "Allen St & Hester St" },
        { stationId: 362, stationName: "Broadway & W 37 St" },
        { stationId: 363, stationName: "West Thames St" },
        { stationId: 364, stationName: "Lafayette Ave & Classon Ave" },
        { stationId: 365, stationName: "Fulton St & Grand Ave" },
        { stationId: 366, stationName: "Clinton Ave & Myrtle Ave" },
        { stationId: 367, stationName: "E 53 St & Lexington Ave" },
        { stationId: 368, stationName: "Carmine St & 6 Ave" },
        { stationId: 369, stationName: "Washington Pl & 6 Ave" },
        { stationId: 372, stationName: "Franklin Ave & Myrtle Ave" },
        { stationId: 373, stationName: "Willoughby Ave & Walworth St" },
        { stationId: 375, stationName: "Mercer St & Bleecker St" },
        { stationId: 376, stationName: "John St & William St" },
        { stationId: 377, stationName: "6 Ave & Canal St" },
        { stationId: 379, stationName: "W 31 St & 7 Ave" },
        { stationId: 380, stationName: "W 4 St & 7 Ave S" },
        { stationId: 382, stationName: "University Pl & E 14 St" },
        { stationId: 383, stationName: "Greenwich Ave & Charles St" },
        { stationId: 385, stationName: "E 55 St & 2 Ave" },
        { stationId: 386, stationName: "Centre St & Worth St" },
        { stationId: 387, stationName: "Centre St & Chambers St" },
        { stationId: 388, stationName: "W 26 St & 10 Ave" },
        { stationId: 389, stationName: "Broadway & Berry St" },
        { stationId: 390, stationName: "Duffield St & Willoughby St" },
        { stationId: 391, stationName: "Clark St & Henry St" },
        { stationId: 392, stationName: "Jay St & Tech Pl" },
        { stationId: 393, stationName: "E 5 St & Avenue C" },
        { stationId: 394, stationName: "E 9 St & Avenue C" },
        { stationId: 395, stationName: "Bond St & Schermerhorn St" },
        { stationId: 396, stationName: "Lefferts Pl & Franklin Ave" },
        { stationId: 397, stationName: "Fulton St & Clermont Ave" },
        { stationId: 398, stationName: "Atlantic Ave & Furman St" },
        { stationId: 399, stationName: "Lafayette Ave & St James Pl" },
        { stationId: 400, stationName: "Pitt St & Stanton St" },
        { stationId: 401, stationName: "Allen St & Rivington St" },
        { stationId: 402, stationName: "Broadway & E 22 St" },
        { stationId: 403, stationName: "E 2 St & 2 Ave" },
        { stationId: 404, stationName: "9 Ave & W 14 St" },
        { stationId: 405, stationName: "Washington St & Gansevoort St" },
        { stationId: 406, stationName: "Hicks St & Montague St" },
        { stationId: 407, stationName: "Henry St & Poplar St" },
        { stationId: 408, stationName: "Market St & Cherry St" },
        { stationId: 409, stationName: "DeKalb Ave & Skillman St" },
        { stationId: 410, stationName: "Suffolk St & Stanton St" },
        { stationId: 411, stationName: "E 6 St & Avenue D" },
        { stationId: 412, stationName: "Forsyth St & Canal St" },
        { stationId: 414, stationName: "Pearl St & Anchorage Pl" },
        { stationId: 415, stationName: "Pearl St & Hanover Square" },
        { stationId: 416, stationName: "Cumberland St & Lafayette Ave" },
        { stationId: 417, stationName: "Barclay St & Church St" },
        { stationId: 418, stationName: "Front St & Gold St" },
        { stationId: 419, stationName: "Carlton Ave & Park Ave" },
        { stationId: 420, stationName: "Clermont Ave & Lafayette Ave" },
        { stationId: 421, stationName: "Clermont Ave & Park Ave" },
        { stationId: 422, stationName: "W 59 St & 10 Ave" },
        { stationId: 423, stationName: "W 54 St & 9 Ave" },
        { stationId: 426, stationName: "West St & Chambers St" },
        { stationId: 427, stationName: "Bus Slip & State St" },
        { stationId: 428, stationName: "E 3 St & 1 Ave" },
        { stationId: 430, stationName: "York St & Jay St" },
        { stationId: 431, stationName: "Hanover Pl & Livingston St" },
        { stationId: 432, stationName: "E 7 St & Avenue A" },
        { stationId: 433, stationName: "E 13 St & Avenue A" },
        { stationId: 434, stationName: "9 Ave & W 18 St" },
        { stationId: 435, stationName: "W 21 St & 6 Ave" },
        { stationId: 436, stationName: "Hancock St & Bedford Ave" },
        { stationId: 437, stationName: "Macon St & Nostrand Ave" },
        { stationId: 438, stationName: "St Marks Pl & 1 Ave" },
        { stationId: 439, stationName: "E 4 St & 2 Ave" },
        { stationId: 440, stationName: "E 45 St & 3 Ave" },
        { stationId: 441, stationName: "E 52 St & 2 Ave" },
        { stationId: 442, stationName: "W 27 St & 7 Ave" },
        { stationId: 443, stationName: "Bedford Ave & S 9th St" },
        { stationId: 444, stationName: "Broadway & W 24 St" },
        { stationId: 445, stationName: "E 10 St & Avenue A" },
        { stationId: 446, stationName: "W 24 St & 7 Ave" },
        { stationId: 447, stationName: "8 Ave & W 52 St" },
        { stationId: 448, stationName: "W 37 St & 10 Ave" },
        { stationId: 449, stationName: "W 52 St & 9 Ave" },
        { stationId: 450, stationName: "W 49 St & 8 Ave" },
        { stationId: 453, stationName: "W 22 St & 8 Ave" },
        { stationId: 454, stationName: "E 51 St & 1 Ave" },
        { stationId: 455, stationName: "1 Ave & E 44 St" },
        { stationId: 456, stationName: "E 53 St & Madison Ave" },
        { stationId: 457, stationName: "Broadway & W 58 St" },
        { stationId: 458, stationName: "11 Ave & W 27 St" },
        { stationId: 459, stationName: "W 20 St & 11 Ave" },
        { stationId: 460, stationName: "S 4 St & Wythe Ave" },
        { stationId: 461, stationName: "E 20 St & 2 Ave" },
        { stationId: 462, stationName: "W 22 St & 10 Ave" },
        { stationId: 463, stationName: "9 Ave & W 16 St" },
        { stationId: 464, stationName: "E 56 St & 3 Ave" },
        { stationId: 465, stationName: "Broadway & W 41 St" },
        { stationId: 466, stationName: "W 25 St & 6 Ave" },
        { stationId: 467, stationName: "Dean St & 4 Ave" },
        { stationId: 468, stationName: "Broadway & W 55 St" },
        { stationId: 469, stationName: "Broadway & W 53 St" },
        { stationId: 470, stationName: "W 20 St & 8 Ave" },
        { stationId: 471, stationName: "Grand St & Havemeyer St" },
        { stationId: 472, stationName: "E 32 St & Park Ave" },
        { stationId: 473, stationName: "Rivington St & Chrystie St" },
        { stationId: 474, stationName: "5 Ave & E 29 St" },
        { stationId: 475, stationName: "E 16 St & Irving Pl" },
        { stationId: 476, stationName: "E 31 St & 3 Ave" },
        { stationId: 477, stationName: "W 41 St & 8 Ave" },
        { stationId: 478, stationName: "11 Ave & W 41 St" },
        { stationId: 479, stationName: "9 Ave & W 45 St" },
        { stationId: 480, stationName: "W 53 St & 10 Ave" },
        { stationId: 481, stationName: "S 3 St & Bedford Ave" },
        { stationId: 482, stationName: "W 15 St & 7 Ave" },
        { stationId: 483, stationName: "E 12 St & 3 Ave" },
        { stationId: 484, stationName: "W 44 St & 5 Ave" },
        { stationId: 485, stationName: "W 37 St & 5 Ave" },
        { stationId: 486, stationName: "Broadway & W 29 St" },
        { stationId: 487, stationName: "E 20 St & FDR Drive" },
        { stationId: 488, stationName: "W 39 St & 9 Ave" },
        { stationId: 489, stationName: "10 Ave & W 28 St" },
        { stationId: 490, stationName: "8 Ave & W 33 St" },
        { stationId: 491, stationName: "E 24 St & Park Ave S" },
        { stationId: 492, stationName: "W 33 St & 7 Ave" },
        { stationId: 493, stationName: "W 45 St & 6 Ave" },
        { stationId: 494, stationName: "W 26 St & 8 Ave" },
        { stationId: 495, stationName: "W 47 St & 10 Ave" },
        { stationId: 496, stationName: "E 16 St & 5 Ave" },
        { stationId: 497, stationName: "E 17 St & Broadway" },
        { stationId: 498, stationName: "Broadway & W 32 St" },
        { stationId: 499, stationName: "Broadway & W 60 St" },
        { stationId: 500, stationName: "Broadway & W 51 St" },
        { stationId: 501, stationName: "FDR Drive & E 35 St" },
        { stationId: 502, stationName: "Henry St & Grand St" },
        { stationId: 503, stationName: "E 20 St & Park Ave" },
        { stationId: 504, stationName: "1 Ave & E 15 St" },
        { stationId: 505, stationName: "6 Ave & W 33 St" },
        { stationId: 507, stationName: "E 25 St & 2 Ave" },
        { stationId: 508, stationName: "W 46 St & 11 Ave" },
        { stationId: 509, stationName: "9 Ave & W 22 St" },
        { stationId: 510, stationName: "W 51 St & 6 Ave" },
        { stationId: 511, stationName: "E 14 St & Avenue B" },
        { stationId: 512, stationName: "W 29 St & 9 Ave" },
        { stationId: 513, stationName: "W 56 St & 10 Ave" },
        { stationId: 514, stationName: "12 Ave & W 40 St" },
        { stationId: 515, stationName: "W 43 St & 10 Ave" },
        { stationId: 516, stationName: "E 47 St & 1 Ave" },
        { stationId: 517, stationName: "Pershing Square South" },
        { stationId: 518, stationName: "E 39 St & 2 Ave" },
        { stationId: 519, stationName: "Pershing Square North" },
        { stationId: 520, stationName: "W 52 St & 5 Ave" },
        { stationId: 521, stationName: "8 Ave & W 31 St" },
        { stationId: 522, stationName: "E 51 St & Lexington Ave" },
        { stationId: 523, stationName: "W 38 St & 8 Ave" },
        { stationId: 524, stationName: "W 43 St & 6 Ave" },
        { stationId: 525, stationName: "W 34 St & 11 Ave" },
        { stationId: 526, stationName: "E 33 St & 5 Ave" },
        { stationId: 527, stationName: "E 33 St & 2 Ave" },
        { stationId: 528, stationName: "2 Ave & E 31 St" },
        { stationId: 529, stationName: "W 42 St & 8 Ave" },
        { stationId: 530, stationName: "11 Ave & W 59 St" },
        { stationId: 531, stationName: "Forsyth St & Broome St" },
        { stationId: 532, stationName: "S 5 Pl & S 4 St" },
        { stationId: 533, stationName: "Broadway & W 39 St" },
        { stationId: 534, stationName: "Water - Whitehall Plaza" },
        { stationId: 536, stationName: "1 Ave & E 30 St" },
        { stationId: 537, stationName: "Lexington Ave & E 24 St" },
        { stationId: 538, stationName: "E 48 St & Madison Ave" },
        { stationId: 539, stationName: "Metropolitan Ave & Bedford Ave" },
        { stationId: 545, stationName: "E 23 St & 1 Ave" },
        { stationId: 546, stationName: "E 30 St & Park Ave S" },
        { stationId: 2000, stationName: "Front St & Washington St" },
        { stationId: 2001, stationName: "Sands St & Navy St" },
        { stationId: 2002, stationName: "Wythe Ave & Metropolitan Ave" },
        { stationId: 2004, stationName: "6 Ave & Broome St" },
        { stationId: 2005, stationName: "Railroad Ave & Kay Ave" },
        { stationId: 2006, stationName: "Central Park S & 6 Ave" },
        { stationId: 2008, stationName: "Little West St & 1 Pl" },
        { stationId: 2009, stationName: "Catherine St & Monroe St" },
        { stationId: 2010, stationName: "Grand St & Greene St" },
        { stationId: 2012, stationName: "E 27 St & 1 Ave" },
        { stationId: 2017, stationName: "E 43 St & 2 Ave" },
        { stationId: 2021, stationName: "W 45 St & 8 Ave" },
        { stationId: 2022, stationName: "E 59 St & Sutton Pl" },
        { stationId: 2023, stationName: "E 55 St & Lexington Ave" },
        { stationId: 3002, stationName: "South End Ave & Liberty St" }
      ];

      if ($stateParams.borough) {
        vm.borough = $stateParams.borough === 'manhattan' ? 'Manhattan' : 'Brooklyn';
      } else if ($stateParams.postalCode) {
        vm.postalCode = $stateParams.postalCode;
      } else if ($stateParams.stationId) {
        vm.stations.forEach(function (station) {
          if (station.stationId === parseInt($stateParams.stationId, 10)) {
            vm.stationId = station.stationId;
            vm.stationName = station.stationName;
          }
        });
      }

      vm.showModal = showModal;
      vm.closeModal = closeModal;

      ////////////////////////////

      function showModal (state) {
        $('.modal').addClass('active');
        $('.' + state).addClass('modal-content');
        $('.' + state).addClass('show-opaque');
        $('.' + state).removeClass('hide');
        $('.' + state + '-button').removeClass('hide');

        // if click event occurs outside the modal, close, stationName the active modal
        $('.modal-overlay').on('click', function(e){
          if (e.target === e.currentTarget) {
            vm.closeModal(state);
          }
        });
      }

      function closeModal (state) {
        
        $('.modal').removeClass('active');
        $('.' + state).addClass('hide');
        $('.' + state + '-button').addClass('hide');
        $('.' + state).removeClass('show-opaque');
        
        setTimeout(function () {
          $('.' + state).removeClass('modal-content')
        }, 500);

      }

    }

})();