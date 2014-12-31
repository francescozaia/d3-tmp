google.maps.event.addDomListener(window, 'load', function() {
  var mapOptions = {
    zoom: 16,
    center: new google.maps.LatLng(51.513590, -0.142450),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById('map'), mapOptions);
});
