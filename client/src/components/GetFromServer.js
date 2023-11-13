import { useState } from 'react'
import '../App.css'

export function makeAPICall(api) {
	return fetch(api + 'api/enderecos');
}
function SearchField(props) {

	const [data, setData] = useState([])

	async function handleClickEvent() {
		let result = await makeAPICall(props.api);
		let response = await result.json();
		await setData(response.enderecos);
		// console.log(data);
	}

	return (
        <div>
            <button
                className='get-button'
                onClick={handleClickEvent}>
                GET
            </button>
            <div className='database'>
                { data.length > 0 ? 
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
                        { data.map((item, i) => 
                            <tr key={i}> 
                                <td key={i + 'a'}> {item.cep} </td> 
                                <td key={i + 'b'}> {item.logradouro} </td> 
                                <td key={i + 'c'}> {item.cidade} </td> 
                                <td key={i + 'd'}> {item.estado} </td> 
                                <td key={i + 'e'}> {item.bairro} </td> 
                            </tr>  ) }
                    </table> : ''
                }
            </div>
            
        </div>
	)
}

export default SearchField
