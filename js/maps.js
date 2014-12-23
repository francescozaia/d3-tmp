var map;

function initialize() {
  var mapOptions = {
    zoom: 18,
    center: new google.maps.LatLng(33.993469, -118.477304),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById('map'),
    mapOptions);
}
google.maps.event.addDomListener(window, 'load', initialize);
