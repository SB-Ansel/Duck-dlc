import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

function Footer() {
  return (
    <div>
      <Alert variant="filled" severity="error">
          Alert - is a pre-alpha build!
        </Alert>
    </div>
  );
}

export default Footer;