import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { createStyles, withStyles } from "@material-ui/core/styles";
import {
  Grid,
  TextField,
  Button,
  Typography
} from '@material-ui/core';

import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper
} from '@material-ui/core'

import {
  DragDropContext,
  Droppable,
  Draggable
} from "react-beautiful-dnd"

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import * as componentsPaths from "constants/ComponentsPaths.js";

import { CheckCircleOutline } from '@material-ui/icons';

import {
  saveTest,
  updateName
} from "../../store/test-action.js"

import AddHttpRequestDialog from './AddHttpRequestDialog';

const getItemStyle = (isDragging, draggableStyle) => ({
  // styles we need to apply on draggables
  ...draggableStyle,

  ...(isDragging && {
    background: "rgb(235,235,235)"
  })
})

const DroppableComponent = (onDragEnd) => (props) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={'1'} direction="vertical">
        {(provided) => {
          return (
            <TableBody ref={provided.innerRef} {...provided.droppableProps} {...props}>
              {props.children}
              {provided.placeholder}
            </TableBody>
          )
        }}
      </Droppable>
    </DragDropContext>
  )
}

const DraggableComponent = (id, index) => (props) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <TableRow
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}

          {...props}
        >
          {props.children}
        </TableRow>
      )}
    </Draggable>
  )
}

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

function DndTable() {

  const [items, setItems] = React.useState([]);

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    console.log(`dragEnd ${result.source.index} to  ${result.destination.index}`)
    const items = reorder(
      items,
      result.source.index,
      result.destination.index
    )

    setItems(items)
  }

  return (
    <Paper elevation={3}>
      <Grid>
        <Row container style={{ padding: 10 }}>
          <RowItem item xs>
            <Typography variant="body1">HTTP requests</Typography>
          </RowItem>
          <RowItem item>
            <Button size="small" variant="outlined">Add HTTP request</Button>
          </RowItem>
        </Row>
      </Grid>

      <Typography style={{ padding: 10 }} variant="overline">
        Add your HTTP requests as steps. Drag and drop to change order.
      </Typography>
      <TableContainer>
        <Table style={{ borderTop: '1px solid rgb(224, 224, 224)' }}>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: '10%' }}>Call Order</TableCell>
              <TableCell style={{ width: '30%' }} >Step name</TableCell>
              <TableCell style={{ width: '5%' }} >Method</TableCell>
              <TableCell style={{ width: '40%' }}>Endpoint</TableCell>
            </TableRow>
          </TableHead>
          <TableBody component={DroppableComponent(onDragEnd)}>
            {items.length === 0 ?
              <TableRow style={{ height: 53 * 6 }}>
                {/* TODO: add overlay when there are no tests */}
              </TableRow>
              :
              items.map((item, index) => (
                <TableRow component={DraggableComponent(item.id, index)} key={item.id} >
                  <TableCell scope="row">{index + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.endpoint}</TableCell>
                  <TableCell>{item.method}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

const Row = withStyles(() =>
  createStyles({
    root: {
      margin: "5px 0px",
      flexDirection: "row"
    }
  })
)(Grid);

const RowItem = withStyles(() =>
  createStyles({
    root: {
      margin: "1px"
    }
  })
)(Grid);

function Test({ test, updateName, saveTest, httpCallResult }) {

  const history = useHistory();

  // useEffect(() => {
  //   return () => cleanAllTestAttributes()
  // }, [cleanAllTestAttributes])

  return (
    <GridContainer>

      <GridItem xs={12}>
        <Grid container>
          <Row container>
            <RowItem item xs>
              <Paper elevation={3}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth={true}
                  inputProps={{
                    defaultValue: test.name,
                    onBlur: event => updateName(event.target.value)
                  }}
                />
              </Paper>
            </RowItem>
          </Row>

          <Row container>
            <RowItem item xs>
              <DndTable />
            </RowItem>
          </Row>

          <Row container justifyContent="flex-end">
            <RowItem>
              <Button
                variant="contained"
                color="primary"
                disabled={httpCallResult.isCallRequested}
                onClick={() => saveTest(null, () => history.push(componentsPaths.VIEW_CANARY_TESTS))}
                startIcon={<CheckCircleOutline fontSize="inherit" />}
              >
                save
              </Button>
            </RowItem>
          </Row>
        </Grid>

      </GridItem>
      <AddHttpRequestDialog/>
    </GridContainer>
  );
}

const mapStateToProps = state => ({
  test: state.testPage,
  httpCallResult: state.httpCallResult,
});
export default connect(mapStateToProps, { updateName, saveTest })(Test);