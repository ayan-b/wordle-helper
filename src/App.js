import React, { useEffect, useState } from 'react';

import './App.css';

import raw from './words.txt';

function App() {

  const [fiveLetterWords, setFiveLetterWords] = useState([]);
  const [filteredWords, setFilteredWords] = useState([]);

  useEffect(() => {
    fetch(raw)
      .then(response => response.text())
      .then(text => text.split('\n'))
      .then(text => text.map(word => word.toLowerCase()))
      .then(text => setFiveLetterWords(text));
  }, [])

  const handleOnChange = (event) => {
    let regexForm = '';
    for (let i = 0; i < 5; i++) {
      const cur = document.getElementById(`letter-${i}`).value;
      if (!cur.length) {
        regexForm += '.';
      } else {
        regexForm += cur;
      }
    }

    let incorrectPositionLetters = document.getElementById(`incorrect-letter`).value.toLowerCase();
    let doesNotContainLetters = document.getElementById(`not-contain`).value.toLowerCase();

    const regexedForm = new RegExp(regexForm.toLowerCase(), 'g');
    const curFilteredWords = fiveLetterWords.filter(word => word.match(regexedForm));
    const filteredCurFilteredWords = curFilteredWords.filter(word => {
      for (const letter of incorrectPositionLetters) {
        if (word.includes(letter)) {
          continue;
        } else {
          return false;
        }
      }
      for (const letter of doesNotContainLetters) {
        if (word.includes(letter)) {
          return false;
        }
      }
      return true;
    });

    setFilteredWords(filteredCurFilteredWords);
  }

  return (
    <div className="App">
      <p>Letter(s) at their place:</p>
      <input type="text" id="letter-0" name="first-letter" minLength="1" maxLength="1" size="3" onChange={handleOnChange} />
      <input type="text" id="letter-1" name="second-letter" minLength="1" maxLength="1" size="3" onChange={handleOnChange} />
      <input type="text" id="letter-2" name="third-letter" minLength="1" maxLength="1" size="3" onChange={handleOnChange} />
      <input type="text" id="letter-3" name="fourth-letter" minLength="1" maxLength="1" size="3" onChange={handleOnChange} />
      <input type="text" id="letter-4" name="five-letter" minLength="1" maxLength="1" size="3" onChange={handleOnChange} />
      <p>Letter(s) at incorrect place:</p>
      <input type="text" id="incorrect-letter" name="letter-incorrect" minLength="1" maxLength="5" size="15" onChange={handleOnChange} />
      <p>Doesn't contain the letters:</p>
      <input type="text" id="not-contain" name="does-not-contain" minLength="1" maxLength="26" size="40" onChange={handleOnChange} />
      <p>Filtered word(s):</p>
      {filteredWords
        .map((word, index) => { return <p key={index}>{word}</p> })}
    </div>
  );
}

export default App;
