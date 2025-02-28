var app = angular.module('student', []);
var studentId = window.location.href;

app.controller('ViewCtrl', function($scope, $http) {
	$scope.$on("loadStudents", function(){
		$scope.loadStudents();
	});
	
	$scope.loadStudents = function(){
		$http.get('/student').success(function(data){
			$scope.students = data;
		});
	};
	
	$scope.createStudent = function(){
		window.location.href = '/student/0';
	};
	
	$scope.openStudent = function(student){
		window.location.href = '/student/' + student.studentId;
	};
	
	$scope.deleteStudent = function(subject){
		bootbox.confirm('Are you sure you want to delete <span style=\"font-style:italic\">' + student.studentName + '</span>', function(result) {
			if(result == true) {
				$http.delete('/student/' + student.studentId).success(function() {
					$scope.$emit('loadStudents');
				});
			} else {
				return;
			}
		});
	};
	
	$scope.loadStudents();
});

app.controller('EditCtrl', function($scope, $http) {
	var param = studentId.split('/')[4]
	
	$scope.$on("loadStudent", function(){
		$scope.loadStudent();
	});
	
	$scope.getBack = function(){
		window.location.href = '/student';
	};
	
	$scope.loadStudent = function(){
		$http.get('/student/' + param).success(function(data){
			$scope.student = data;
		});
	};
	
	$scope.$on('loadBatchs', function(){
		$scope.loadBatchs();
	});
	
	$scope.loadBatchs = function(){
		$http.get('/batch').success(function(data){
			$scope.batchs = data;
		});
	};
	
	$scope.$on('loadCourses', function(){
		$scope.loadCourses();
	});
	
	$scope.loadCourses = function(){
		$http.get('/course').success(function(data){
			$scope.courses = data;
		});
	};
	
	$scope.saveStudent = function(){
		//console.log($('#studentPhoto').val() + ' - ' + $('#dateOfBirth').val() + ' - ' + $('#dateOfJoining').val())
		$scope.studentVal = [];
		$scope.studentVal.push({
			studentId: $scope.student.studentId,
			studentName: $scope.student.studentName,
			studentPhoto: $('#studentPhoto').val(),
			dateOfBirth: $('#dateOfBirth').val(),
			dateOfJoining: $('#dateOfJoining').val(),
			batch: $scope.student.batch,
			course: $scope.student.course
		});
		$http.post('/student', $scope.studentVal).success(function(){
			$scope.$emit('loadStudents');
			$('#studentmodal').hide();
		});
	};
	
	$scope.loadStudent();
	$scope.loadBatchs();
	$scope.loadCourses();
});

function stringIt(val) {
    return JSON.stringify(val);
};

