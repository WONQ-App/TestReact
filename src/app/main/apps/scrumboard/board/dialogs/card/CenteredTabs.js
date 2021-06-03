import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import UserDataInput from './UserDataInput';
import AttachimentInput from './AttachimentInput';
import MemoInput from './MemoInput';


const width = 20;

const widthModifier = {
    width: `${width}px`,
};

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: '100%',
    },
}));

const CenteredTabs = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <div className={classes.root}>
            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="off"
                aria-label="scrollable prevent tabs example"
            >
                <Tab style={{ minWidth: 80 }} icon={<PhoneIcon />} aria-label="phone" {...a11yProps(0)} />
                <Tab style={{ minWidth: 80 }} icon={<FavoriteIcon />} aria-label="favorite" {...a11yProps(1)} />
                <Tab style={{ minWidth: 80 }} icon={<PersonPinIcon />} aria-label="person" {...a11yProps(2)} />
                <Tab style={{ minWidth: 80 }} icon={<HelpIcon />} aria-label="help" {...a11yProps(3)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <UserDataInput />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <MemoInput />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <AttachimentInput />
            </TabPanel>
            <TabPanel value={value} index={3}>
                Item Four
      </TabPanel>

        </div>
    );
}

export default CenteredTabs