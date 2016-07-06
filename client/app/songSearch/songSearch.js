angular.module('songSearch', [])

.controller('songSearchController', function ($scope, Search) {
	angular.extend($scope, Search);
	//$scope.input='';
	$scope.audio = null;
	$scope.topTracks = [];
	$scope.events;
	$scope.image;
	$scope.afterSearch = false;
	$scope.callInput = function(input){
		var searchArr = Search.searchArtist(input);
		searchArr.then(function(item){
			console.log('get image', item);
			$scope.image = item.images[0].url;
			Search.getTopTracks(item.id).then(function(trackObj){

				console.log(trackObj);
				$scope.topTracks = trackObj;
				$scope.afterSearch = true;

			})
		});

		var searchEvents = Search.upcomingEvents(input, function(resp){
			console.log(resp);
			$scope.events = resp;
			// var time = $scope.events.datetime;

			// function convertDate(inputFormat) {
			//   function pad(s) { return (s < 10) ? '0' + s : s; }
			//   var d = new Date(inputFormat);
			//   return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
			// }
			// convertDate(time);
		});
		// searchEvents.success(function(events){
		// 	console.log(events);
		// })
	};

	$scope.playTrack = function(){
		console.log(this);
		if(!$scope.audio){
		  $scope.audio = new Audio(this.track.preview_url);
       	  $scope.audio.play();
		} else {
			$scope.audio.pause();
			$scope.audio = null;
		}
		
	}

});
