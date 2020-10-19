/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

import './InfoBox.css';

function InfoBox({ title, cases, total, onClick }) {
  return (
    <Card className="infoBox" onClick={onClick}>
      <CardContent>
        {/* Title i.e. Coronavirus cases */}
        <Typography className="infoBox__title" color="textSecondary">
          {title}
        </Typography>
        {/* New cases i.e. +120K */}
        <h2 className="infoBox__cases">{cases}</h2>
        {/* Total i.e. 1.2M */}
        <Typography className="infoBox__total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
