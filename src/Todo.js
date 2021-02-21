import React, { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

// COMPONENT
import TodoList from './components/TodoList';
import AddNewTodoForm from './components/AddNewTodoForm';

// HELPER
import { getTodoItemsFromLocalStorage, saveTodoItemsToLocalStorage } from './helpers';

// STYLE
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import LoginForm from './LoginForm';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));



const Todo = () => {

  const classes = useStyles();

  // Initialize todoItems state with the JSON string stored under todo key in localStorage, if it's falsy, use an empty array instead
  const [todoItems, setTodoItems] = useState(getTodoItemsFromLocalStorage('todo') || [])
  
  const [customError, setCustomError] = useState(null)

  // Event handler for adding new Todo, using useCallback to return a memoized callback.
  const addTodoHandler = useCallback(todo => {
    // Todo id should be unique and numeric >= 1, then the new Todo id should the biggest existing Todo id + 1
    let latestTodoItem = null
    if (todoItems.length === 1) {
      latestTodoItem = todoItems[0]
    }
    else if (todoItems.length > 1) {
      const todoItemsDescendingSortedById = todoItems.sort((a, b) => a.id > b.id)
      latestTodoItem = todoItemsDescendingSortedById[0]
    }
    
    // Add new Todo at the beginning of the array
    const newTodoItems = [
      {
        id: latestTodoItem ? latestTodoItem.id + 1 : 0,
        todo,
      },
      ...todoItems,
    ]

 

    // Update todoItems state
    setTodoItems(newTodoItems)

    // Save to localStorage
    saveTodoItemsToLocalStorage('todo', newTodoItems)
  }, [todoItems]) // Dependencies list for useCallback

  const removeTodoHandler = useCallback(id => {
    // Filter out the todoItem which is about to be removed
    const newTodoItems = todoItems.filter(todoItem => todoItem.id !== id)

    // Update todoItems state
    setTodoItems(newTodoItems)

    // Save to localStorage
    saveTodoItemsToLocalStorage('todo', newTodoItems)
  }, [todoItems])

  const toggleTodoDoneHandler = useCallback(id => {
    const todo = todoItems.find(todoItem => todoItem.id === id)
    todo.isDone = !todo.isDone

    // Update todoItems state
    setTodoItems([...todoItems])

    // Save to localStorage
    saveTodoItemsToLocalStorage('todo', todoItems)

  }, [todoItems])

  const editTodoHandler = useCallback((id, todo) => {
    const editingTodo = todoItems.find(todoItem => todoItem.id === id)
    editingTodo.todo = todo
    // Update todoItems state
    setTodoItems([...todoItems])

    // Save to localStorage
    saveTodoItemsToLocalStorage('todo', todoItems)
    
  }, [todoItems])



  //Login code//
  const adminUser={
    email:"sahbi@sahbi.com",
    password:"Sahbi123",
  }
  const[user,setUser]=useState({email:""});
  const[error,setError]=useState("");

  const Login=details=>{
    console.log(details);

    if(details.email==adminUser.email && details.password==adminUser.password)
      {
        console.log("Logged in");
      setUser({
        email:details.email,
      });
    }else{
      setError("Information de connection erroné")
    }
  }

  const Logout=()=>{
    setUser({email:""});
  }


  return (

    
    <div className={classes.root}>
{(user.email !="")?(
  <div>
<AppBar position="static">
      <Toolbar>
     
        <Typography variant="h6" className={classes.title}>
          ToDo List
        </Typography>
        <Button onClick={Logout} color="inherit">Deconnectée</Button>
      </Toolbar>
    </AppBar>
<br></br>
      <Paper elevation={3} >
     

      <TodoList
        todoItems={todoItems} // Passing down todoItems
        onRemoveTodo={removeTodoHandler} // Passing down removeTodoHandler
        onToggleTodoDone={toggleTodoDoneHandler} // Passing down toggleTodoDoneHandler
        onEditTodo={editTodoHandler} // Passing down editTodoHandler
        setCustomError={setCustomError} // Passing down setCustomError
      />


      </Paper>
      <Paper>
      <AddNewTodoForm
        customError={customError} // Passing down customError
        onAddTodo={addTodoHandler} // Passing down addTodoHandler
      />
      </Paper>
      </div>
      ):(
        <LoginForm Login={Login} error={error}/>
      )}
    </div>
  );
}

export default React.memo(Todo);
