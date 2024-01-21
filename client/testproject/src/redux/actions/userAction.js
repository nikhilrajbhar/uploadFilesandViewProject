import { SAVE_LOGIN, LOGIN_ERROR } from "../constants/actionTypes";

export const login_details = (userdata) => {
    return (dispatch) => {
        fetch(`http://localhost:3000/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userdata)
        })
            .then(res => res.json())
            .then(res2 => {
                console.warn(res2);
                if (res2.success === true) {      
                    document.cookie = `token=${res2.token};max-age=` + 60 * 60 * 24 * 365; //1yr
                    dispatch({ type: SAVE_LOGIN, data: res2.user, token: res2.token });
                } else {
                    dispatch({ type: LOGIN_ERROR, data: "login error" });                  
                }
            }).catch(err => alert("something went wrong"))
    }
}
