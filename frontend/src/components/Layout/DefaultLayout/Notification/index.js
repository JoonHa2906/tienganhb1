import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { useEffect, useState } from 'react';
import styles from './Notification.module.scss';
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faBolt, faCircleInfo, faSquareCheck, faTriangleExclamation, faXmark } from '@fortawesome/free-solid-svg-icons';
import NotificationService from '~/services/notification.service';
import { NotiBox } from './NotiBox';
const cx = classNames.bind(styles);

function Notification({size}) {
   const icon = {
      success: faSquareCheck,
      info: faCircleInfo,
      danger: faBolt,
      warning: faTriangleExclamation
  }
   const [notifications, setNotifications] = useState([]);
   const [visibleNotification, setVisibleNotification] = useState(false);
   const [cookies] = useCookies(['email']);
   const [plusDown, setPlusDown] = useState(false);
   const [plusUp, setPlusUp] = useState(false);
   useEffect(() => {
      cookies.email.email && (async (e) => {
         await NotificationService.findNew(JSON.stringify({
            'email': cookies.email.email
         }))
         .then((response) => {
            setNotifications(response.data);
         })
         .catch((err) => {
             console.log(err);
         });
     })() 
   }, [cookies.email.email]);
   
   const deleteByIndex = (index, id) => {
      (async (e) => {
         await NotificationService.deleteNotification(JSON.stringify({
            'id': id
         }))
         .then(() => {
         })
         .catch((err) => {
             console.log(err);
         });
      })()
      setNotifications(oldValues => {
        return oldValues.filter((_, i) => i !== index)
      })
   }
   
   if (size==="lg") return (
      <div className={cx('notification-lg')}>
         <Tippy
            placement="bottom-end"
            visible={visibleNotification}
            interactive
            render={(attrs) => (
               <div className={cx('notification-menu')} tabIndex="-1" {...attrs}>
                  <PopperWrapper>
                     <div className={cx('notification-header')}>
                        <span className={cx('notification-header-title')}>
                           NOTIFICATION
                        </span>
                     </div>
                     {
                        (notifications && notifications.length) > 0?
                           notifications.map((item, index) => {
                              return (
                                 item.link && item.link!=="" ?
                                 <div
                                    key={index}
                                    className={cx('wrapper-notification',`wrapper-${item.type}`)}
                                    
                                 >
                                    <Link 
                                       className={cx('icon-notification')}
                                       to={item.link}
                                       onClick={() => {
                                          setVisibleNotification(false);
                                       }}
                                    >
                                       <div className = {cx('icon-item', `icon-${item.type}`)}>
                                          <FontAwesomeIcon
                                             icon={icon[item.type]}
                                          />
                                       </div>
                                    </Link>
                                    <Link 
                                       className={cx('info-notification')}
                                       to={item.link}
                                       onClick={() => {
                                          setVisibleNotification(false);
                                       }}
                                    >
                                       {item.content}
                                    </Link>
                                    <div className={cx('seen-notification')} title = "Delete">
                                          <div className={cx('button-seen')} 
                                             onClick={() => deleteByIndex(index, item.id)}
                                          >
                                             <FontAwesomeIcon icon={faXmark} />
                                          </div>
                                    </div>
                                 </div>
                                 :
                                 <div
                                    key={index}
                                    className={cx('wrapper-notification', `wrapper-${item.type}`)}
                                 >
                                    <div className={cx('icon-notification')}>
                                       <div className = {cx('icon-item', `icon-${item.type}`)}>
                                          <FontAwesomeIcon
                                             icon={icon[item.type]}
                                          />
                                       </div>
                                    </div>
                                    <div className={cx('info-notification')}>
                                       {item.content}
                                    </div>
                                    <div className={cx('seen-notification')} title = "Delete">
                                          <div className={cx('button-seen')} 
                                             onClick={() => deleteByIndex(index, item.id)}
                                          >
                                             <FontAwesomeIcon icon={faXmark} />
                                          </div>
                                    </div>
                                 </div>
                              );
                           })
                        :
                        (<div className={cx('wrapper-notification-none')} >
                           Bạn chưa có thông báo mới nào.
                        </div>)
                     }
                     
                  </PopperWrapper>
               </div>
            )}
            onClickOutside={() => setVisibleNotification(false)}
         >
            <div
               className={cx('notification')}
               aria-expanded="false"
               onClick={() => {
                  setVisibleNotification(!visibleNotification);
               }}
               title="Notification"
            >
               <div className={cx("bell", notifications.length > 0 && "bell-shake")}  style={visibleNotification ? {color: "#11f"} : {}}>
                  <FontAwesomeIcon
                     icon={faBell}
                     className={cx('notification-icon')}
                  />
                  {notifications.length > 0 && <span className={cx('number')}>{notifications.length}</span>}
               </div>
            </div>
         </Tippy>
      </div>
      )

//smDown

      if (size==="smDown") return (
         <nav className={cx(`nav-plus`)}>
                    <div 
                        className={cx('sidebar-item', "fiction")}
                            onClick={() => {
                                setPlusDown(true);
                            }
                        }
                    >
                        {plusDown && <div className={cx('fiction-item')}>
                           <div className={cx("bell", notifications.length > 0 && "bell-shake")}>
                              <FontAwesomeIcon
                                 icon={faBell}
                                 className={cx('icon')}
                              />
                              {notifications && notifications.length > 0 && <span className={cx('number')}>{notifications.length}</span>}
                           </div>
                        </div>}
                        <div className={cx("bell", notifications.length > 0 && "bell-shake")}>
                            <FontAwesomeIcon
                                icon={faBell}
                                className={cx('icon')}
                            />
                            {notifications && notifications.length > 0 && <span className={cx('number')}>{notifications.length}</span>}
                          
                        </div>
                    </div>
                    <NotiBox show={plusDown} type="plus-down" onClickOutside={() => {setPlusDown(false)}} >
                        <div className={cx('notification-smDown')}>
                           <div className={cx('notification-menu')}>
                              <PopperWrapper>
                                 <div className={cx('notification-header')}>
                                    <span className={cx('notification-header-title')}>
                                       NOTIFICATION
                                    </span>
                                 </div>
                                 {
                                    (notifications && notifications.length) > 0?
                                       notifications.map((item, index) => {
                                          return (
                                             item.link && item.link!=="" ?
                                             <div
                                                key={index}
                                                className={cx('wrapper-notification',`wrapper-${item.type}`)}
                                                
                                             >
                                                <Link 
                                                   className={cx('icon-notification')}
                                                   to={item.link}
                                                   onClick={() => {
                                                      setVisibleNotification(false);
                                                   }}
                                                >
                                                   <div className = {cx('icon-item', `icon-${item.type}`)}>
                                                      <FontAwesomeIcon
                                                         icon={icon[item.type]}
                                                      />
                                                   </div>
                                                </Link>
                                                <Link 
                                                   className={cx('info-notification')}
                                                   to={item.link}
                                                   onClick={() => {
                                                      setVisibleNotification(false);
                                                   }}
                                                >
                                                   {item.content}
                                                </Link>
                                                <div className={cx('seen-notification')} title = "Delete">
                                                      <div className={cx('button-seen')} 
                                                         onClick={() => deleteByIndex(index, item.id)}
                                                      >
                                                         <FontAwesomeIcon icon={faXmark} />
                                                      </div>
                                                </div>
                                             </div>
                                             :
                                             <div
                                                key={index}
                                                className={cx('wrapper-notification', `wrapper-${item.type}`)}
                                             >
                                                <div className={cx('icon-notification')}>
                                                   <div className = {cx('icon-item', `icon-${item.type}`)}>
                                                      <FontAwesomeIcon
                                                         icon={icon[item.type]}
                                                      />
                                                   </div>
                                                </div>
                                                <div className={cx('info-notification')}>
                                                   {item.content}
                                                </div>
                                                <div className={cx('seen-notification')} title = "Delete">
                                                      <div className={cx('button-seen')} 
                                                         onClick={() => deleteByIndex(index, item.id)}
                                                      >
                                                         <FontAwesomeIcon icon={faXmark} />
                                                      </div>
                                                </div>
                                             </div>
                                          );
                                       })
                                    :
                                    (<div className={cx('wrapper-notification-none')} >
                                       Bạn chưa có thông báo mới nào.
                                    </div>)
                                 }
                              </PopperWrapper>
                           </div>
                        </div>
                    </NotiBox>
                </nav>
         
      );

// smUp

if (size==="smUp") return (
   <nav className={cx(`nav-plus`)}>
              <div 
                  className={cx('sidebar-item', "fiction")}
                      onClick={() => {
                          setPlusUp(true);
                      }
                  }
              >
                  {plusUp ? <div className={cx('fiction-item')}>
                     <div className={cx("bell", notifications.length > 0 && "bell-shake")}>
                        <FontAwesomeIcon
                           icon={faBell}
                           className={cx('icon')}
                        />
                        {notifications && notifications.length > 0 && <span className={cx('number')}>{notifications.length}</span>}
                     </div>
                  </div>:<></>}
                  <div className={cx("bell", notifications.length > 0 && "bell-shake")}>
                      <FontAwesomeIcon
                          icon={faBell}
                          className={cx('icon')}
                      />
                      {notifications && notifications.length > 0 && <span className={cx('number')}>{notifications.length}</span>}
                    
                  </div>
              </div>
              <NotiBox show={plusUp} type="plus-up" onClickOutside={() => {setPlusUp(false)}} >
                  <div className={cx('notification-smUp')}>
                     <div className={cx('notification-menu')}>
                        <PopperWrapper>
                           <div className={cx('notification-header')}>
                              <span className={cx('notification-header-title')}>
                                 NOTIFICATION
                              </span>
                           </div>
                           {
                              (notifications && notifications.length) > 0?
                                 notifications.map((item, index) => {
                                    return (
                                       item.link && item.link!=="" ?
                                       <div
                                          key={index}
                                          className={cx('wrapper-notification',`wrapper-${item.type}`)}
                                          
                                       >
                                          <Link 
                                             className={cx('icon-notification')}
                                             to={item.link}
                                             onClick={() => {
                                                setVisibleNotification(false);
                                             }}
                                          >
                                             <div className = {cx('icon-item', `icon-${item.type}`)}>
                                                <FontAwesomeIcon
                                                   icon={icon[item.type]}
                                                />
                                             </div>
                                          </Link>
                                          <Link 
                                             className={cx('info-notification')}
                                             to={item.link}
                                             onClick={() => {
                                                setVisibleNotification(false);
                                             }}
                                          >
                                             {item.content}
                                          </Link>
                                          <div className={cx('seen-notification')} title = "Delete">
                                                <div className={cx('button-seen')} 
                                                   onClick={() => deleteByIndex(index, item.id)}
                                                >
                                                   <FontAwesomeIcon icon={faXmark} />
                                                </div>
                                          </div>
                                       </div>
                                       :
                                       <div
                                          key={index}
                                          className={cx('wrapper-notification', `wrapper-${item.type}`)}
                                       >
                                          <div className={cx('icon-notification')}>
                                             <div className = {cx('icon-item', `icon-${item.type}`)}>
                                                <FontAwesomeIcon
                                                   icon={icon[item.type]}
                                                />
                                             </div>
                                          </div>
                                          <div className={cx('info-notification')}>
                                             {item.content}
                                          </div>
                                          <div className={cx('seen-notification')} title = "Delete">
                                                <div className={cx('button-seen')} 
                                                   onClick={() => deleteByIndex(index, item.id)}
                                                >
                                                   <FontAwesomeIcon icon={faXmark} />
                                                </div>
                                          </div>
                                       </div>
                                    );
                                 })
                              :
                              (<div className={cx('wrapper-notification-none')} >
                                 Bạn chưa có thông báo mới nào.
                              </div>)
                           }
                        </PopperWrapper>
                     </div>
                  </div>
              </NotiBox>
          </nav>
   
);
}

export default Notification;
