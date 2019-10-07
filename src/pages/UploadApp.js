import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import Paper from '@material-ui/core/Paper';

import blue from '@material-ui/core/colors/blue';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import LockIcon from '@material-ui/icons/LockOutlined';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import LazyImage from '../components/LazyImage'
import Base64Helper from '../utils/Base64Helper';
import { Input } from '@material-ui/core';
class UploadApp extends Component {
    state = { base64: null }
    async save(e) {
        e.preventDefault()
        const { appStore } = this.props;
        try {
            await appStore.saveApp()
            alert("Upload completed!");
        } catch (e) {
            if (e && e.message)
                alert(e.message)
            else {
                alert("Error occured while uploading app, please check your network connecttion");
            }
        }

    }
    async preview(e) {
        const { appStore } = this.props;
        let file = e.target.files.item(0)
        let base64 = await Base64Helper.readBase64(file)
        this.setState({ base64 })
        appStore.setImageUri(file)
    }

    pickImage() {
        this.ref.click()
    }
    render() {
        const { classes, appStore } = this.props;
        return (
            <main className={classes.layout} style={{ marginTop: 100 }}>
                <Paper className={classes.paper}>
                    {/* <Avatar className={classes.avatar}>
                        <LockIcon />
                    </Avatar> */}
                    <Typography style={{ display: 'inline-block' }} component="h1" variant="h5">
                        Upload Application
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Fill in the details of your app
                    </Typography>
                    <form onSubmit={this.save.bind(this)} className={classes.form}>
                        <Grid container spacing={24}>

                            {<FormControl onClick={this.pickImage.bind(this)} margin="normal" required style={{ display: 'flex', margin: 'auto', marginTop: '10px', borderRadius: '10px' }}>
                                <LazyImage src={this.state.base64} placeholder='images/weebly_image_sample.png' style={{ borderRadius: '5px', width: '100%', height: '300px' }} className='toachable-opacity' />
                                <input accept="image/*" onChange={this.preview.bind(this)} ref={(ref) => { this.ref = ref; }} type="file" style={{ display: 'none' }} name="image" />
                            </FormControl>}

                            <Grid item xs={12} sm={12}>
                                <TextField
                                    onChange={(e) => {
                                        appStore.setAppName(e.target.value)
                                    }}
                                    value={appStore.appName}
                                    required
                                    name="fullname"
                                    label="Full Name"
                                    fullWidth
                                    autoComplete="fullname"
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    onChange={(e) => {
                                        appStore.setAppDescription(e.target.value)
                                    }}
                                    multiline
                                    rows="4"
                                    value={appStore.appDescription}
                                    required
                                    name="description"
                                    label="App Description"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    id="outlined-select-currency-native"
                                    select
                                    label="Device Type"
                                    style={{ width: '100%' }}
                                    value={appStore.deviceType}
                                    onChange={(event) => {
                                        appStore.setDeviceType(event.target.value)
                                    }}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    helperText="Please select your target device"
                                    margin="normal"
                                    variant="outlined"
                                >

                                    <option key={'android'} value={'android'}>
                                        Android
                                    </option>
                                    <option key={'ios'} value={'ios'}>
                                        iPhone
                                    </option>
                                    <option key={'windows'} value={'windows'}>
                                        Windows
                                    </option>
                                </TextField>
                            </Grid>

                            <Grid item xs={12} sm={12}>
                                <input accept=".apk" onChange={(e)=>{
                                    let file = e.target.files.item(0)
                                    appStore.setFile(file);
                                }} ref={(ref) => { this.fileRef = ref; }} type="file" style={{ display: 'none' }} name="file" />
                                <FormControl margin="normal" required fullWidth>
                                    <Button
                                        
                                        type="button"
                                        fullWidth
                                        variant="contained"
                                        onClick={() => {
                                            this.fileRef.click();
                                        }}
                                    >Pick App</Button>
                                </FormControl>
                            </Grid>

                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <FormControl margin="normal" required fullWidth>
                                <Button
                                    disabled={appStore.loading || appStore.detailsValid}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={this.save.bind(this)}
                                >Register {appStore.loading && <CircularProgress size={24} className={classes.buttonProgress} />}</Button>
                            </FormControl>
                        </Grid>
                    </form>
                </Paper>
            </main>
        );
    }
}
UploadApp.propTypes = {
    classes: PropTypes.object.isRequired,
    appStore: PropTypes.object.isRequired
};
const styles = theme => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginTop: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3,
        padding: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
            marginTop: theme.spacing.unit * 6,
            marginBottom: theme.spacing.unit * 6,
            padding: theme.spacing.unit * 3,
        },
    },
    stepper: {
        padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit,
    },
    avatar: {
        display: 'flex',
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    buttonProgress: {
        color: blue[900],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
});
export default withStyles(styles)(
    inject('appStore', 'appStore')(
        observer(UploadApp)
    )
);