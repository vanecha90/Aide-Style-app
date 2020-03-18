// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })
    .state('login', {
      url: "/login",
      views: {
        '': {
          templateUrl: "templates/login.html",
          //controller:'LoginCtrl'
        }
      }
    })
    .state('welcome', {
      url: "/welcome",
      views: {
        '': {
          templateUrl: "templates/welcome.html",
          controller:'SlideController'
        }
      }
    })
    .state('tabs.discover', {
      url: "/discover",
      views: {
        'discover-tab': {
          templateUrl: "templates/discover.html",
        }
      }
    })
    .state('toppicks', {
      url: "/toppicks",
      views: {
        '': {
          templateUrl: "templates/toppicks.html",
          controller: 'TopPickCtrl'
        }
      }
    })

    .state('toppicks/detail', {
      url: "/toppicks/:aId",
      views: {
        '': {
          templateUrl: "templates/toppdetail.html",
          controller: 'TopPickCtrl'
        }
      }
    })
    .state('topoutfits', {
      url: "/topoutfits",
      views: {
        '': {
          templateUrl: "templates/topoutfits.html",
          controller: 'TopoutCtrl'
        }
      }
    })
    .state('topoutfits/detail', {
      url: "/topoutfits/:aId",
      views: {
        '': {
          templateUrl: "templates/topoutfitsdeatil.html",
          controller: 'TopoutCtrl'
        }
      }
    })
    .state('myoutfits', {
      url: "/myoutfits",
      views: {
        '': {
          templateUrl: "templates/myoutfits.html",
          controller:  'ImageController'//'MyoutfitCtrl'
        }
      }
    })

    .state('tabs.style', {
      url: "/style",
      views: {
        'style-tab': {
          templateUrl: "templates/style.html",
          controller: 'StyleController'
        }
      }
    })
    .state('style_form_1', {
      url: "/style_form_1",
      views: {
        '': {
          templateUrl: "templates/style_form_1.html",
          controller: 'Styleform_1Ctrl'
        }
      }
    })

    .state('styleform_color', {
      url: "/styleform_color",
      views: {
        '': {
          templateUrl: "templates/styleform_color.html",
           controller: 'ColoController'
        }
      }
    })
    .state('match', {
      url: "/match",
      views: {
        '': {
          templateUrl: "templates/match.html",
           controller: 'MatchCtr'
        }
      }
    })
    .state('tabs.profile', {
      url: "/profile",
      views: {
        'profile-tab': {
          templateUrl: "templates/profile.html",
          controller: 'ProfileCtrl'
        }
      }
    })
    .state('loading', {
      url: "/loading",
      views: {
        'loading': {
          templateUrl: "templates/loading2.html",
          controller: 'Loading2Ctrl'
        }
      }
    })
    $urlRouterProvider.otherwise('/welcome');

})

.config(function($httpProvider) {
  $httpProvider.interceptors.push(function($rootScope) {
    return {
      request: function(config) {
        $rootScope.$broadcast('loading:show')
        return config
      },
      response: function(response) {
        $rootScope.$broadcast('loading:hide')
        return response
      }
    }
  })
})

.run(function($rootScope, $ionicLoading) {
  $rootScope.$on('loading:show', function() {
    $ionicLoading.show({template: 'loading'})
  })

  $rootScope.$on('loading:hide', function() {
    $ionicLoading.hide()
  })

  $rootScope.selectedItem = {
      category:'',
      itemtype:'',
      color:''
  };
})

.controller('Styleform_1Ctrl', function($scope) {
	$scope.active_content = 'tops';
	$scope.setActiveContent = function(active_content){
	$scope.active_content = active_content;
	}
  $scope.selectStyle = function($event){
    var key= $($event.currentTarget).data('key');
    var value= $($event.currentTarget).data('value');
    $scope.selectedItem[key]=value;
    console.log($scope.selectedItem);

  }
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
  });
})

.controller('StyleController', function($scope) {
  $scope.selectThing = function($event) {
    var key= $($event.currentTarget).data('key');
    var value= $($event.currentTarget).data('value');
    $scope.selectedItem[key]=value;
    console.log($scope.selectedItem);
  }
})
.controller('ColoController', function($scope) {
  $scope.selectThing = function($event) {
    var key= $($event.currentTarget).data('key');
    var value= $($event.currentTarget).data('value');
    $scope.selectedItem[key]=value;
    console.log($scope.selectedItem);
  }
})
.controller('MatchCtr', function($scope,$ionicActionSheet,$state){
  var querystring="";
   //var items= [ 'dress-shirt','tees','men-blazer','hoodie','men-polo','jacket','pants','jeans','shorts',
//'tie','belt','watch','sunglasses','hats','scarfs','boots','sneakers','loafters','oxfords' ];
var items= ["men-polo,jackets,boots,dress-shirt,men-blazer"];
//var items= [ 'dress-shirt','pants','men-blazer','men-watch'];
  if ($scope.selectedItem['category'] == "business casual"){
    querystring +=['dress-shirt','dress-pants','jacket']  }
  else if ($scope.selectedItem['category'] == "casual") {
    querystring += ['men-jackets','jeans','hats','tees','polo-shirt']
  }else if ($scope.selectedItem['category'] == "Hipster") {
    querystring += "tees,jeans,boots,glasses,hat"
  }else if ($scope.selectedItem['category'] == "business formal") {
  querystring += "dress-shirt,pants,blaze,watch"
  } else if ($scope.selectedItem['category'] == "urban") {
  querystring += "tees,jeans,boots,hoodies"
}
  console.log($scope.selectedItem);
  var i= items.indexOf($scope.selectedItem['itemtype'])
  items.splice(i,1);
  querystring = items.join(",");
  var colors = '';
if ($scope.selectedItem['color'] == 'blue') {
	colors = 'black,white,grey'
} else if ($scope.selectedItem['color'] == 'yellow') {
	colors = 'orange+red+black+grey'
} else if( $scope.selectedItem['color'] == 'green'){
colors='blue+black+grey+white'
}else if( $scope.selectedItem['color'] == 'pink'){
colors='red+black+grey+white'
}else if( $scope.selectedItem['color'] == 'white'){
colors='red+black+grey+white'
}else if( $scope.selectedItem['color'] == 'purple'){
colors='black+grey+white'
}else if( $scope.selectedItem['color'] == 'brown'){
colors='orange+white+black'
}else if( $scope.selectedItem['color'] == 'grey'){
colors='blue+black+red+white'
}else if( $scope.selectedItem['color'] == 'black'){
colors='blue+red+white,orange'
}
  querystring += colors;
  $.ajax({
    url: "http://api.shopstyle.com/api/v2/products?pid=uid6016-33469504-95&cat=men&offset=0&limit=5&fts=" + querystring,
    success: function(data) {
        var o = [];
        var p = [];
        data.products.forEach(function(product) {
          if (o.indexOf(product.categories[0].name) == -1) {
              o.push(product.categories[0].name);
              p.push(product);
          }
        });
        $scope.products = p;

        $scope.showDetails = function(e) {
          var id = $(e.toElement).data('id');
          console.log($('#'+id).find('.details'));
          $('.selectedItem').find('img').attr('src', $('#'+id).find('.full-image').attr('src'));
          $('.selected-item-description').text($('#'+id).find('.details').find('.description').text());
          $('.selected-item-price').text($('#'+id).find('.details').find('.price').text())

        }

    }
  })
  $scope.share = function() {
  $scope.hideSheet = $ionicActionSheet.show({
      buttons:[
        {text:'Save outfit'},
      {text:'Like'}],
      cancelText: 'Cancel',
      buttonClicked: function(index) {
        console.log('CANCELLED');
      }
    });
  }
  $scope.shar = function() {
  $scope.hideSheet = $ionicActionSheet.show({
    buttons:[
    {text:'Like'}],
      cancelText: 'Cancel',
      buttonClicked: function(index) {
        console.log('CANCELLED');
      }
    });
  }
})

.controller('ProfileCtrl', function($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeft= function(){
    $ionicSideMenuDelegate.toggleLeft()
  }
	$scope.active_content = 'likes';
	$scope.setActiveContent = function(active_content){
		$scope.active_content = active_content;
	}
})

.controller('SlideController', function($scope,$ionicSlideBoxDelegate,$state) {

  $scope.myActiveSlide = 0;

})
.controller("TopPickCtrl",['$scope', '$http', '$state', '$ionicActionSheet', function($scope, $http, $state, $ionicActionSheet){
  $http.get('http://api.shopstyle.com/api/v2/products?pid=uid6016-33469504-95&fts=men+clothes&sort=Favorite&offset=0&limit=40')
    .success(function(data){
      $scope.products = data.products;
      $scope.whichproduct=$state.params.aId;
      //console.log($scope.products)

  })

  $scope.toggleThumbsup= function(item){
  item.thumbsup = !item.thumbsup;
  }
  //this is for the <i> like button on toppicks
  /*$scope.some_model = {
    title: 'Thing One',
    liked: false,
}*/

$scope.$on('$ionicView.beforeEnter', function (event, viewData) {
  viewData.enableBack = true;
});

$scope.share = function() {
$scope.hideSheet = $ionicActionSheet.show({
  buttons:[
    { text:'<i class="ion-social-facebook icon-button icon-action"></i> Facebook' },
         { text: '<i class="ion-chatbox icon-button icon-action"> Message' },
         { text: '<i class="ion-social-twitter icon-button icon-action"></i> Twitter' },
         { text: '<i class="ion-more icon-button icon-action"></i> More ' },
       ],
    cancelText: 'Cancel',
    buttonClicked: function() {
      console.log('CANCELLED');
    }

  });
}
   }]
)
.controller("TopoutCtrl",['$scope', '$http', '$state', function($scope, $http, $state, $FavoriteService, $ionicActionSheet){
  $http.get('http://api.shopstyle.com/api/v2/products?pid=uid6016-33469504-95&fts=men+clothes&offset=0&limit=30')
    .success(function(data){
      $scope.products = data.products;
      $scope.whichproduct=$state.params.aId;
      //console.log($scope.products)
  })
  $scope.toggleThumbsup= function(item){
  item.thumbsup = !item.thumbsup;
  }
  //this is for the <i> like button on toppicks
  /*$scope.some_model = {
    title: 'Thing One',
    liked: false,
}*/
  // $scope.favorites = $FavoriteProduct.favorites;
  // $scope.addFavorite = function() {
  //    var currentProduct = $scope.whichproduct;
  //     if (!currentProduct.isFave)
  //        FavoriteProduct.addFave(currentProoduct,successCB,errorCB);
  //     else {
  //        currentProduct.isFave=false;
  //         FavoriteProduct.removeFave(currentProduct);
  //     }
  // }


$scope.$on('$ionicView.beforeEnter', function (event, viewData) {
  viewData.enableBack = true;
});
}]
)

.controller('Loading2Ctrl', function($http, $ionicLoading) {
  var _this = this

  $http.jsonp('').then(function(result) {
    _this.products = result.data.products
  })
})

.controller("MyoutfitCtrl", function($scope) {

    $scope.images = [];

    $scope.loadImages = function() {
        for(var i = 0; i < 10; i++) {
            $scope.images.push({id: i, src: "http://placehold.it/50x50"});
        }
    }
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
      viewData.enableBack = true;
    });
})

///////////////////////////

.controller('ImageController', function($scope, $cordovaDevice, $cordovaFile, $ionicPlatform, $ionicActionSheet, ImageService, FileService) {

  $ionicPlatform.ready(function() {
    $scope.images = FileService.images();
    $scope.$apply();
  });

  // $scope.urlForImage = function(imageName) {
  //   var trueOrigin = cordova.file.dataDirectory + imageName;
  //   return trueOrigin;
  // }

$scope.urlForImage = function(imageName) {
  var name = imageName.substr(imageName.lastIndexOf('/') + 1);
  var trueOrigin = cordova.file.dataDirectory + name;
  return trueOrigin;
}

  $scope.addMedia = function() {
    $scope.hideSheet = $ionicActionSheet.show({
      buttons: [
        { text: 'Take photo' },
        { text: 'Choose photo' }
      ],
      cancelText: 'Cancel',
      buttonClicked: function(index) {
        $scope.addImage(index);
      }
    });
  }

  //Called when button is clicked
  	$scope.showActionsheet = function() {
  	$scope.hideSheet = $ionicActionSheet.show({
        destructiveText: 'Delete',
        cancelText: 'Cancel',
        buttonClicked: function(index) {
          console.log('CANCELLED');
        }
  		});
  	}

  $scope.addImage = function(type) {
    $scope.hideSheet();
    ImageService.handleMediaDialog(type).then(function() {
      $scope.$apply();
    });
  }
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
  });
});
///////////////

////service//
