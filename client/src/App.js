import { useState } from 'react'
import './App.css'

import SearchField from './components/SearchField';
import GetFromServer from './components/GetFromServer'

const API = process.env.NODE_ENV === 'production' ? 'https://desafio-ultra-lims-bf67cb51e00e.herokuapp.com/' : 'http://localhost:3001';


function App() {

	return (
		<>
			<div className='header'> Ultra LIMS Challenge</div>
			<div className='content'>
				<div className='column search-area'>
					<SearchField api={API} />
				</div>
				<div className='column server-area'>
					<GetFromServer api={API} />
				</div>
			</div>
			<div className='footer'>Arthur Schuelter @ 2023</div>
		</>
	)
}

export default App
