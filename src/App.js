import React, { useEffect, useState } from 'react';

import './App.css';

import raw from './larger.txt';
import words from './words.txt';

function App() {

  const [fiveLetterWords, setFiveLetterWords] = useState([]);
  const [filteredWords, setFilteredWords] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    fetch(isChecked ? raw : words)
      .then(response => response.text())
      .then(text => text.split('\n'))
      .then(text => text.map(word => word.toLowerCase()))
      .then(text => setFiveLetterWords(text));
  }, [isChecked]);

  const handleCheckbox = (event) => {
    setIsChecked(event.target.checked);
  };

  useEffect(() => {
    handleOnChange();
  }, [fiveLetterWords]);

  const handleOnChange = (event) => {

    let incorrectPositionLettersArray = [];

    let regexForm = '';
    for (let i = 0; i < 5; i++) {
      const cur = document.getElementById(`letter-${i}`).value;
      const incorrectLetterAtIndex = document.getElementById(`incorrect-letter-${i}`).value;
      if (!cur.length) {
        regexForm += '.';
      } else {
        regexForm += cur;
      }
      incorrectPositionLettersArray.push(incorrectLetterAtIndex);
    }

    // let incorrectPositionLetters = document.getElementById(`incorrect-letter`).value.toLowerCase();
    let incorrectPositionLetters = incorrectPositionLettersArray.join('').toLowerCase();
    let doesNotContainLetters = document.getElementById(`not-contain`).value.toLowerCase();

    // console.log(incorrectPositionLetters);

    const regexedForm = new RegExp(regexForm.toLowerCase(), 'g');
    const curFilteredWords = fiveLetterWords.filter(word => word.match(regexedForm));
    // console.log(curFilteredWords);
    const filteredCurFilteredWords = curFilteredWords.filter(word => {
      for (const letter of incorrectPositionLetters) {
        if (word.includes(letter)) {
          for (let i = 0; i < 5; ++i) {
            if (incorrectPositionLettersArray[i].includes(word[i])) {
              return false;
            }
          }
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
    setFilteredWords(filteredCurFilteredWords.length < fiveLetterWords.length ? filteredCurFilteredWords : []);
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
      <input type="text" id="incorrect-letter-0" name="incorrect-first-letter" minLength="1" maxLength="5" size="3" onChange={handleOnChange} />
      <input type="text" id="incorrect-letter-1" name="incorrect-second-letter" minLength="1" maxLength="5" size="3" onChange={handleOnChange} />
      <input type="text" id="incorrect-letter-2" name="incorrect-third-letter" minLength="1" maxLength="5" size="3" onChange={handleOnChange} />
      <input type="text" id="incorrect-letter-3" name="incorrect-fourth-letter" minLength="1" maxLength="5" size="3" onChange={handleOnChange} />
      <input type="text" id="incorrect-letter-4" name="incorrect-five-letter" minLength="1" maxLength="5" size="3" onChange={handleOnChange} />
      <p>Doesn't contain the letters:</p>
      <input type="text" id="not-contain" name="does-not-contain" minLength="1" maxLength="26" size="40" onChange={handleOnChange} />
      <br />
      <br />
      <input type="checkbox" id="larger-list" name="larger-list" onChange={handleCheckbox} />
      <label htmlFor="larger-list">Use larger wordlist</label>
      <p>Filtered word(s):</p>
      {filteredWords
        .map((word, index) => { return <p key={index}>{word}</p> })}
    </div>
  );
}

export default App;
