import classNames from 'classnames/bind';
import styles from './SearchItem.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function SearchItem({ img, title }) {
   return (
      <Link className={cx('wrapper')} to="/learning">
         <img className={cx('img')} src={img} alt="title-img"></img>
         <span className={cx('info')}>{title}</span>
      </Link>
   );
}

export default SearchItem;
