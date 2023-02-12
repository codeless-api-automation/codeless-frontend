import React from "react";
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

import OverflowTip from 'components/OverflowTip/OverflowTip';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import * as componentsPaths from "constants/ComponentsPaths.js";

import { CheckCircleOutline } from '@material-ui/icons';

import {
  saveTest,
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

function DndTable(props) {

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    console.log(`dragEnd ${result.source.index} to  ${result.destination.index}`)
    const reorderedItems = reorder(
      props.items,
      result.source.index,
      result.destination.index
    )

    props.updateItems(reorderedItems)
  }

  const handleAddHttpRequest = () => {
    props.addHttpRequest()
  }

  return (
    <Paper elevation={3}>
      <Grid>
        <Row container style={{ padding: 10 }}>
          <RowItem item xs>
            <Typography variant="body1">HTTP requests</Typography>
          </RowItem>
          <RowItem item>
            <Button
              onClick={handleAddHttpRequest}
              size="small"
              variant="outlined">Add HTTP request</Button>
          </RowItem>
        </Row>
      </Grid>

      <Typography style={{ padding: 10 }} variant="overline">
        Add your HTTP requests as steps. Drag and drop to change order.
      </Typography>
      <TableContainer>
        <Table style={{ borderTop: '1px solid rgb(224, 224, 224)', tableLayout: 'fixed' }}>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: '10%' }}>Call Order</TableCell>
              <TableCell style={{ width: '30%' }}>Step name</TableCell>
              <TableCell style={{ width: '5%' }}>Method</TableCell>
              <TableCell style={{ width: '40%' }}>Endpoint</TableCell>
            </TableRow>
          </TableHead>
          <TableBody component={DroppableComponent(onDragEnd)}>
            {props.items.length === 0 ?
              <TableRow style={{ height: 53 * 6 }}>
                {/* TODO: add overlay when there are no tests */}
              </TableRow>
              :
              props.items.map((item, index) => (
                <TableRow component={DraggableComponent(item.name + item.httpMethod + item.requestURL, index)} key={index} >
                  <TableCell scope="row">{index + 1}</TableCell>
                  <TableCell>
                    <OverflowTip originalValue={item.name} />
                  </TableCell>
                  <TableCell>{item.httpMethod}</TableCell>
                  <TableCell>
                    <OverflowTip originalValue={item.requestURL} />
                  </TableCell>
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

function Test({ saveTest, httpCallResult, location }) {

  const [test, setTest] = React.useState(
    location.state === undefined ?
      {
        name: "",
        requests: []
      }
      :
      {
        id: location.state.id,
        name: location.state.name,
        requests: location.state.json
      }
  );

  const [openAddHttpRequest, setOpenAddHttpRequest] = React.useState(false);

  const history = useHistory();

  const addNewHttpRequest = () => {
    setOpenAddHttpRequest(true)
  }

  console.log(location.state);
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
                    onBlur: event => setTest({
                      ...test,
                      name: event.target.value
                    })
                  }}
                />
              </Paper>
            </RowItem>
          </Row>

          <Row container>
            <RowItem item xs>
              <DndTable
                items={test.requests}
                updateItems={(items) => {
                  setTest({
                    ...test,
                    requests: items
                  })
                }}
                addHttpRequest={addNewHttpRequest}
              />
            </RowItem>
          </Row>

          <Row container justifyContent="flex-end">
            <RowItem>
              <Button
                variant="contained"
                color="primary"
                disabled={httpCallResult.isCallRequested}
                onClick={() => saveTest(test, () => history.push(componentsPaths.VIEW_CANARY_TESTS))}
                startIcon={<CheckCircleOutline fontSize="inherit" />}
              >
                save
              </Button>
            </RowItem>
          </Row>
        </Grid>

      </GridItem>
      <AddHttpRequestDialog
        open={openAddHttpRequest}
        setOpen={(isOpened) => setOpenAddHttpRequest(isOpened)}
        addHttpRequest={(httpRequest) => {
          let newRequests = test.requests.concat(httpRequest);
          setTest({
            ...test,
            requests: newRequests
          })
        }}
      />
    </GridContainer>
  );
}

const mapStateToProps = state => ({
  httpCallResult: state.httpCallResult,
});
export default connect(mapStateToProps, { saveTest })(Test);