import React, {useState, useEffect, useCallback} from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';

function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    console.log('RENDERING INGREDIENTS', userIngredients)
  }, [userIngredients])
  
  const addIngredientHandler = ingredient => {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_FIREBASE_URL}/ingredients.json`, {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json'}
    }).then(response => response.json())
    .then(responseData => {
      setIsLoading(false);
      setUserIngredients(prevIngredients => [
        ...prevIngredients,
        { id: responseData.name, ...ingredient}
      ]);
    })
  }

  const removeIngredientHandler = ingredientId => {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_FIREBASE_URL}/ingredients/${ingredientId}.json`, 
      {
        method: 'DELETE'
      }
    ).then(response => {
          setIsLoading(false);
          setUserIngredients(prevIngredients => 
            prevIngredients.filter(ing => ing.id !== ingredientId)
          )
    }).catch(err => {
      setError('Something went wrong');
    })
  }
  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    setUserIngredients(filteredIngredients)
  }, []);

  const clearError = () => {
    setError(null);
    setIsLoading(false);
  }
  return (
    <div className="App">
    {error && <ErrorModal onClose={clearError} >{error}</ErrorModal>}
      <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading}/>
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
