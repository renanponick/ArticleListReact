import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, 
          Tooltip, 
          IconButton, 
          Checkbox, 
          Button, 
          Paper, 
          Typography, 
          Toolbar, 
          TableRow, 
          TableHead,
          TableContainer,
          TableCell,
          Table,
          TableBody
  } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

export default function ListReact() {
  const classes = useStyles();
  var [ buttonVisible, setButtonVisible ] = useState(true);
  var [ itemModify, setItemModify ] = useState([]);
  const [ lista, setLista ] = useState([]);
  const [ selected, setSelected ] = useState([]);
 
  const criarTarefa = () => {
    var inputTela = document.getElementById("inputTarefa");
    if(inputTela.value.length > 0){
      var newLista = {id:lista.length,name:inputTela.value};
      setLista(lista => [...lista, newLista]);
      inputTela.value = "";
    }else{
      alert('Preencha corretamente a tarefa')
    }
  }

  const btnEditarTarefa = (event, item) => {
    document.getElementById("inputTarefa").value = item.name;
    setButtonVisible(false);
    setItemModify(item);
  }

  const alterarTarefa = (event) => {
    var inputTela = document.getElementById("inputTarefa");
    if(inputTela.value.length > 0){
      console.log(itemModify)
      lista[itemModify.id].name = inputTela.value;
      setButtonVisible(true);
      setItemModify();
      document.getElementById("inputTarefa").value="";
    }
  }

  const deleteItem = (event, item) => {
    lista.splice(lista.indexOf(item),1);
  }

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <div className={classes.root}>
      <Toolbar>
        <Typography className='flex: 1 1 100%' variant="h6" id="tableTitle" component="div">
          Welcome to List in React
        </Typography>
      </Toolbar>

      <Paper className={classes.paper}>
        <TextField id="inputTarefa" label="Digite a Tarefa..." variant="outlined"/>
        {
        buttonVisible?(
          <Button 
            id="btCadastrar"
            className={classes.button} 
            variant="contained" 
            color="primary"
            onClick={() => criarTarefa()}
          >
            Adicionar
          </Button>
          ):(
          <Button 
            id="btAlterar"
            className={classes.button} 
            variant="contained" 
            color="secondary"
            onClick={(event) => alterarTarefa(event)}
            hidden
            endIcon={<EditIcon />}
          >
            Alterar
          </Button>
          )
        }
      </Paper>

      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size='small'
            aria-label="enhanced table"
          >
            <TableHead>
              <TableRow>
                <TableCell 
                  align='center'
                  padding='none'
                >
                  #
                </TableCell>
                <TableCell
                  key='name'
                  align='left'
                  padding='none'
                >
                  Tarefa
                </TableCell>
                <TableCell
                  key='actions'
                  align='center'
                  padding='none'
                >
                    Ações
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { lista.map((item, index) => {
                  const isItemSelected = isSelected(lista.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, item.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={item.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell id={labelId} scope="row" padding="none">
                        {item.name}
                      </TableCell>

                      <TableCell align="right">

                        <Tooltip title="Update">
                          <IconButton 
                            onClick={(event) => btnEditarTarefa(event, item)}
                            aria-label="update"
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete">
                          <IconButton 
                            onClick={(event) => deleteItem(event, item)}
                            aria-label="delete">
                            <DeleteIcon/>
                          </IconButton>
                        </Tooltip>

                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}


const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0 auto',
    width: '70%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(5),
    padding: theme.spacing(3),
  },
  table: {
    minWidth: '100%',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  button:{
    marginLeft: '15px',
    marginTop: '10px',
  }
}));
