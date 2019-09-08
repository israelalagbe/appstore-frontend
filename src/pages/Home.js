import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { inject, observer } from 'mobx-react';
import AppItem from './AppItem';
import appPicture from "../maxresdefault.jpg";
import CircularProgress from '@material-ui/core/CircularProgress';
class Home extends Component {
    async componentWillMount() {
        const { classes, authStore, appStore } = this.props;
        try {
            await appStore.fetchApps('android')
        }
        catch{
            alert("Error occured while fetching apps ")
        }

    }
    render() {
        const { classes, authStore, appStore } = this.props;

        let cards = [1, 2, 3, 4, 5, 6];

        return (
            <main>
                <div className={classNames(classes.layout, classes.cardGrid)}>
                    {/* End hero unit */}
                    <Grid container spacing={8}>
                        {appStore.apps.map(app => (
                            <Grid item key={app.id} xs={12} sm={6} md={3} lg={3}>
                                <AppItem
                                    appTitle={app.name}
                                    appMaker={"Waves Developers"}
                                    appRating={app.rating}
                                    appImage={app.image}
                                />
                            </Grid>
                        ))}
                    </Grid>
                    {appStore.loading ? (<CircularProgress style={{ position: 'absolute', top: '50%', left: '50%' }} />) : null}
                </div>
            </main>
        );
    }
}

const styles = theme => ({
    appBar: {
        position: 'relative',
    },
    icon: {
        marginRight: theme.spacing.unit * 2,
    },
    heroUnit: {
        backgroundColor: theme.palette.background.paper,
    },
    heroContent: {
        maxWidth: 600,
        margin: '0 auto',
        padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
    },
    heroButtons: {
        marginTop: theme.spacing.unit * 4,
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    cardGrid: {
        padding: `${theme.spacing.unit * 8}px 0`,
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    avatar: {
        backgroundSize: '100% 100%',
        width: '40px',
        height: '40px'

    },

    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing.unit * 6,
    },
});

Home.propTypes = {
    classes: PropTypes.object.isRequired,
    authStore: PropTypes.object.isRequired
};
export default withStyles(styles)(
    inject('authStore', 'appStore')(
        observer(Home)
    )
);