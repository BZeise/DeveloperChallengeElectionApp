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
				ctrl.candidates.push(candidate);
			};

			ctrl.onCandidateDelete = function(candidate) {
				var index = ctrl.candidates.indexOf(candidate);
				ctrl.candidates.splice(index, 1);
			};

			ctrl.onVote = function(candidate) {
				var index = ctrl.candidates.indexOf(candidate);
				ctrl.candidates[index].votes += 1;
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
                onCreate: "&",
                onDelete: "&",
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
                };

            ctrl.newCandidate = null;

            //TODO Add code to add a new candidate

            //TODO Add code to remove a candidate

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