import Icon from '@material-ui/core/Icon';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

function UserMenu(props) {
	const dispatch = useDispatch();

	const [userMenu, setUserMenu] = useState(null);

	const userMenuClose = () => {
		setUserMenu(null);
	};

	return (
		<>
			<Popover
				open={Boolean(userMenu)}
				anchorEl={userMenu}
				onClose={userMenuClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center'
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center'
				}}
				classes={{
					paper: 'py-8'
				}}
			>
				<>
					<MenuItem component={Link} to="/login" role="button">
						<ListItemIcon className="min-w-40">
							<Icon>lock</Icon>
						</ListItemIcon>
						<ListItemText primary="Login" />
					</MenuItem>
					<MenuItem component={Link} to="/register" role="button">
						<ListItemIcon className="min-w-40">
							<Icon>person_add</Icon>
						</ListItemIcon>
						<ListItemText primary="Register" />
					</MenuItem>
				</>
			</Popover>
		</>
	);
}

export default UserMenu;
