import React,{useEffect, useState} from "react";
import Recipe from "./Recipe";
import './App.css';

const App = ()=> {
  const APP_ID="76f82381";
  const APP_KEY="afe30546a21e6ca65c7f8f91f855452d";
  //const exampleReq=`https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=76f82381&app_key=%20afe30546a21e6ca65c7f8f91f855452d`

  const [recipes, setReceipes] =useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken")

  useEffect(()=>{
    getRecipes();
  },[query]);

  const getRecipes = async()=>{
    const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=76f82381&app_key=%20afe30546a21e6ca65c7f8f91f855452d`)
    const data = await response.json()
    setReceipes(data.hits);
    console.log(data.hits)
  }

  const updateChange = e =>{
    setSearch(e.target.value);
  }
  
  const getSearch = e =>{
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateChange}/>
        <button
        className="search-button" 
        type="submit">
          Search
          </button>
      </form>

      <div className="recipes">
      {recipes.map(recipe=>(
        <Recipe
        key={recipe.recipe.key}
        title={recipe.recipe.label}
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
      ))}
      </div>
    </div>
  );
};

export default App;
