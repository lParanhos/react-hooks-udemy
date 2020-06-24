import React, { useState } from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';
import LoadingIndicator from '../UI/LoadingIndicator';

const IngredientForm = React.memo(props => {

   /** 
   * Neste exemplo de uso do useState, trabalhamos com ele como um objeto,
   * o que deixa bem similar ao state de um class component
       ex:  const [inputState, setInputState] = useState({ title: '', amount: '' });
   */

  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredAmount, setEnteredAmount] = useState('');

  const submitHandler = event => {
    event.preventDefault();
    props.onAddIngredient({title: enteredTitle, amount: enteredAmount});
    // ...
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input 
              type="text" 
              id="title" 
              value={enteredTitle} 
              onChange={event => setEnteredTitle(event.target.value)
              /*   {
                //Como os eventos do react são simulados, precisamos criar uma const para que o React entenda o fim de cada evento,
                // por exemplo cada fez que digitamos algo nesse input
                const newTitle = event.target.value;
                //Ex: https://daveceddia.com/usestate-hook-examples/#:~:text=The%20useState%20hook%20lets%20you%20add%20state%20to%20function%20components.&text=In%20classes%2C%20the%20state%20was,a%20string%2C%20whatever%20you%20need.
                //Podemos pegar um state anterior para utilizar em nossa atualização
                setInputState(prevState =>  ({title: newTitle, amount: prevState.amount}))
              } */
            }
              />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input 
              type="number" 
              id="amount" 
              value={enteredAmount} 
              onChange={event => setEnteredAmount(event.target.value)
              /*   {
                const newAmount = event.target.value;
                setInputState(prevState => ({ amount: newAmount, title: prevState.title }))} */
              }
              />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
              {props.loading && <LoadingIndicator />}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
