/**
 * Created by Chandu on 2/22/16.
 */

myApp.controller('myController', function($scope, $http, searchFactory){
    $scope.bookdata = {};
    $scope.searchText = '';
    var DepartmentArray = ['Select Department','Appliances', 'Books', 'Electronics', 'Movies', 'VideoGames'];

    var dropdown = document.getElementById("search_category");

    for (var i =0; i < DepartmentArray.length; i++){
        //console.log(dropdown.length);
       // dropdown[dropdown.length] = new Option(DepartmentArray[i],DepartmentArray[i]);
        dropdown[i] = new Option(DepartmentArray[i],DepartmentArray[i]);
    }

    $scope.goSearch = function(){
        var getCatID = document.getElementById("search_category"); //'Books'
        var getValue = getCatID.options[getCatID.selectedIndex].value;

        if(getValue == 'Select Department'){
            alert("select a department");
        }
        else if ($scope.searchText.length == 0){
            alert("Please enter a proper search term");
        }
        else{

            var searchdata = {
                search_param:$scope.searchText,
                search_category:getValue
            };
            var config = {
                params: searchdata
            };

            searchFactory.get('/searchProduct', config).then(function(results){

                //     console.log(req.data);
                $scope.records = results.data.Items.TotalPages;
                $scope.bookdata = results.data.Items.Item;
                //     console.log($scope.bookdata);

                $scope.bookdata.forEach(function(e){
                    var author = e.ItemAttributes.Author;
                    //console.log(author);
                    if(Array.isArray(author) ){
                        //console.log(author);
                        e.ItemAttributes.Author = author.reduce(function(pre,cur){
                            return pre + ' and ' +cur;
                        })
                        //console.log(author);
                    }
                });

            });
        }
    }
});

myApp.factory('searchFactory', function($http){
    return {
        get: function (url, config) {
            //    console.log(config);
            return $http.get(url, config).success(function(data){
                //        console.log(data);
            })
        }
    }
})

