import React from "react";
import PropTypes from "prop-types";
import { withStyles, CardActionArea } from "@material-ui/core";
import classNames from "classnames";

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import Rating from 'material-ui-rating';

class AppItem extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    appImage: PropTypes.string.isRequired,
    appTitle: PropTypes.string.isRequired,
    appMaker: PropTypes.string.isRequired,
    appRating: PropTypes.number.isRequired

  }
  render() {
    const { classes, appImage, appTitle, appMaker, appRating, onPress, appId, authenticated, onDelete } = this.props;
    return (

      <Card className={classes.card}>
        <CardActionArea onClick={() => {
          onPress(appId)
        }}>
          <CardMedia
            className={classes.cardMedia}
            image={appImage}
            title={appTitle}
          />
          <CardContent className={classes.cardContent}>
            <h4 style={{ margin: 0 }}>{appTitle}</h4>
            <p style={{ margin: 0, color: 'gray' }}>{appMaker}</p>
            <Rating
              value={appRating}
              max={5}
              readOnly
            />
            <br />
            {authenticated ? <Button style={{ color: 'red' }} onPress={() => onDelete(appId)} >Delete</Button> : null}
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}

const styles = theme => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  }
});

export default withStyles(styles)(AppItem);