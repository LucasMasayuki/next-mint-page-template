import { Grid, Paper, Toolbar, Typography } from '@mui/material';
import React from 'react';
import styles from '../../styles/footer.module.css';

import packageJSON from '../../package.json';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <Paper sx={{ padding: 1 }}>
        <Toolbar disableGutters>
          <Grid container>
            <Grid item xs={12} textAlign="center">
              <Typography variant="subtitle2" fontWeight="bold">
                Version {packageJSON.version}
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </Paper>
    </footer>
  );
};

export default Footer;
