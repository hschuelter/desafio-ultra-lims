import { useState } from 'react'
import './App.css'

import SearchField from './components/SearchField';
import GetFromServer from './components/GetFromServer'

export function makeAPICall() {
	return fetch('http://localhost:3001/get');
}

function App() {

	return (
		<>
			<div className='header'> Ultra LIMS Challenge</div>
			<div className='content'>
				<div className='column search-area'>
					<SearchField />
				</div>
				<div className='column server-area'>
					<GetFromServer />
				</div>
			</div>
			<div className='footer'>Arthur Schuelter @ 2023</div>
		</>
	)
}

export default App
