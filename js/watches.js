var app = angular.module('App', ['ngResource', 'infinite-scroll', 'angularSpinner', 'jcs-autoValidate', 'angular-ladda']);

// config before controller gets called
app.config(function ($httpProvider, $resourceProvider, laddaProvider) {
  $httpProvider.defaults.headers.common['Authorization'] = 'Token f482a2134feaa786d5b3790521a75164e11e5964';
  $resourceProvider.defaults.stripTrailingSlashes = false;
  laddaProvider.setOption({
    style: 'expand-right'
  })
});

app.factory("Contact", function ($resource) {
  return $resource("https://codecraftpro.com/api/samples/v1/contact/:id/");
});

app.controller('PersonDetailController', function ($scope, ContactService) {
	$scope.contacts = ContactService
  $scope.save = function () {
    $scope.contacts.updateContact($scope.contacts.selectedPerson)
  }
});

app.controller('PersonListController', function ($scope, ContactService) {

	$scope.search = "";
	$scope.order = "email";
	$scope.contacts = ContactService;

  $scope.loadMore = function () {
    console.log("Load more");
    $scope.contacts.loadMore();
  }

  $scope.$watch('search', function (newVal, oldVal) {
    console.log(newVal);
    // whether the variable is define
    if (angular.isDefined(newVal)) {
      $scope.contacts.doSearch(newVal);
    }
  })

  $scope.$watch('order', function (newVal, oldVal) {
    console.log(newVal);
    // whether the variable is define
    if (angular.isDefined(newVal)) {
      $scope.contacts.doOrder(newVal);
    }
  })
});

// add 'Contacts' resource api to service
app.service('ContactService', function (Contact) {

	var self = {
		'addPerson': function (person) {
			this.persons.push(person);
		},
    'page': 1,
    'hasMore': true,
    'isLoading': false,
		'selectedPerson': null,
		'persons': [],
    'search': null,
    'doSearch': function (search) {
      // reset the search
      self.hasMore = true;
      self.page = 1;
      self.persons = [];
      self.search = search;
      self.loadContacts();
    },
    'doOrder': function (order) {
      // reset the search
      self.hasMore = true;
      self.page = 1;
      self.persons = [];
      self.ordering = order;
      self.loadContacts();
    },
    'loadContacts': function () {
      if (self.hasMore && !self.isloading) {
        self.isLoading = true;

        var params = {
          'page': self.page,
          'search': self.search,
          'ordering': self.ordering
        }

        Contact.get(params, function (data) {
          console.log(data);
          angular.forEach(data.results, function (person) {
            self.persons.push(new Contact(person));
          })
          if (!data.next) {
            self.hasMore = false;
          }
          self.isLoading = false;
        })
      }
    },
    'loadMore': function () {
      if (self.hasMore && !self.isLoading) {
        self.page += 1;
        self.loadContacts();
      }
    },
    'updateContact': function (person) {
      console.log("Service call update");
    }


	};

  self.loadContacts();

  return self
});
