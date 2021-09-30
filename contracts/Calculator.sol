//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";


contract Calculator {
	// Declare result variable
	uint8 result;
	constructor() {
		// Initialize result to zero
		result = 0;
	}

	function getResult() public view returns(uint8) {
		// Get the result
		return result;
	} 

	function addNumbers(uint8 _firstNum, uint8 _secondNum) public {
			// Add the two values and assign them to result
			console.log("Adding: ", _firstNum, "& ", _secondNum);
			result = _firstNum + _secondNum;	
	}
	function multiplyNumbers(uint8 _firstNum, uint8 _secondNum) public {
			// Multiply the two values and assign them to result
			console.log("Multiplying: ", _firstNum, "& ", _secondNum);
			// any number multiplied by zero is zero, therefore result is zero here
			if(_firstNum == 0 || _secondNum == 0) {
				result = 0;
			} else {
				result = _firstNum * _secondNum;
			}
	}
	function divideNumbers(uint8 _firstNum, uint8 _secondNum) public {
			// Divide the two values and assign them to result
			console.log("Dividing: ", _firstNum, "& ", _secondNum);
			//any number divided by zero is infinity...I'm avoiding this
			if(_firstNum == 0 || _secondNum == 0) {
				result = 0;
			} else {
				result = _firstNum / _secondNum;
			}
	}
	function remainderOfNumbers(uint8 _firstNum, uint8 _secondNum) public {
			// Find the remainder of the two values and assign them to result
			console.log("Finding remainder of: ", _firstNum, "& ", _secondNum);
			result = _firstNum % _secondNum;
	}
}

