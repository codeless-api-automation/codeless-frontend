import React from 'react';

import {
    Grid,
    Paper
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    panel: {
        padding: theme.spacing(2),
        border: '1px solid #ddd',
        borderRadius: '4px',
        display: 'flex',
        flexDirection: 'column',
    },
    header: {
        marginBottom: theme.spacing(2),
        borderBottom: '1px solid #ccc',
        paddingBottom: theme.spacing(1),
    },
    customSpace: {
        marginBottom: theme.spacing(2),
        paddingBottom: theme.spacing(1),
    },
    valueContainer: {
        display: 'flex',
        alignItems: 'center',
        width: '100%', // stretch to fill all available space horizontally
    },
    value: {
        flex: 1, // make each value take up equal horizontal space
        marginRight: theme.spacing(2),
        paddingRight: theme.spacing(2),
        borderRight: '1px solid #ccc',
    }
}));

function Row({ rowIndex, itemsPerRow }) {
    const classes = useStyles();
    return (
        <div key={rowIndex} className={classes.valueContainer}>
            {
                itemsPerRow.map((item, itemIndex) => (
                    <Grid key={itemIndex} container direction="column" className={classes.value}>
                        <Grid item>
                            <Typography variant="body2" color="textSecondary">{item.name}</Typography>
                        </Grid>
                        {item.customValue ? item.customValue :
                            <Grid item>
                                <Typography variant="body2" color="textPrimary">{item.value}</Typography>
                            </Grid>
                        }
                    </Grid>
                ))
            }
        </div>
    );
}

function Metadata({ headerText, items, itemPerRow = 4 }) {
    const classes = useStyles();

    const chunkArray = (array, chunkSize) => {
        const chunks = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            chunks.push(array.slice(i, i + chunkSize));
        }
        return chunks;
    }

    let rows = chunkArray(items, itemPerRow)

    return (
        <Paper elevation={3} className={classes.panel}>
            <div className={classes.header}>
                <Typography style={{ fontWeight: 'medium' }}>
                    {headerText}
                </Typography>
            </div>
            {rows.map((rowItems, rowIndex) => {
                return (
                    <>
                        {rowIndex === 0 ? "" : <div className={classes.customSpace}></div>}
                        <Row rowIndex={rowIndex} itemsPerRow={rowItems} />
                    </>
                )
            })}
        </Paper>
    );
}

export default Metadata;