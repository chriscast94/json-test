var fs = require('fs');

var data = fs.readFileSync('data.json');

var recipes = JSON.parse(data);

const express = require('express');

const port = process.env.PORT || 3000;

const {
    readFromFile,
    readAndAppend,
    writeToFile,
} = require('./utils');

//Setting up app and middlewares
const app = express();
const bodyParser = require('body-parser');
const { json } = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//const router = express.Router();


//GET all recipe data in base file
app.get('/', (req, res) => {
    res.json(recipes);
    console.log("this is the recipe list on the homepage");
});

//GET recipe name list

app.get('/recipes', (req, res) => {
    // Get all names of recipes
    const recipeNames = recipes.recipes.map(recipe => recipe.name);
    // send recipeNames as JSON
    res.json({ recipeNames: recipeNames })

    console.log(recipeNames);
    return res.send(recipeNames);

});


//GET specific recipe
app.get('/recipes/details/:name', (req, res) => {
    const allRecipes = recipes.recipes.map(recipe => recipe);
    res.json({ allRecipes: allRecipes })
    console.log("all recipes");

    if (req.params.name) {
        console.log(req.params.name);
        const recipeName = req.params.name;
        for (let i = 0; i < allRecipes.length; i++) {
            const currRecipe = recipeName[i];
            console.log(currRecipe);
            if (currRecipe.name === recipeName) {
                res.json(currRecipe);
                return
            }
        }
        res.status(404).send('Recipe not found');
    } else {
        res.status(400).send("Recipe name not provided");
    }
});


//POST new recipe
app.post('/recipes', (req, res) => {
    console.log("79 ", req.body)

    console.info(`${req.method} request received to add new recipe`)

    if (req.body) {
        const newRecipe = {
            name: req.body.name,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions
        };

        console.log("90 ", newRecipe)
        const response = {
            status: 'success',
            body: newRecipe
        };

        readAndAppend(newRecipe, './data.json');
        console.log("97 ", response);
        res.status(201).json("recipe added");
    } else {
        res.status(500).json('Error in posting recipe')
    }
})

//local base port
app.listen(port, () => {
    console.log(`server is running on port: http://localhost:${port}`,)
});
