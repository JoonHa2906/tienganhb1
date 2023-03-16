import classNames from 'classnames/bind';
import styles from './Dictionary.module.scss';
import React, { useState,  useEffect } from 'react';
import Result from './Result';

const cx = classNames.bind(styles);

function Dictionary() {
  const [text, setText] = useState('');
  const [meanings, setMeanings] = useState([]);
  const [phonetics, setPhonetics] = useState([]);
  const [word, setWord] = useState('');
  const [error, setError] = useState('');
  const dictionaryApi = (text) => {
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${text}`;
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        setMeanings(result[0].meanings);
        setPhonetics(result[0].phonetics);
        setWord(result[0].word);
        setError('');
      })
      .catch((err) => setError(err));
  };

  const reset = () => {
    setError('');
    setMeanings([]);
    setPhonetics([]);
    setWord('');
  };

  useEffect(() => {
    if (!text.trim()) return reset();
    window.scrollTo({
      top: 0,
      behavior: `smooth`,
      });
    const debounce = setTimeout(() => {
      dictionaryApi(text);
    }, 800);
    return () => clearTimeout(debounce);
  }, [text]);
  
   return (
    <div>
      <h1 className={cx('title')}>English Dictionary</h1>

      <div className={cx('search')}>
          <input
            type="text"
            name="search"
            id="search"
            placeholder = "Search English B1's Dictionary"
            autoComplete = "off"
            spellCheck="false"
            className={cx('input-search')}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <label htmlFor="search" className={cx('label-search')}>Search English B1's Dictionary</label>
      </div>

      {text.trim() !== '' && !error && (
        <Result
          word={word}
          meanings={meanings}
          phonetics={phonetics}
          setText={setText}
        />
      )}
      {text.trim() !== '' && error && (
        <div className={cx("error")}>
          No exact match found for <span className={cx("danger")}>{text.trim()}</span> in English
        </div>
      )}
    </div>
   );
}

export default Dictionary;
