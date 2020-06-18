import React, {useState} from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList'

function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([]);

  const addIngredientHandler = ingredients => {
    setUserIngredients(prevIngredients => [
      ...prevIngredients,
      { id: Math.random().toString(), ...ingredients }
    ]);
  }

  const removeIngredientHandler = ingredientId => {
    setUserIngredients(prevIngredients => 
      prevIngredients.filter(ing => ing.id !== ingredientId)
    )
  }

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search />
       <IngredientList 
          ingredients={userIngredients} 
          onRemoveItem={removeIngredientHandler} />
      </section>
    </div>
  );
}

export default Ingredients;
