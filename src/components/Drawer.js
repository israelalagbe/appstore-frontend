import React, { Component } from "react";
import Drawer from '@material-ui/core/Drawer';

export class ResponsiveDrawer extends Component {

    render() {
        return (<Drawer open={true} onClose={()=>{alert("On close")}}>
        <h4>Hello from drawer</h4>
      </Drawer>);
    }
}