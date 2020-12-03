import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { auth } from '../_actions/user_actions';
export default function (SpecificComponent, option, adminRoute = null) {

  //option
  //null:아무나 접근 가능
  //true:로그인한 유저 접근 가능
  //false:로그인한 유저는 접근 안됨
  function AuthenticationCheck(props) {
    const disptch = useDispatch();
    const history = useHistory();
    useEffect(() => {
      disptch(auth())//
        .then(response => {
          console.log(response);
          if (!response.payload.isAuth) {
            if (option) {
              history.push('/login');
            }
          } else {
            if (adminRoute && !response.payload.isAuth) {
              history.push('/');
            } else {
              if (option === false) {
                history.push('/');
              }
            }
          }
        });
    }, [disptch, history])
    return (<SpecificComponent />)
  }
  return AuthenticationCheck

}