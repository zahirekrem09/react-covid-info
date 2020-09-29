import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import "./InfoBox.css";

const InfoBox = ({ isRed,active,title, cases, total,...props }) => {
  return (
    <div>
      <Card className={`infoBox ${active && "infoBox--selected"} ${
        isRed && "infoBox--red"
      }`}onClick = {props.onClick}>
        <CardContent>
          {/* title */}
          <Typography className="infoBox__title" color="textSecondary">
            {title}
          </Typography>
          {/* cases +120k */}
          <h2 className="infoBox__cases">{cases}</h2>
          {/* total  1.2M*/}
          <Typography className="infoBox__total" color="textSecondary">
            {total} Total
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default InfoBox;
