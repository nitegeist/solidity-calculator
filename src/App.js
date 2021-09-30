import { ethers } from 'ethers';
import { useState } from 'react';
import { Divide, Percent, Plus, X } from 'react-feather';
import './App.css';
import Calculator from './artifacts/contracts/Calculator.sol/Calculator.json';

const calculatorAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const operation = ['Add', 'Multiply', 'Divide', 'Mod'];

function App() {
	let [firstNum, setFirstNum] = useState('');
	let [secondNum, setSecondNum] = useState('');
	let [finalResult, setFinalResult] = useState('');

	const requestAccount = async () => {
		await window.ethereum.request({ method: 'eth_requestAccounts' });
	};

	const fetchResult = async () => {
		if (typeof window.ethereum !== 'undefined') {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			console.log({ provider });
			const contract = new ethers.Contract(
				calculatorAddress,
				Calculator.abi,
				provider
			);
			try {
				const result = await contract.getResult();
				console.log(result);
				setFinalResult(result);
			} catch (err) {
				console.log(err);
			}
		}
	};

	const calculateResults = async (operation, firstNum, secondNum) => {
		//if there are no inputs, do nothing.
		if (!firstNum && !secondNum) return;
		if (typeof window.ethereum !== 'undefined') {
			await requestAccount();
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const contract = new ethers.Contract(
				calculatorAddress,
				Calculator.abi,
				signer
			);
			// !TODO: Refactor this monster of a switch statement 😂
			let transaction;
			switch (operation) {
				case 'Add':
					transaction = await contract.addNumbers(firstNum, secondNum);
					break;
				case 'Multiply':
					transaction = await contract.multiplyNumbers(firstNum, secondNum);
					break;
				case 'Divide':
					transaction = await contract.divideNumbers(firstNum, secondNum);
					break;
				case 'Mod':
					transaction = await contract.remainderOfNumbers(firstNum, secondNum);
					break;
				default:
					break;
			}
			await transaction.wait();
			fetchResult();
		}
	};

	const handleClick = async (operation) => {
		if (!firstNum && !secondNum) return;
		try {
			await calculateResults(operation, firstNum, secondNum)
				.then((res) => {
					setFirstNum('');
					setSecondNum('');
					setTimeout(() => {
						setFinalResult('');
					}, 5000);
				})
				.catch((err) => console.log);
		} catch (err) {
			console.error(err);
		}
	};

	// const handleReset = () => {
	// 	setFirstNum('');
	// 	setSecondNum('');
	// 	setFinalResult('');
	// };

	return (
		<div className='calculator-bg'>
			<div className='container'>
				<div className='card'>
					<h1 className='calc-title'>Smart Calculator</h1>
					<form className='calc-form'>
						<div className='form-group'>
							<input
								type='number'
								value={firstNum}
								placeholder='Insert a number'
								onChange={(e) => setFirstNum(e.target.value)}
							/>
						</div>
						<div className='form-group'>
							<input
								type='number'
								value={secondNum}
								placeholder='Insert another number'
								onChange={(e) => setSecondNum(e.target.value)}
							/>
						</div>

						<div className='btn-group'>
							<button
								className='calc-btn'
								type='button'
								onClick={(e) => handleClick('Add')}>
								<Plus color='#f0f0f0' size={24} />
							</button>
							<button
								className='calc-btn'
								type='button'
								onClick={(e) => handleClick('Multiply')}>
								<X color='#f0f0f0' size={24} />
							</button>
							<button
								className='calc-btn'
								type='button'
								onClick={(e) => handleClick('Divide')}>
								<Divide color='#f0f0f0' size={24} />
							</button>
							<button
								className='calc-btn'
								type='button'
								onClick={(e) => handleClick('Mod')}>
								<Percent color='#f0f0f0' size={24} />
							</button>
							{/* <button
								className='calc-btn'
								type='button'
								onClick={(e) => handleReset()}>
								<RefreshCcw color='#f0f0f0' size={24} />
							</button> */}
						</div>
					</form>
					{finalResult ? (
						<h2 className='result'>
							Result ➡️ <span className='result-actual'>{finalResult} 😀</span>
						</h2>
					) : null}
				</div>
			</div>
		</div>
	);
}

export default App;
