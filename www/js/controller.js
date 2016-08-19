angular.module('starter.controllers', ['ionic','firebase'])

// .controller('GeoLoc', function($cordovaGeoLocation){
// 	var posOptions = {timeout: 10000, enableHighAccuracy:false};
// 	$cordovaGeoLocation
// 		.getCurrentPosition(posOptions)
// 		.then(function(position){
// 			var lat  = position.coords.latitude
//       		var long = position.coords.longitude
//     	}, function(err) {
//       	// error
//     	});
// })

.controller('MapCtrl', ['$scope','$firebase','$ionicPopup', function($scope,$firebase,$ionicPopup) {

	$scope.user = {};
	$scope.showAlert = function() {
	    $ionicPopup.alert({
	        title: 'iMapApp',
	        template: 'Your location has been saved!!'
	    });
	};

	$scope.saveDetails = function(){
	    var lat = $scope.user.latitude;
	    var lgt = $scope.user.longitude;
	    var des = $scope.user.desc;

	    var firebaseObj = new Firebase("https://travelapp-6f39f.firebaseapp.com/MapDetails");
	    var fb = $firebase(firebaseObj);

	    fb.$push({
		    latitude: lat,
		    longitude: lgt,
		    description: des
		}).then(function(ref) {
		    $scope.user = {};
		    $scope.showAlert();
		}, function(error) {
		    console.log("Error:", error);
		});

    // Code to write to Firebase will be here
  	}
}])

.directive('map', function() {
    return {
        restrict: 'A',
        link:function(scope, element, attrs){

          var zValue = scope.$eval(attrs.zoom);
          var lat = scope.$eval(attrs.lat);
          var lng = scope.$eval(attrs.lng);


          var myLatlng = new google.maps.LatLng(lat,lng),
          mapOptions = {
              zoom: zValue,
              center: myLatlng
          },
          map = new google.maps.Map(element[0],mapOptions),
          marker = new google.maps.Marker({
			    position: myLatlng,
			    map: map,
			    draggable:true
		  });

		  google.maps.event.addListener(marker, 'dragend', function(evt){
		    scope.$parent.user.latitude = evt.latLng.lat();
		    scope.$parent.user.longitude = evt.latLng.lng();
		    console.log("long: " + evt.latLng.lat() + " lat: " + evt.latLng.lng())
		    scope.$apply();
		  });
        }
    };
});