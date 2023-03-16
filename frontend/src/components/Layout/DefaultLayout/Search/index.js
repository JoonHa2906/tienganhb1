import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SearchItem from '~/components/SearchItem';
import { useEffect, useState, useRef } from 'react';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { useDebounce } from '~/hooks';
import { faXmark, faSpinner, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import img2 from '~/asset/img/img2.png';
import img1 from '~/asset/img/img1.png';

const cx = classNames.bind(styles);
function Search({width}) {
   const [searchResult, setSearchResult] = useState([]);
   const [searchValue, setSearchValue] = useState('');
   const [showResult, setShowResult] = useState(false);
   const [loading, setLoading] = useState(false);
   const inputRef = useRef();

   const debounce = useDebounce(searchValue, 500);

   useEffect(() => {
      if (!debounce.trim()) return;
      setLoading(true);
      axios
         .get(`https://tiktok.fullstack.edu.vn/api/users/search`, {
            params: {
               q: debounce,
               type: 'less',
            },
         })
         .then((res) => {
            setSearchResult(res.data.data);
            setLoading(false);
         })
         .catch(() => {
            setLoading(false);
         });
   }, [debounce]);
   const handleClear = () => {
      setSearchValue('');
      inputRef.current.focus();
      setSearchResult([]);
      setShowResult(false);
   };
   const handleHideResult = () => {
      setShowResult(false);
   };
   const handleChange = (e) => {
      let searchValueChange;
      if (e.target.value.startsWith(' ')) {
         searchValueChange = e.target.value.slice(1);
         setSearchValue(searchValueChange);
      } else {
         searchValueChange = e.target.value;
         setSearchValue(searchValueChange);
      }
      if (searchValueChange !== '') setShowResult(true);
      else {
         setShowResult(false);
         setSearchResult([]);
      }
   };

   return (
      <div>
         <HeadlessTippy
            interactive
            visible={showResult}
            render={(attrs) => (
               <div className={cx('search-result')} style={{width: width}} tabIndex="-1" {...attrs}>
                  <PopperWrapper>
                     {loading ? (
                        <div className={cx('search_header')}>
                           <FontAwesomeIcon
                              icon={faSpinner}
                              className={cx('search-result-info-icon-loading')}
                           />
                           <div className={cx('search-result-info-title')}>Tìm '{searchValue}'</div>
                        </div>
                     ) : searchResult.length > 0 ? (
                        <div className={cx('search_header')}>
                           <FontAwesomeIcon
                              icon={faMagnifyingGlass}
                              className={cx('search-result-info-icon')}
                           />
                           <div className={cx('search-result-info-title')}>
                              Kết quả cho '{searchValue}'
                           </div>
                        </div>
                     ) : (
                        <div className={cx('search_header')}>
                           <FontAwesomeIcon
                              icon={faMagnifyingGlass}
                              className={cx('search-result-info-icon')}
                           />
                           <div className={cx('search-result-info-title')}>
                              Không có kết quả cho '{searchValue}'
                           </div>
                        </div>
                     )}

                     {searchResult.length > 0 && (
                        <>
                           <div className={cx('search-item-header')}>
                              <span className={cx('search-item-header-title')}>KHÓA HỌC</span>
                              <Link
                                 to="/"
                                 className={cx('search-item-header-link')}
                                 onClick={() => {
                                    setShowResult(false);
                                 }}
                              >
                                 Xem thêm
                              </Link>
                           </div>

                           {searchResult.map((result) => (
                              <Link
                                 key={result.id}
                                 className={cx('wrapper-link')}
                                 to="/learning"
                                 onClick={() => {
                                    setShowResult(false);
                                 }}
                              >
                                 <img className={cx('img')} src={img1} alt="title-img"></img>
                                 <span className={cx('info')}>{result.full_name}</span>
                              </Link>
                           ))}

                           <div className={cx('search-item-header')}>
                              <span className={cx('search-item-header-title')}>BÀI VIẾT</span>
                              <Link to="/" className={cx('search-item-header-link')}>
                                 Xem thêm
                              </Link>
                           </div>
                           <SearchItem
                              img={img2}
                              title="Các nguồn tài nguyên hữu ích cho 1 front-end developer"
                           />
                           <SearchItem
                              img={img1}
                              title="Cách đưa code lên GitHub và tạo GitHub Pages"
                           />
                           <SearchItem
                              img={img2}
                              title="Tổng hợp tài liệu tự học tiếng anh cơ bản."
                           />
                           <div className={cx('search-item-header')}>
                              <span className={cx('search-item-header-title')}>VIDEO</span>
                              <Link to="/" className={cx('search-item-header-link')}>
                                 Xem thêm
                              </Link>
                           </div>
                           <SearchItem
                              img={img1}
                              title="Ai có thu nhập cao và đi xa trong ngành IT? | Làm IT có thật sự kiếm nhiều kiền?"
                           />
                           <SearchItem
                              img={img2}
                              title="Phương pháp HỌC LẬP TRÌNH của Sơn Đặng! | Lộ trình học lập trình | Phương pháp học lập trình"
                           />
                           <SearchItem
                              img={img1}
                              title="Javascript có thể làm được gì? Giới thiệu qua về trang F8 | Học lập trình Javascript cơ bản"
                           />
                        </>
                     )}
                  </PopperWrapper>
               </div>
            )}
            onClickOutside={handleHideResult}
         >
            <div className={cx('header-search')} aria-expanded="false" style={{width: width}}>
               <button className={cx('header-search-icon')}>
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
               </button>

               <input
                  ref={inputRef}
                  value={searchValue}
                  className={cx('header-search-input')}
                  spellCheck="false"
                  placeholder="Search..."
                  onChange={handleChange}
                  onFocus={(e) => {
                     if (e.target.value !== '') setShowResult(true);
                     else {
                        setShowResult(false);
                     }
                  }}
               />

               {!!searchValue && (
                  <button className={cx('header-search-clear')} onClick={handleClear}>
                     <FontAwesomeIcon icon={faXmark} />
                  </button>
               )}
            </div>
         </HeadlessTippy>
      </div>
   );
}

export default Search;
