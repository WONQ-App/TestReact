import React, { useState, useEffect } from 'react';
import './App.css';
import '@fake-db';
import FuseLayout from '@fuse/core/FuseLayout';
import FuseTheme from '@fuse/core/FuseTheme';
import history from '@history';
import { createGenerateClassName, jssPreset, StylesProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { create } from 'jss';
import jssExtend from 'jss-plugin-extend';
import rtl from 'jss-rtl';
import Provider from 'react-redux/es/components/Provider';
import { Router } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import DateFnsUtils from '@date-io/date-fns';
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignIn, AmplifySignOut } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import PubSub from '@aws-amplify/pubsub';
import Amplify, { I18n } from '@aws-amplify/core';

import awsmobile from '../aws-exports';
import AppContext from './AppContext';
import routes from './fuse-configs/routesConfig';
import store from './store';
// Amplify
// 翻訳
import { vocabularies } from '../dictionary';

// Amplifyの設定
Amplify.configure(awsmobile);
PubSub.configure(awsmobile);

I18n.putVocabularies(vocabularies);
I18n.setLanguage('ja');

const jss = create({
	...jssPreset(),
	plugins: [...jssPreset().plugins, jssExtend(), rtl()],
	insertionPoint: document.getElementById('jss-insertion-point')
});

const generateClassName = createGenerateClassName({ disableGlobal: true });

const App = () => {
	const [authState, setAuthState] = useState();
	const [user, setUser] = useState();

	useEffect(() => {
		return onAuthUIStateChange((nextAuthState, authData) => {
			// console.log(nextAuthState, authData)
			setAuthState(nextAuthState);
			setUser(authData);
			// ユーザーグループによってサイドバーを変更
			if (authData) {
				if (authData.signInUserSession) {
					const userGroup = authData.signInUserSession.accessToken.payload['cognito:groups'];
					console.log(userGroup);
				}
			}
		});
	}, []);

	return (
		<AppContext.Provider
			value={{
				routes
			}}
		>
			<StylesProvider jss={jss} generateClassName={generateClassName}>
				<Provider store={store}>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<Router history={history}>
							<FuseTheme>
								<SnackbarProvider
									maxSnack={5}
									anchorOrigin={{
										vertical: 'bottom',
										horizontal: 'right'
									}}
									classes={{
										containerRoot: 'bottom-0 right-0 mb-52 md:mb-68 mr-8 lg:mr-80 z-99'
									}}
								>
									{/* 認証チェック */}
									{authState === AuthState.SignedIn && user ? (
										<FuseLayout />
									) : (
										<AmplifyAuthenticator slot="amplify-authenticator" usernameAlias="email">
											<AmplifySignUp
												slot="sign-up"
												usernameAlias="email"
												formFields={[
													{
														type: 'email',
														label: 'Eメールアドレス *',
														placeholder: 'Eメール',
														required: true
													},
													{
														type: 'password',
														label: 'パスワード *',
														placeholder: 'パスワード',
														required: true
													}
												]}
											/>
											<AmplifySignIn slot="sign-in" usernameAlias="email" />
										</AmplifyAuthenticator>
									)}
								</SnackbarProvider>
							</FuseTheme>
						</Router>
					</MuiPickersUtilsProvider>
				</Provider>
			</StylesProvider>
		</AppContext.Provider>
	);
};

export default App;
