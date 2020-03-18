angular.module('starter.controllers', [])

.controller('Styleform_1Ctrl', function($scope) {
	$scope.active_content = 'tops';
	$scope.setActiveContent = function(active_content){
	$scope.active_content = active_content;
	}
})
.controller('SlideController', function($scope) {

  $scope.myActiveSlide = 0;

})
.controller("Listcontroller",['$scope', '$http', function($scope, $http){
  $http.get('js/products2.json').success(function(data){
    //console.log(data);
    $scope.products2 = data;

  })
}])

/*$scope.doRefresh = function(item){
  $http.get('js/products2.json').sucess(function(data)
  {
  $scope.products = data;
  $scope.$broadcast('scroll.refreshComplete');
});
}*/
.controller('IonicLogin', function($scope, IonicLogin, $ionicLoading, $cordovaOauth, $http) {

  // REMOVE THE USER LOGIN INFORMATION WHEN RETURNING TO LOGIN SCREEN
  $scope.$on('$ionicView.enter', function(e) {
      $scope.data = {} ;
  });

  // LOGOUT FUNCTION
  $scope.logout = function(){
       IonicLogin.logout();
  }

  // LOGIN FUNCTION
  $scope.login = function(){
       IonicLogin.login($scope.data.email, $scope.data.password);
  }

   // SIGNUP FUNCTION
   $scope.signUp = function(){
      IonicLogin.signUp($scope.data.email, $scope.data.password);
  }

  // FACEBOOK LOGIN
  $scope.facebookLogin = function() {

       var appID = "928219620607005"; // PUT YOUR FACEBOOK APP ID HERE
       var redirectURL = "http://localhost/callback" ; // PUT YOUR APP CALLBACK URL HERE

       $cordovaOauth.facebook(appID, ["email"], {redirect_uri: redirectURL})
            .then(function(result){
                var access_token = result.access_token;

               $http.get("https://graph.facebook.com/v2.2/me",
                    { params: {access_token: access_token, fields: "name, email", format: "json" }})
                        .then(function(user) {
                        //     alert(JSON.stringify(user));
                             IonicLogin.socialLogin( user.data.email, user.data.id); // USING ID TO GENERATE A HASH PASSWORD
                    })
        },
          function(error){
                console.log("Facebook Login Error: " + error);
        });
    }

    // TWITTER LOGIN
    $scope.twitterLogin = function(){

          // YOUR TWITTER CALLBACK WILL HAVE TO BE HTTP://LOCALHOST/CALLBACK FOR TESTING BUT
          // IT NEEDS TO BE SET VIA TINYURL.COM
           var consumerKey = "fMNg8ecQmeOTHNFGgJKsGwYbw"; // PUT YOUR CONSUMER KEY HERE
           var consumerSecretKey = "cPOHMNSrDXLb1dXrVQP0e3CaeSlVGONzYgGq92gpPh38q9g51Q"; // PUT YOUR SECRET KEY HERE
           var oathToken = ""
           var oathSecret = "" ;

          $cordovaOauth.twitter( consumerKey,  consumerSecretKey)
              .then(function(result){
               // alert(JSON.stringify(user));
                oathToken = result.oauth_token ;
                oathSecret = result.oauth_token_secret ;

                // IF YOU WANT TO GET TWITTER USERS EMAIL ADDRESS YOU WILL HAVE TO WHITELIST YOUR APP WITH TWITTER
                // THEY DO NOT ALLOW IT BY DEFAULT
                // https://dev.twitter.com/rest/reference/get/account/verify_credentials
              IonicLogin.socialLogin( result.screen_name, result.user_id ); // USING ID TO GENERATE A HASH PASSWORD
        });
    }

    // GOOGLE PLUS LOGIN
    $scope.googleLogin = function(){

          // CREATE A PROJECT ON GOOGLE DEVELOPER CONSOLE AND PUT YOUR CLIENT ID HERE
          // GOOGLE OAUTH DOES NOT GIVE US EMAIL RIGHT AWAY SO WE HAVE TO MAKE 2 API CALLS
          $cordovaOauth.google("584540832467-tv8i4a8utt7tk5aih3ej8a6gc65sjk87.apps.googleusercontent.com", ["email"], {redirect_uri: "http://localhost/callback"}).then(function(result) {
                  //   alert("Response Object -> " + JSON.stringify(result));

                  $http.get("https://www.googleapis.com/plus/v1/people/me", // TO GET THE USER'S EMAIL
                     { params: {access_token: result.access_token,
                              key: "584540832467-tv8i4a8utt7tk5aih3ej8a6gc65sjk87.apps.googleusercontent.com"}})
                        .then(function(user) {
                     //      alert(JSON.stringify(user));
                             IonicLogin.socialLogin( user.data.emails[0].value, result.access_token); // USING ID TO GENERATE A HASH PASSWORD
                        });
            });
     }

    // INSTAGRAM LOGIN
    $scope.instagramLogin = function(){

        var clientID = "a0c936f91d4d4219b3230fb96650216d" ; // PUT YOUR CLIENT ID HERE
        var redirectURL = "http://tinyurl.com/krmpchb" // PUT YOUR REDIRECT URL HERE

        $cordovaOauth.instagram(clientID, ["basic"], {redirect_uri: redirectURL})
          .then(function(result){
                  // INSTAGRAM OAUTH DOES NOT GIVE US USERNAME SO WE HAVE TO MAKE 2 API CALLS
                  $http.get("https://api.instagram.com/v1/users/self/", // TO GET THE USERSNAME
                     { params: {access_token: result.access_token }})
                        .then(function(user) {
                     //     alert(JSON.stringify(user));
                            IonicLogin.socialLogin( user.data.data.username, result.access_token); // USING ID TO GENERATE A HASH PASSWORD
                        });
          });
    }
})
;
