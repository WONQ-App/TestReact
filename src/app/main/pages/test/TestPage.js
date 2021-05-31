import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import _ from '@lodash';
import { AmplifySignOut } from '@aws-amplify/ui-react';
import { API, Auth, Storage } from 'aws-amplify';

const useStyles = makeStyles(theme => ({
	root: {}
}));

function TestPage() {
	const classes = useStyles();

	useEffect(() => {
		// 初回のみ読み込まれる
		console.log('マウントされました！');

		// 現在のログイン情報を取得
		Auth.currentAuthenticatedUser().then(response => {
			console.log(response);
			// グループ取得
			const group = response.signInUserSession.accessToken.payload['cognito:groups'];
			console.log(group);
		});
	}, []);

	// サインアウト関数
	const signOut = () => {
		Auth.signOut().then(response => {
			console.log('サインアウトされました！');
		});
	};

	return (
		<div className={clsx(classes.root, 'flex flex-col flex-auto items-center justify-center p-16 sm:p-32')}>
			<div className="flex flex-col items-center justify-center w-full">
				<motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}>
					<AmplifySignOut />
					test
				</motion.div>
			</div>
		</div>
	);
}

export default TestPage;
