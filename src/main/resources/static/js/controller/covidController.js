covidApp.controller('covidController',
		['$scope','covidDetailsService','$filter',function($scope,covidDetailsService,$filter){
				
				$scope.covidData=[];
				$scope.home=true;
				$scope.country=false;
				$scope.searchByName="";
				$scope.byName=false;
				$scope.byCode=false;
				$scope.countries=[];
				$scope.countryByName=undefined;
				$scope.countryByCode=undefined;
				$scope.countryType=false;
				$scope.countryData={};
				$scope.data=[];
				$scope.viewComment=false;
				$scope.addCovidComments = {
					 comments: " ",
					word: /\s*\w*\s*$/
				}
				$scope.selectedValue='';
				$scope.method='';
				$scope.text='';
				$scope.comment='';
				$scope.myComment=[];
				$scope.enableLoader=true;
				
				$scope.loadCntryData = function(){
				$scope.enableLoader=true;
					covidDetailsService.fetchCountryCodeMap().then(function(data){
						if(data['error']){
							console.log(data['error']);
							$scope.countryData=data['response'];
						}else{
							console.log("country map data="+data);
							if(data && data.code && data.countries) {
								data.code.sort();
								data.countries.sort();
							}
							$scope.countryData=data;
						}
						$scope.enableLoader=false;
					},function(error){
						console.error("Error Occurred");
					});
				}
				
				$scope.fetchData = function(){
				$scope.enableLoader=true;
					covidDetailsService.fetchCountries().then(function(data){
					
						if(data['error']){
							console.error(data['error']);
							$scope.countries=data['response'];
						}else{
							$scope.countries=data;
							console.log("Countries Data"+$scope.countries);
						}
						$scope.countries =$filter('orderBy')($scope.countries,"-favourite");
						$scope.enableLoader=false;
					},function(error){
							console.error("Error Occurred");
					});
				}
				
				function success(data){
					console.log("Success");
				}
				
				$scope.getTotal= function(){
				$scope.enableLoader=true;
					covidDetailsService.getTotal().then(function(data){
						if(data['error']){
							console.error(data['error']);
							$scope.covidData=data['response']
						}else{
							$scope.covidData=data
							console.log("covid="+$scope.covidData);
						}
						$scope.enableLoader=false;
					},function(error){
						console.error("Error Occurred");
					});

				}
				
				$scope.loadCountryDetailsByName=function(name){
					console.log("country name="+name);
					$scope.home=false;
					$scope.country=false;
					$scope.byName=true;
					$scope.byCode=false;
					$scope.method='name';
					$scope.selectedValue=name;
					$scope.enableLoader=true;
					covidDetailsService.loadCountryDataByName(name).then(function(data){
						if(data['error']){
							console.error(data['error']);
							$scope.countryByName=data['response'];
						}else{
							$scope.countryByName=data;
							console.log("country By Name data="+$scope.countryByName);
						}
						$scope.enableLoader=false;
					
					}, function(err){
						console.error("Error Occurred");
					});
					
				}

				$scope.commentSection=false;
				$scope.loadCountryDetailsByCode=function(code){
					console.log("country code="+code);
					$scope.home=false;
					$scope.country=false;
					$scope.byName=false;
					$scope.byCode=true;
					$scope.method='code';
					$scope.selectedValue=code;
					$scope.enableLoader=true;
					covidDetailsService.loadCountryDataByCode(code).then(function(data){
					if(data['error']){
						console.error(data['error']);
						$scope.countryByCode=data['response'];
					}else{
						$scope.countryByCode=data;
						if($scope.countryByCode[0].comments.length>0){
							$scope.viewComment = true;
							$scope.commentSection = true;
						}
					}
					$scope.enableLoader=false;
					}, function(err){
						console.error("Error Occurred");
					});
					
				}
				
				$scope.enableNamePage=function(){
					$scope.home=false;
					$scope.countryType = true;
					$scope.country=false;
					$scope.data =angular.copy($scope.countryData["countries"]);
					$scope.method='name';
					$scope.text='Country Name';
					$scope.byName=false;
					$scope.byCode=false;
					$scope.commentSection=false;
					$scope.showAddComment=false;
					$scope.selectedValue='';
					$scope.viewComment=false;
					$scope.data =$filter('orderBy')($scope.data);
				}
				
				$scope.enableCodePage=function(){
					$scope.home=false;
					$scope.countryType = true;
					$scope.country=false;
					$scope.data = angular.copy($scope.countryData["code"]);
					$scope.method='code';
					$scope.text='Country Code';
					$scope.byCode=false;
					$scope.byName=false;
					$scope.commentSection=false;
					$scope.showAddComment=false;
					$scope.viewComment=false;
					$scope.selectedValue='';
					$scope.data = $filter('orderBy')($scope.data);
				}
				
				$scope.loadCovidDetailsByInput =  function(selectedValue){
					if($scope.method === 'code'){
						$scope.enableCodeHome(selectedValue);
					}
					
					if($scope.method === 'name'){
						$scope.enableNameHome(selectedValue);
					}
				}
				
				$scope.addComments =  function(){
					if($scope.addCovidComments.comments && $scope.addCovidComments.comments.trim().length !=0 ){
						if($scope.method === 'code'){
							$scope.addCommentsByCode($scope.selectedValue);
						}
						
						if($scope.method === 'name'){
							$scope.addCommentsByName($scope.selectedValue);
						}
					}else{
						alert("Comments cannot be blank");
					}
				}
				
				$scope.addCommentsByCode=function(value){
				$scope.enableLoader=true;
					covidDetailsService.addCommentByCode(value,$scope.addCovidComments.comments).then(function(data){
						if(data['error']){
							console.error(data['error']);
						}else{
							alert("Comments added");
						}
						$scope.addCovidComments.comments='';
						$scope.enableLoader=false;
					
					}, function(err){
						console.error("Error Occurred");
					});
				}
				
				$scope.addCommentsByName=function(value){
				$scope.enableLoader=true;
					covidDetailsService.addCommentByName(value,$scope.addCovidComments.comments).then(function(data){
					if(data['error']){
						console.error(data['error']);
					}else{
						alert("Updated Comment by Name");
					}
					$scope.enableLoader=false;
						$scope.addCovidComments.comments='';
					}, function(err){
						console.error("Error Occurred");
					});
				}
				
				
				
				
				$scope.enableHome = function(){
					$scope.home=true;
					$scope.country=false;
					$scope.byName=false;
					$scope.byCode=false;
					$scope.countryType = false;
					$scope.data = {};
					$scope.method='';
					$scope.text='';
					$scope.commentSection=false;
					$scope.addComment=false;
					$scope.viewComment=false;
				}
				
				$scope.enableCountriesHome = function(){
					$scope.home=false;
					$scope.country=true;
					$scope.byName=false;
					$scope.byCode=false;
					$scope.countryType = false;
					$scope.data = {};
					$scope.method='';
					$scope.text='';
					$scope.commentSection=false;
					$scope.addComment=false;
					$scope.viewComment=false;
					if($scope.countries.length==0){
						$scope.fetchData();
					}
					$scope.countries = $filter('orderBy')($scope.countries, '-favourite');
				}
				
				$scope.enableNameHome = function(name){
					$scope.home=false;
					$scope.country=false;
					$scope.byName=true;
					$scope.byCode=false;
					$scope.commentSection=false;
					$scope.selectedValue=name;
					if(!$scope.countryByName  || !$scope.countryByName[0] || $scope.countryByName[0]['country']!==name){
						$scope.loadCountryDetailsByName(name);
					}
				}
				
				$scope.enableCodeHome = function(code){
					$scope.home=false;
					$scope.country=false;
					$scope.byName=false;
					$scope.byCode=true;
					$scope.commentSection=false;
					$scope.selectedValue=code;
					if(!$scope.countryByCode || !$scope.countryByCode[0] || $scope.countryByCode.length==0 || $scope.countryByCode[0]['code']!==code){
						$scope.loadCountryDetailsByCode(code);
					}
					
				}
				
				
				$scope.setFavourite = function(country){
					country.favourite=!country.favourite;
					covidDetailsService.updateCountry(country).then(function(data){
					if(data['error']){
						console.error(data['error']);
					}else{
						alert("Country favourites updated with "+country.name);
					}
					$scope.countries = $filter('orderBy')($scope.countries, '-favourite');
					},
					function(error){
						console.error("Error Occurred");
					});
					
				}
				
				$scope.openCommentPage=function(){
					$scope.commentSection=true;
					$scope.viewComment=false;
					$scope.showAddComment=true;
				}
				
				$scope.viewCommentPage=function(){
					$scope.commentSection=true;
					$scope.showAddComment=false;
					$scope.viewComment=true;
					$scope.enableLoader=true;
					if($scope.method === 'code'){
						covidDetailsService.retrieveCommentByCode($scope.selectedValue).then(function(data){
						if(data['error']){
						console.error(data['error']);
						$scope.myComment=data['response'];
					}else{
							$scope.myComment=data;
							}
							$scope.enableLoader=false;
						},function(data){
						});
					}
					
					if($scope.method === 'name'){
					
						covidDetailsService.retrieveCommentByName($scope.selectedValue).then(function(data){
						if(data['error']){
						console.error(data['error']);
						$scope.myComment=data['response'];
					}else{
						$scope.myComment=data;
						}
						$scope.enableLoader=false;
						},function(data){
						});

					}
					
				
				}
				
				$scope.loadCntryData();
				

}]);
