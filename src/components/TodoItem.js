import React, { useCallback, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Alert from '@material-ui/lab/Alert';

import Divider from '@material-ui/core/Divider';



import PropTypes from 'prop-types';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';

import TextField from '@material-ui/core/TextField';





function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      
      &nbsp;
              <Divider variant="inset"/>
      

      <form  noValidate autoComplete="off">
      <TextField  id="filled-basic" label="Edit ToDo" variant="filled" />
     
    </form>
    &nbsp;
              <Divider variant="inset"/>
    <Button  
      variant="contained"
      color="primary"
      endIcon={<AddIcon/>}
      type="submit"
      onClick={() => handleListItemClick(document.getElementById('filled-basic').value)}>
          
          Ok 
        </Button>
    </Dialog>
    
  );
  
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
  
};



/////////////////


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
    button: {
      margin: theme.spacing(1),
    },
  },
}));

const TodoItem = ({ todo, id, onRemoveTodo, onToggleTodoDone, onEditTodo, isDone, setCustomError }) => {
  const removeTodoHandler = useCallback(() => onRemoveTodo(id), [id, onRemoveTodo]);

  const toggleTodoDoneHandler = useCallback(() => onToggleTodoDone(id), [id, onToggleTodoDone]);

 
  const checkboxRef = useRef(null);

  const classes = useStyles();


  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(todo);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
    onEditTodo(id, value);
  };
  


  return (
    <div className={classes.root}>
       <List component="nav" aria-label="secondary mailbox folders">
        <ListItem button>
      
        <Checkbox
        ref={checkboxRef}
        checked={!!isDone}
        onChange={toggleTodoDoneHandler}
        //checked={checked}
        //onChange={handleChange}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
              <Divider orientation="vertical" flexItem />
              &nbsp; &nbsp; &nbsp;

              {<Alert variant="filled" severity={isDone ? "success":"error"}>{isDone ? "complétée":"Nom Complétée"}</Alert>}
              &nbsp; &nbsp; 
              <Divider orientation="vertical" flexItem />
              &nbsp; &nbsp; &nbsp;
 <span onClick={() => checkboxRef.current.click()}  />
          <ListItemText

style={{color: isDone ? 'green' : 'none'}}

          defaultValue={selectedValue} 
           primary={selectedValue} />

<Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Edit
      </Button>
      &nbsp; &nbsp;
      <Divider orientation="vertical" flexItem />
      &nbsp; &nbsp;
      <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
<Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<DeleteIcon />}
        onClick={removeTodoHandler}
      >
        Delete
      </Button>

      
        </ListItem>

        </List>
   
    </div>
  )
};

export default React.memo(TodoItem);