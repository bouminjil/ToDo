import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  root: {
    width: '100%',
    maxWidth: '100%',}
}));
const AddNewTodoForm = ({ onAddTodo, customError }) => {
  // Initialize a form instance with useFormik hook
  const formik = useFormik({
    // Disable validation onChange and onBlur for keeping validation errors less annoying
    validateOnChange: false,
    validateOnBlur: false,
    // Initial form values
    initialValues: {
      todo: '',
    },
    // Form values validation with Yup
    validationSchema: Yup
      .object()
      .shape({
        todo: Yup.string()
          .min(3, 'Todo text is too short.')
          .max(20, 'Todo text is too long.')
          .required('Todo text is required.')
        }
      ),
    onSubmit: (values, { resetForm }) => {
      onAddTodo(values.todo);

      
      resetForm();
    },
  })

 
  const errorKeys = Object.keys(formik.errors);

  const aFormikError = errorKeys.length > 0 ? formik.errors[errorKeys[0]] : null;

  const error = customError || aFormikError
  const classes = useStyles();

  return (
    <div className={classes.root}>
    <form onSubmit={formik.handleSubmit}>
    <FormControl>
        <InputLabel htmlFor="component-simple">what you want TO DO</InputLabel>
        <Input id="todo" value={formik.values.todo} onChange={formik.handleChange} />
      </FormControl>
  
 <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<AddIcon/>}
        type="submit"
      >
        Add
      </Button>
  
    </form>
    {error && <Alert variant="filled" severity="error">{error}</Alert>}
    
    </div>
  )
};

export default React.memo(AddNewTodoForm);