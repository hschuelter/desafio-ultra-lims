import { useState } from 'react'
import '../App.css'

export function makeAPICall(param) {
	return fetch('https://viacep.com.br/ws/' + param + '/json/');
}

function SearchField() {
	const [searchCEP, setSearchCEP] = useState('')
	const [resultCEP, setResultCEP] = useState('')
	const [warningMessage, setWarningMessage] = useState('')

	const handleChange = e => {
		const result = e.target.value.replace(/[^0-9]/gi, '');
		setSearchCEP(result);
	}

	async function handleSearchClick() {
		if (searchCEP.length < 8){
			setWarningMessage("São necessários 8 caracteres!");
			return;
		}
		setWarningMessage('');
		let result = await makeAPICall(searchCEP);
		let response = await result.json();
		if (response.erro === true) {
			console.log(response);
			setWarningMessage("CEP inexistente");
			setResultCEP('');
		}
		else {
            var resultData = {
                "cep" : searchCEP,
                "logradouro" : response.logradouro,
                "cidade" : response.localidade,
                "estado" : response.uf,
                "bairro" : response.bairro

            }
			setResultCEP(resultData);
		}
	}

    async function handleAddClick() {
        const data = resultCEP;

        console.log(data);

        fetch('http://localhost:3001/api/post', {
            method: 'POST',
            credentials: 'same-origin',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
    }

	return (
		<div>
            <input
                className='search-field' 
                placeholder='Digite o CEP...'
                value={searchCEP} 
                maxLength={8} 
                onChange={handleChange}
            />
            <button 
                className='search-button'
                onClick={handleSearchClick}
            />
            <div className='warning-field'> {warningMessage} </div>
            
            <div className='result-field'>
                { resultCEP ? 
                    <div> 
                        <table>
                            <thead>
                                <tr>
                                    <th>CEP</th>
                                    <th>Logradouro</th>
                                    <th>Cidade</th>
                                    <th>Estado</th>
                                    <th>Bairro</th>
                                </tr>
                            </thead>
                            <tr key={0}> 
                                <td key={'0z'}> {resultCEP.cep} </td> 
                                <td key={'0a'}> {resultCEP.logradouro} </td> 
                                <td key={'0b'}> {resultCEP.cidade} </td> 
                                <td key={'0c'}> {resultCEP.estado} </td> 
                                <td key={'0d'}> {resultCEP.bairro} </td> 
                            </tr> 
                        </table> 
                        <button
                            className='add-button' 
                            onClick={handleAddClick}> + </button>
                    </div>: ''
                    }
            </div>
		</div>
	)
}

export default SearchField
