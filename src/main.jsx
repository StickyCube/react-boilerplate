import React from 'react';
import ReactDOM from 'react-dom';
import styled, { createGlobalStyle } from 'styled-components';

const StyleSheet = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body, #app {
    height: 100%;
    margin: 0px;
    padding: 0px;
  }

  body {
    padding: 20px 10px;
  }
`;

const ListItem = styled.li``;

const List = styled.ul`
  ${ListItem} + ${ListItem} {
    margin-top: 5px;
  }
`;

const Icon = styled.div`
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  color: red;
  margin-left: 10px;
  text-align: center;
  cursor: pointer;
`;

const Button = styled.button`
  transition: background-color 100ms ease;
  padding: 3px 5px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.15);

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const Input = styled.input`
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  padding: 3px 5px;

  + ${Button} {
    margin-left: 10px;
  }
`;

function App() {
  const {
    addTodo, removeTodo, onChange, state: { todos, text },
  } = useTodoState();

  return (
    <>
      <StyleSheet />

      <Input value={text} onChange={onChange} />

      <Button type="button" disabled={!text} onClick={addTodo}>Add todo</Button>

      <List>
        {todos.map((todo, i) => (
          <ListItem key={todo}>
            {todo}
            <Icon type="button" onClick={() => removeTodo(i)}>X</Icon>
          </ListItem>
        ))}
      </List>
    </>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);

function useTodoState() {
  const [state, dispatch] = React.useReducer((state, action) => {
    switch (action.type) {
      case 'ADD_TODO':
        return {
          ...state,
          text: '',
          todos: [...state.todos, state.text],
        };

      case 'REMOVE_TODO':
        return {
          ...state,
          todos: [
            ...state.todos.slice(0, action.payload),
            ...state.todos.slice(action.payload + 1),
          ],
        };

      case 'TEXT_CHANGE':
        return {
          ...state,
          text: action.payload,
        };

      default:
        return state;
    }
  }, { todos: [], text: '' });

  const addTodo = () => dispatch({
    type: 'ADD_TODO',
  });

  const onChange = event => dispatch({
    type: 'TEXT_CHANGE',
    payload: event.target.value,
  });

  const removeTodo = index => dispatch({
    type: 'REMOVE_TODO',
    payload: index,
  });

  return {
    state,
    addTodo,
    onChange,
    removeTodo,
  };
}
