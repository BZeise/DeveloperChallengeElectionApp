(function () {
    "use strict";

    angular.module("Election.App", [
        "Election.Component"
    ]);

})();

//Election Component
(function () {
    "use strict";

    angular.module("Election.Component", [
            "Election.Candidate.Component",
            "Election.Results.Component",
            "Election.Vote.Component"
        ])
        .component("tfElection", {
            templateUrl: "App/Election.Component.Template.html",
            controller: ElectionController,
            bindings: { }
        });

		ElectionController.$inject = [ "$timeout" ];

		function ElectionController($timeout){
			var ctrl = this;

			ctrl.candidates = [];

			ctrl.onCandidateCreate = function(candidate) {
        console.log('you did it');
        console.log('creating candidate:', candidate);
				ctrl.candidates.push(candidate);
			};

			ctrl.onCandidateDelete = function(candidate) {
				var index = ctrl.candidates.indexOf(candidate);
				ctrl.candidates.splice(index, 1);
			};

			ctrl.onVote = function(candidate) {
				var index = ctrl.candidates.indexOf(candidate);
				ctrl.candidates[index].votes += 1;
        // console.log('vote cast for', candidate);
			};

			ctrl.$onInit = function() {

				// Example Initial Data Request
				// Mimic 1 seconds ajax call
				$timeout(function(){
					ctrl.candidates = [
						{ name: "Puppies", color: "blue", votes: 65 },
						{ name: "Kittens", color: "red", votes: 62 },
						{ name: "Pandas", color: "green", votes: 5 }
					];
				}, 1000);

			};
		}

})();

//Candidate Component
(function (angular) {
    "use strict";

    angular.module("Election.Candidate.Component", [])
        .component("tfElectionCandidate", {
            templateUrl: "App/Election.Candidate.Component.Template.html",
            controller: CandidateController,
            bindings: {
                // onCreate: "&",
                // onDelete: "&",
                // #3:  Adding in binding to access onCandidateCreate
                // onCandidateCreate: "&",
                // okay, this didn't end up working as intended
                // want to clarify this with Joe
                candidates: "<"
            }
        });

		CandidateController.$inject = [];

		function CandidateController(){
			var ctrl = this,
                buildNewCandidate = function() {
                    return {
                        votes: 0,
                        name: "",
                        color: null
                    };
                // },
                // onCreate = function() {
                //   ctrl.onCandidateCreate( candidateToAdd );
                // #3:  another attempt to access ctrl.onCandidateCreate
                };

            ctrl.newCandidate = null;

            //TODO Add code to add a new candidate
            ctrl.addCandidate = function (candidate) {
              var candidateToAdd = buildNewCandidate();
              candidateToAdd.name = candidate.name;
              console.log('candidateToAdd is:', candidateToAdd);
              // #3:  Using onCandidateCreate defined above in ElectionController
              // ctrl.onCandidateCreate( candidateToAdd );
              // ctrl.onCandidateCreate( { $candidate: candidate } );
              // okay, neither of these worked, and I'm really curious as to why

              // #3:  Ended up using the code FROM onCandidateCreate, without calling it
              ctrl.candidates.push(candidateToAdd);
              candidate.name = '';
              // this implementation allows duplicate submissions
            };

          //   ctrl.addCandidate = function (candidate) {
          //    ctrl.newCandidate = candidate;
          //    ctrl.candidates.push(ctrl.newCandidate);
          //  };
          //  this implementation does NOT allow duplicates


            //TODO Add code to remove a candidate
            ctrl.deleteCandidate = function (candidate) {
      				var index = ctrl.candidates.indexOf(candidate);
      				ctrl.candidates.splice(index, 1);
            };


            // $onInit is called once at component initialization
            ctrl.$onInit = function () {
                ctrl.newCandidate = buildNewCandidate();
            };
		}

})(window.angular);

//Restult Component
(function () {
    "use strict";

    angular.module("Election.Results.Component", [])
        .component("tfElectionResults", {
            templateUrl: "App/Election.Results.Component.Template.html",
            controller: ResultsController,
            bindings: {
                candidates: "<"
            }
        });

		ResultsController.$inject = [];

		function ResultsController(){
			var ctrl = this;

            ctrl.getCandidatePercentage = function (votes) {
                var total = _.sumBy(ctrl.candidates, "votes");
                if (total) {
                    return 100 * votes / total;
                }
                return 0;
            };
		}

})();

//Vote Component
(function () {
    "use strict";

    angular.module("Election.Vote.Component", [])
        .component("tfElectionVote", {
            templateUrl: "App/Election.Vote.Component.Template.html",
            controller: VoteController,
            bindings: {
                candidates: "<",
                onVote: "&"
            }
        });

		VoteController.$inject = [];

		function VoteController(){
			var ctrl = this;

            ctrl.castVote = function (candidate) {
                ctrl.onVote({ $candidate: candidate });
            };
		}

})();
