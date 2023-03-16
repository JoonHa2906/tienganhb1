import classNames from 'classnames/bind';
import styles from './Profile.module.scss';

const cx = classNames.bind(styles);

function Profile() {
   return (
      <div className={cx('content')}>
         <h1 className={cx('title')}>Profile</h1>
         <div className={cx('row')}>
            <div className={cx('col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12')}>
                  
                  
            </div>
         </div>
      </div>
   );
}

export default Profile;
