import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './BarradePesquisa.css';
import { PesquisarNomes } from "./ProcuraDeDados.js";

const BarradePesquisa = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const debounceTimeout = useRef(null);
  const cache = useRef({});
  const navigate = useNavigate();  // Hook para navegação

  const handleInput = (event) => {
    const value = event.target.value;
    setInputValue(value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    if (value.trim().length < 3) {
      setSuggestions([]);
      return;
    }

    if (cache.current[value]) {
      setSuggestions(cache.current[value]);
      return;
    }

    debounceTimeout.current = setTimeout(async () => {
      try {
        let nomes = await PesquisarNomes(value);
        setSuggestions(nomes);
        cache.current[value] = nomes;
      } catch (error) {
        console.error("Erro ao buscar sugestões:", error);
        setSuggestions([]);
      }
    }, 300);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setSuggestions([]);
    navigate(`/livro/${encodeURIComponent(suggestion)}`);  // Navegação para a página do livro
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (inputValue.trim()) {
        navigate(`/livro/${encodeURIComponent(inputValue)}`);  // Navegação ao pressionar Enter
      }
    }
  };

  return (
    <div className="Search">
      <input
        type="search"
        id="CampoDeBusca"
        placeholder="Busca..."
        value={inputValue}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
      />
      {suggestions.length > 0 && (
        <ul className="list">
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BarradePesquisa;
