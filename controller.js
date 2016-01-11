angular.module("TestAngularJS",["LocalStorageModule"])
  .controller("ListaDeLibros",function($scope,$http){
    $scope.posts = [];
    $scope.newPost = {};
    $http.get("http://jsonplaceholder.typicode.com/posts")
    .success(function(data){
      console.log(data);
      $scope.posts=data;
    })
    .error(function(error){

    });
    $scope.addPost = function(){
    $http.post("http://jsonplaceholder.typicode.com/posts",{
      title: $scope.newPost.title,
      body: $scope.newPost.body,
      userId: 1
    })
    .success(function(data,status,headers,config){
      console.log(data);
      $scope.posts.push(data);
      $scope.newPost = {};
    })
    .error(function(error,status,headers,config){
      console.log(error);
    });
    }
  })
.factory("ToDoService",function(localStorageService){
    var toDoService = {};
    toDoService.key="angular-todolist";
      if(localStorageService.get(toDoService.key)){
          toDoService.activities = localStorageService.get(toDoService.key);
      }else{
        $toDoService.activities = [];
      }

    toDoService.add = function(newActiv){
      toDoService.activities.push(newActiv);
      toDoService.updateLocalStorage();
    };
    toDoService.updateLocalStorage = function(){
      localStorageService.set(toDoService.key,toDoService.activities);
    };
    toDoService.clean = function(){
      toDoService.activities = [];
      toDoService.updateLocalStorage();
      return toDoService.getAll;
    };
    toDoService.getAll = function(){
      return toDoService.activities;
    };
    toDoService.removeItem = function(item){
      toDoService.activities = toDoService.activities.filter(function(activity){
        return activity !== item;
      });
      toDoService.updateLocalStorage();
      return toDoService.getAll();
    };


  return toDoService;
})

  .controller("ToDoController",function($scope,ToDoService){

    /*
      {
        descripcion: 'hacer la tarea',
        fecha: '10-01-16 20:32hs'
      }
    */
    $scope.toDo = ToDoService.getAll();
    $scope.newActiv = {};

    $scope.addActiv = function(){
      ToDoService.add($scope.newActiv);
      $scope.newActiv={};
    }

    $scope.removeActiv = function(item){
      $scope.toDo = ToDoService.removeItem(item);
    }

    $scope.clean = function(){
      $scope.toDo = ToDoService.clean();
    }
  });
