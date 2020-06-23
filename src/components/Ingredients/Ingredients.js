import React, {useState, useEffect, useCallback} from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList'

function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([]);
  
  useEffect(() => {
    console.log('RENDERING INGREDIENTS', userIngredients)
  }, [userIngredients])
  
  const addIngredientHandler = ingredient => {
    fetch(`${process.env.REACT_APP_FIREBASE_URL}/ingredients.json`, {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json'}
    }).then(response => response.json())
    .then(responseData => {
      setUserIngredients(prevIngredients => [
        ...prevIngredients,
        { id: responseData.name, ...ingredient}
      ]);
    })
  }

  const removeIngredientHandler = ingredientId => {
    fetch(`${process.env.REACT_APP_FIREBASE_URL}/ingredients/${ingredientId}.json`, 
    {
      method: 'DELETE'
    }
    )
        .then(response => {
          setUserIngredients(prevIngredients => 
            prevIngredients.filter(ing => ing.id !== ingredientId)
          )
        }); 
  }

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    setUserIngredients(filteredIngredients)
  }, []);

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
       <IngredientList 
          ingredients={userIngredients} 
          onRemoveItem={removeIngredientHandler} />
      </section>
    </div>
  );
}

export default Ingredients;
