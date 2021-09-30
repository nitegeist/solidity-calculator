const { expect } = require('chai');

describe('Addition', () => {
	it('Should find the sum of 2 numbers', async () => {
		const Calculator = await ethers.getContractFactory('Calculator');
		const calculator = await Calculator.deploy();
		await calculator.deployed();
		await calculator.addNumbers(2, 2);
		expect(await calculator.getResult()).to.equal(4);
	});
});

describe('Multiplication', () => {
	it('Should multiply 2 numbers', async () => {
		const Calculator = await ethers.getContractFactory('Calculator');
		const calculator = await Calculator.deploy();
		await calculator.deployed();
		await calculator.multiplyNumbers(2, 2);
		expect(await calculator.getResult()).to.equal(4);
		await calculator.multiplyNumbers(2, 0);
		expect(await calculator.getResult()).to.equal(0);
	});
});

describe('Division', () => {
	it('Should divide 2 numbers', async () => {
		const Calculator = await ethers.getContractFactory('Calculator');
		const calculator = await Calculator.deploy();
		await calculator.deployed();
		await calculator.divideNumbers(2, 2);
		expect(await calculator.getResult()).to.equal(1);
		await calculator.divideNumbers(2, 0);
		expect(await calculator.getResult()).to.equal(0);
	});
});

describe('Remainder', () => {
	it('Should find the remainder of 2 numbers', async () => {
		const Calculator = await ethers.getContractFactory('Calculator');
		const calculator = await Calculator.deploy();
		await calculator.deployed();
		await calculator.remainderOfNumbers(2, 2);
		expect(await calculator.getResult()).to.equal(0);
	});
});
