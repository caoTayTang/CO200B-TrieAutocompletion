import './Input.css';
import { useState, useRef, useEffect } from 'react';

function Input({ onQuery }) {
    const [input, setInput] = useState('');
    const [suggestList, setSuggestList] = useState([]);

    const inputRef = useRef()

    const handleOnChange = (e) => {
        setInput(e.target.value)
        setSuggestList(onQuery(e.target.value))
        // console.log(trie.getMatches(e.target.value))
    };

    const handleOnClick = (input) => {
        setSuggestList(onQuery(input))
        inputRef.current.focus()
    }

    useEffect(() => {
        document.title = input === '' ? 'Trie Autocomplete' : input
    }, [input])


    return (
        <div className="input-wrapper">
            <div className = "inner-wrapper">
                <label className = "label-input" htmlFor="queryInput" > Search </label>
                <input 
                    className='input'
                    ref = {inputRef}
                    id="queryInput" 
                    value={input} 
                    onChange={handleOnChange} 
                    autoFocus
                />
                <button
                    className = "query-btn" 
                    onClick = {() => handleOnClick(input)}
                >
                    Query
                </button>
            </div>
            
            {suggestList.length > 0 && input !== '' && (
                <ul className='suggest-list'>
                    {suggestList.slice(0, 5).map((item, index) => (
                        <li key={index} 
                            className = "suggestion"
                            onClick={() => {
                                setInput(item.title)
                                handleOnClick(item.title)
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#e0e0e0'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = '#f9f9f9'}
                        >
                            {item.title}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Input;