import React, { useState, useRef } from 'react';

import './BarradePesquisa.css';
import { PesquisarNomes } from "./ProcuraDeDados.js"; // Função de busca

const BarradePesquisa = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const debounceTimeout = useRef(null);
  const cache = useRef({}); // Cache para armazenar resultados de pesquisas
  const handleInput = (event) => {
    const value = event.target.value;
    setInputValue(value); // Preserve o valor original sem trim para manter os espaços
  
    // Limpa o timeout anterior
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
  
    // Se a entrada for menor que 3 caracteres, não faça a pesquisa
    if (value.trim().length < 3) { // Usando trim apenas para verificação de comprimento
      setSuggestions([]);
      return;
    }
  
    // Verifique se o valor já está no cache
    if (cache.current[value]) {
      setSuggestions(cache.current[value]);
      return;
    }
  
    // Define um novo timeout
    debounceTimeout.current = setTimeout(async () => {
      try {
        let nomes = await PesquisarNomes(value);
        setSuggestions(nomes); // Atualiza as sugestões
  
        // Armazene os resultados no cache
        cache.current[value] = nomes;
      } catch (error) {
        console.error("Erro ao buscar sugestões:", error);
        setSuggestions([]);
      }
    }, 100); 
  };
  

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setSuggestions([]);
  };

  return (
    <div className="Search">
      <input
        type="Search"
        id="CampoDeBusca"
        placeholder="Busca..."
        value={inputValue}
        onChange={handleInput}
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
