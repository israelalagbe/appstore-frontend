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
import Rating from 'material-ui-rating';
import SaveIcon from '@material-ui/icons/Save';
class AppDetail extends Component {
    async componentWillMount() {
        const { classes, authStore, appStore } = this.props;
        const appId = Number(this.props.match.params.appId);
        try {
            await appStore.getApp(appId);
        }
        catch{
            alert("Error occured while fetching app detail ")
        }
    }
    render() {
        const { classes, authStore, appStore } = this.props;
        const app = appStore.app;
        if (!appStore.app || appStore.loading) {
            return (
                <main>
                    <div className={classNames(classes.layout, classes.cardGrid)}>
                        {appStore.loading ? (<CircularProgress style={{ position: 'absolute', top: '50%', left: '50%' }} />) : null}
                    </div>
                </main>
            );
        }
        return (<main>
            <div className={classNames(classes.layout, classes.cardGrid)}>
                <Card className={classes.card}>

                    <Grid container spacing={8}>
                        <Grid item key={'picture'} xs={12} sm={6} md={6} lg={6}>
                            <CardMedia
                                className={classes.cardMedia}
                                image={app.image}
                                title={app.name}
                            />
                        </Grid>
                        <Grid item key={'picture'} xs={12} sm={6} md={6} lg={6}>
                            <CardContent className={classes.cardContent}>
                                <h4 style={{ margin: '5px' }}>{app.name}</h4>
                                <p style={{ margin: '5px', color: 'gray' }}>{app.description}</p>
                                <p style={{ margin: '5px', color: 'gray' }}>JUmanji studio</p>
                                <p style={{ margin: '5px', color: 'black' }}>Downloads: {app.downloads}</p>
                                <Rating
                                    value={app.rating}
                                    max={5}
                                    readOnly
                                    style={{ marginTop: '10px' }}
                                />
                                <Button size="large" variant="contained" color="primary" className={classes.button} onClick={()=>{
                                    window.location = "http://appstore.successfarm.com.ng/download/"+app.id;
                                }}>
                                    <SaveIcon className={classes.leftIcon}></SaveIcon>
                                    Download

                                </Button>
                            </CardContent>
                        </Grid>
                    </Grid>
                    {/* <CardContent className={classes.cardContent}>
                    </CardContent> */}
                </Card>
            </div>
        </main>);
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
    leftIcon: {
        marginRight: '10px',
    },
    heroButtons: {
        marginTop: theme.spacing.unit * 4,
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
    },
    cardGrid: {
        padding: `${theme.spacing.unit * 8}px 0`,
    },
    card: {
        padding: '20px',
        height: '90vh',
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
        height: '200px'
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing.unit * 6,
    },
    button:{
        marginTop:'10px'
    }
});

AppDetail.propTypes = {
    classes: PropTypes.object.isRequired,
    authStore: PropTypes.object.isRequired
};
export default withStyles(styles)(
    inject('authStore', 'appStore')(
        observer(AppDetail)
    )
);