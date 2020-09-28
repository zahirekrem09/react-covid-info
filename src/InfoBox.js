import { Card,CardContent,Typography } from '@material-ui/core'
import React from 'react'

const InfoBox = ({title,cases,total}) => {
    return (
        <div>
            <Card className = "infoBox">
                <CardContent>
                    {/* title */}
                    <Typography className = "infoBox__title" color="textSecondary">
                    {title}
                    </Typography>
                    {/* cases +120k */}
                    <h2 className = "infoBox__cases">{cases}</h2>
                    {/* total  1.2M*/}
                    <Typography className = "infoBox__total" color="textSecondary">
                    {total} Total
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default InfoBox
