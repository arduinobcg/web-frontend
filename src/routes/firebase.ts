import { firebaseApp, userResult, userToken } from './store';
import {
	GoogleAuthProvider,
	getAuth,
	signInWithPopup,
	signInAnonymously,
	onAuthStateChanged,
	onIdTokenChanged
} from 'firebase/auth';
const auth = getAuth();
const provider = new GoogleAuthProvider();

onAuthStateChanged(auth, (user) => {
	userResult.set(user);
	user?.getIdToken().then((e) => { console.log('token:', e); return e }).then(userToken.set);
	
});
// onIdTokenChanged(auth, async (currentUser) => {
// 	if (currentUser) {
// 		userToken.set(await currentUser?.getIdToken());
// 	}
// 	userResult.set(currentUser);
// })

export function login() {
	signInWithPopup(auth, provider)
		.then(async (result) => {
			// This gives you a Google Access Token. You can use it to access the Google API.
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential?.accessToken;
			// The signed-in user info.
			const user = result.user;
			// IdP data available using getAdditionalUserInfo(result)
			// ...
			console.log(credential);
			console.log(user);
			userResult.set(user);
			userToken.set(await user.getIdToken());
		})
		.catch((error) => {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			// The email of the user's account used.
			const email = error.customData.email;
			// The AuthCredential type that was used.
			const credential = GoogleAuthProvider.credentialFromError(error);
			// ...
		});
}
export function loginAnonymous() {
	signInAnonymously(auth)
		.then((result) => {
			// Signed in..
			userResult.set(result.user);
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			// ...
		});
}
