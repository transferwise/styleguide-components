(function(angular) {
	'use strict';

	angular
		.module('tw.layout-components')
		.service('TwCardsService', TwCardsService);

	function TwCardsService() {
		var expandedIndex = -1; // index of expanded card, -1 when all closed
		var cards = []; // boolean array of card controllers

		this.toggle = function(index) {
            if (expandedIndex !== -1  && expandedIndex !== index){
                cards[expandedIndex].enlarged = false;
                expandedIndex = -1;
            }
            if (cards[index].enlarged){
                cards[index].enlarged = false;
            } else {
                expandedIndex = index;
                cards[index].enlarged = true;
            }
        };

        this.addCard = function(scope) {
            cards.push(scope);
        };

        this.getExpandedIndex = function(){
            return expandedIndex;
        };

        this.updateExpandedIndex = function(newExpandedIndex){
        	expandedIndex = newExpandedIndex;
        };

        this.getCard = function(index){
        	return cards[index];
        };

        this.getLength = function(){
            return cards.length;
        };
	}
})(window.angular);