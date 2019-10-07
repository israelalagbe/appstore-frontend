import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { inject, observer } from 'mobx-react';
import AppItem from './AppItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';
import { reaction } from 'mobx';

class Home extends Component {
    async componentWillMount() {
        const { classes, authStore, appStore } = this.props;
        this.fetchApps();
        const disposer = reaction(() => authStore.authenticated, (change) => {
            console.clear();
            console.warn("Authenticated", authStore.authenticated);
            this.fetchApps();
        });
    }
    componentWillUpdate() {
        //this.fetchApps();
    }
    async fetchApps() {
        const { classes, authStore, appStore } = this.props;

        try {
            if (authStore.authenticated) {
                await appStore.fetchAppsByDeveloperId(authStore.user.id);
            }
            else {
                await appStore.fetchApps('android');
            }


        }
        catch (e) {
            console.log(e);
            alert("Error occured while fetching apps ")
        }
    }
    render() {
        const { classes, authStore, appStore, history } = this.props;

        return (
            <main>

                <div className={classNames(classes.layout, classes.cardGrid)}>
                    <Fab
                        style={{ visibility: authStore.authenticated ? 'visible' : 'hidden' }}
                        onClick={(appId) => {
                            history.push(`upload`)
                        }}
                        variant="extended" aria-label="delete" className={classes.fab}
                    >
                        <CloudUploadIcon className={classes.extendedIcon} />
                        Upload New App
                    </Fab>
                    <h1 style={{ color: '#333', display: authStore.authenticated ? 'block' : 'none' }}>My Apps</h1>

                    {/* End hero unit */}
                    <Grid container spacing={8}>
                        {appStore.apps.map(app => (
                            <Grid item key={app.id} xs={12} sm={6} md={3} lg={3}>
                                <AppItem
                                    appTitle={app.name}
                                    appMaker={app.developer.name}
                                    appRating={app.rating}
                                    appImage={app.image}
                                    appId={app.id}
                                    onPress={(appId) => {
                                        history.push(`apps/${appId}`)
                                    }}
                                />
                            </Grid>
                        ))}
                        {appStore.apps.length == 0 ? <h3 style={{ textAlign: 'center', margin: 'auto', 'display': 'block' }}>No apps to display!</h3> : ""}
                    </Grid>
                    {appStore.loading ? (<CircularProgress style={{ position: 'absolute', top: '50%', left: '50%' }} />) : null}
                </div>
            </main>
        );
    }
}

const styles = theme => ({
    fab: {
        margin: theme.spacing.unit * 1,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit * 1,
    },
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