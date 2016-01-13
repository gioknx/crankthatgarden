angular.module('starter.services', [])

.service('LoginService', function($q, $http) {
  return {
    loginUser: function(name, pw) {
      var deferred = $q.defer();
      var promise = deferred.promise;

      var FormData = {
        "user": name,
        "pw": pw
      }
      $http({
        method: 'POST',
        url: 'http://ionicframework.com/docs/components/',
        data: FormData,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      .then(function(response){
        deferred.resolve();

      }, function(response){
        deferred.reject();

      });

      promise.success = function(fn) {
        promise.then(fn);
        return promise;
      }
      promise.error = function(fn) {
        promise.then(null, fn);
        return promise;
      }
      return promise;
    }
  }
})

.service('RegisterService', function($http) {
  return {
    registerUser: function(company_name, company_website, name, pw, pw2, email, phone, callBack) {

      var FormData = {
        "company_name": company_name,
        "company_website": company_website,
        "user": name,
        "pw": pw,
        "pw2": pw2,
        "email": email,
        "phone": phone
      }
      $http({
        method: 'POST',
        url: 'http://ionicframework.com/docs/components/',
        data: FormData,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      .then(function(response){
        callBack(response);

      }, function(response){
        callBack(response);
      });
    }
  }
})

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
}

);
