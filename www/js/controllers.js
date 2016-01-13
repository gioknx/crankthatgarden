angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $ionicPopup, $state) {
	var projects = [{name: "Giovani", 
				age: 18},
				{name: "Delisson", 
				age: 98}];
	projects[0].tasks = [{name: "dip bow", duration : "5hs"}, {name: "do bar", duration : "17hs"}];
	projects[1].tasks = [{name: "get foo", duration : "18hs"}, {name: "do nails", duration : "2hs"}];

	

	$scope.projects =  projects;

	console.log(projects[0].tasks.length)

	 // A confirm dialog
	 $scope.showConfirmFinish = function() {
	 	console.log("confirmou");
	   var confirmPopup = $ionicPopup.confirm({
	     title: 'Confirmar conclusão da tarefa',
	     template: 'Você tem certeza que deseja concluir esta tarefa?'
	   });

	   confirmPopup.then(function(res) {
	     if(res) {
	       //enviar conclusao tarefa para api
	     } else {
	       //Não faz nada.
	     }
	   });
	 };

	 $scope.showConfirmFinishProject = function() {
	 	console.log("confirmou");
	   var confirmPopup = $ionicPopup.confirm({
	     title: 'Confirmar conclusão do projeto',
	     template: 'Você tem certeza que deseja concluir este projeto?'
	   });

	   confirmPopup.then(function(res) {
	     if(res) {
	       //enviar conclusao tarefa para api
	     } else {
	       //Não faz nada.
	     }
	   });
	 };

	 $scope.showConfirmDelete = function() {
	   var confirmPopup = $ionicPopup.confirm({
	     title: 'Confirmar deleção da tarefa',
	     template: 'Você tem certeza que deseja excluir esta tarefa?'
	   });

	   confirmPopup.then(function(res) {
	     if(res) {
	       //enviar deleção tarefa para api
	     } else {
	       //Não faz nada.
	     }
	   });
	 };


	$scope.createEntry = function() {
    	$state.go("tab.create-entry");
	};
})

.controller('InviteCtrl', function($scope) {
	$scope.submitInvitation = function(emails){
		//Array with the particular emails
		var emails = emails.split(",");
		emails.forEach(function(item){
			console.log("O email é " + item);
		});
		//sendapi emails
	};

})

.controller('CreateEntryCtrl', function($scope, $state) {
	$scope.projects = [{name: "Giovani", 
				age: 18},
				{name: "Delisson", 
				age: 98}];

	$scope.submitEntry = function(){
		//send daa $scope.projects e $scope.selected_project
	};

	$scope.cancelCreateEntry = function(){
		$state.go("tab.dash");
	}
})


.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state, $http) {
	$scope.data = {};

	$scope.login = function() {
		LoginService.loginUser($scope.data.company_name, $scope.data.company_website, $scope.data.username, $scope.data.password).success(function(data) {
			$state.go('tab.dash');
		}).error(function(data) {
			$state.go('tab.dash');

			/*var alertPopup = $ionicPopup.alert({
				title: 'Login failed!',
				template: 'Please check your credentials!'
			});*/
		});
	}

	$scope.register = function(){
		$state.go("register");
	}

	$scope.forgotPassword = function(){
		var FormData = {
			"user": $scope.data.username
		}
		$http({
			method: 'POST',
			url: 'http://ionicframework.com/docs/components/',
			data: FormData,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
		.then(function(response){
			var alertPopup = $ionicPopup.alert({
				title: 'Success',
				template: 'Your password will be sent to your e-mail'
			});
		}, function(response){
			var alertPopup = $ionicPopup.alert({
				title: 'Failure',
				template: 'Something wrong happened! Either you typed the wrong username or the server is busy. Try again later.'
			});
		});
	}
})

.controller('RegisterCtrl', function($scope, RegisterService, $ionicPopup, $state) {
	$scope.data = {};
	
	$scope.register = function() {
		var message, title;
		RegisterService.registerUser($scope.data.username, $scope.data.password, $scope.data.passwordConfirmation, $scope.data.email, $scope.data.phone, function(response){
			switch(response.status) {
				case 201:
				message = "Registration successful";
				title = "Success";
				break;
				case 400:
				message = "Error";
				title = "Error";
				break;
				case 0:
				message = "Could not connect to the server. Make sure your internet connection is on and try again later.";
				title = "Connection Error";
				break;
				default:
				message = "Error default";
				title = "Error";
			}

			var alertPopup = $ionicPopup.alert({
				title: title,
				template: message
			});
		});

		
	}
})

.controller('AccountCtrl', function($scope) {
	$scope.settings = {
		enableFriends: true
	};
});
