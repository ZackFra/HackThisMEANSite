 export const login = (user, pass) => {
 	return {
 		type: 'LOGIN',
 		payload: {user, pass}
	}
}