var app = angular.module('myApp',  ['ngRoute','ngScrollable','angularModalService'])

app.config(['$routeProvider','$locationProvider',function ($routeProvider,$locationProvider) {
//Module의 config API를 사용하면 서비스 제공자provider에 접근할 수 있다. 여기선 $route 서비스 제공자를 인자로 받아온다.
 $routeProvider
//$routeProvider의 when 메소드를 이용하면 특정 URL에 해당하는 라우트를 설정한다. 이때 라우트 설정객체를 전달하는데 <ng-view>태그에 삽입할 탬플릿에 해당하는 url을 설정객체의 templateUrl 속성으로 정의한다.
   .when('/main', {templateUrl: '/main'})
   .when('/test', {templateUrl: '/test'})
//라우트 설정객체에 controller 속성을 통하여 해당 화면에 연결되는 컨트롤러 이름을 설정할 수 있다.
   .otherwise({redirectTo: '/'});
//otherwise 메소드를 통하여 브라우저의 URL이 $routeProivder에서 정의되지 않은 URL일 경우에 해당하는 설정을 할 수 있다. 여기선 ‘/home’으로 이동시키고 있다.
 }])

 app.controller('insertCtl',['$scope', '$window', 'socket','ModalService','$filter', function($scope, $window,socket,ModalService,$filter) {

   $scope.insert_customer = function() {
       socket.emit('insert_customer',{"values": '"'+$scope.name +'",'+$scope.age+',"'+$scope.tel+'","'+$scope.sex+'","'+$scope.address+'","'+$scope.email+'"'});
       console.log('okokok')
   }

   $scope.insert_object = function() {
       socket.emit('insert_object',{"values": '"'+$scope.kind +'","'+$scope.name+'",'+$scope.dist+',"'+$scope.number+'"'});
       console.log('okokok');
   }

   $scope.insert_service = function() {

       socket.emit('insert_service',{"values": $scope.number +',"'+$scope.etc+'","'+$scope.start_day+'","'+$scope.end_day+'",'+$scope.state});
       console.log('okokok');
   }

   $scope.select_object_list = function() {
       socket.emit('select_object_list');
   }

   socket.on('object_list', function (data) {
     $scope.showAModal(data);
   });

   $scope.showAModal = function(list) {
   // Just provide a template url, a controller and call 'showModal'.
   ModalService.showModal({
     templateUrl: "/modal.html",
     controller: "YesNoController",
     inputs: {
        title: "리스트",
        data: list
      }
   }).then(function(modal) {
     // The modal object has the element built, if this is a bootstrap modal
     // you can call 'modal' to show it, if it's a custom modal just show or hide
     // it as you need to.
     modal.element.modal();
     modal.close.then(function(result) {
       $scope.number = result.number;
        $scope.name = result.name;
        $scope.dist = result.dist;
        $scope.c_name = result.c_name;
         });
       });
      };

      $scope.customerid_temp = null;
      $scope.select_object_list2 = function(id) {
          socket.emit('select_object_list2');
          $scope.customerid_temp = id;
      }

      socket.on('object_list2', function (data) {
        $scope.showAModal2(data);
      });

      $scope.showAModal2 = function(list) {
      // Just provide a template url, a controller and call 'showModal'.
      ModalService.showModal({
        templateUrl: "/modal.html",
        controller: "YesNoController",
        inputs: {
           title: "리스트",
           data: list
         }
      }).then(function(modal) {
        // The modal object has the element built, if this is a bootstrap modal
        // you can call 'modal' to show it, if it's a custom modal just show or hide
        // it as you need to.
        modal.element.modal();
        modal.close.then(function(result) {
              socket.emit('link_customer_object',{"values": $scope.customerid_temp +','+result.idobject});
            });
          });
         };



 }]
 )

 app.controller('listCtl',['$scope', '$window', 'socket','ModalService','$filter', function($scope, $window,socket,ModalService,$filter) {

 }]
 )


  app.controller('selectCtl',['$scope', '$window', 'socket','ModalService','$filter', function($scope, $window,socket,ModalService,$filter) {

        $scope.list_customer_object = function(id) {
            socket.emit('list_customer_object',{"customer_id" : id });
        }
        socket.on("list_object_customer", function (data) {
            $scope.showAModal(data);
        });


        $scope.showAModal = function(list) {
        ModalService.showModal({
          templateUrl: "/modal.html",
          controller: "YesNoController",
          inputs: {
             title: "리스트",
             data: list
           }
        }).then(function(modal) {
          modal.element.modal();
          modal.close.then(function(result) {

              });
            });
           };

  }]
  )

  app.controller('YesNoController', ['$scope', 'close','title','data', function($scope, close,title,data) {

    $scope.title = title;
    $scope.data = data;
  $scope.close = function(result) {
 	  close(result, 500); // close, but give 500ms for bootstrap to animate
  };

  $scope.choice = function(result) {
    close(
      $scope.data[result]
    , 500); // close, but give 500ms for bootstrap to animate
  };

}]);


  app.factory('socket', function ($rootScope) {
    var socket = io.connect('http://localhost/');
    return {
      on: function (eventName, callback) {
        socket.on(eventName, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            callback.apply(socket, args);
          });
        });
      },
      emit: function (eventName, data, callback) {
        socket.emit(eventName, data, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            if (callback) {
              callback.apply(socket, args);
            }
          });
        })
      }
    };
  })
    app.directive('myEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown", function (event) {
                if(event.which === 13) {
                    scope.$apply(function (){
                        scope.$eval(attrs.myEnter);
                    });

                    event.preventDefault();
                }
            });
        };
    })
