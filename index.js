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
    //return res.send(recipeNames);

});


//GET specific recipe
app.get('/recipes/details/:name', (req, res) => {
    if (req.params.name) {
        console.log(req.params.name);
        const recipeName = req.params.name;
        const currRecipe = recipes.recipes.filter(recipe => recipe.name === recipeName);
        console.log("55", currRecipe);
        res.json(currRecipe)
    } else {
        res.status(400).send('Recipe name not provided')
    }
});

app.get('/recipes/details/:tags', (req, res) => {
    if (req.params.tags) {
        console.log(req.params.tags);
        const recipeTag = req.params.tags;
        const currRecipe = recipes.recipes.filter(recipe => recipe.tags === recipeTag);
        console.log("55", currRecipe);
        res.json(currRecipe)
    } else {
        res.status(400).send('Recipe tag not provided')
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

        //access to update json file
        readAndAppend(newRecipe, './data.json');
        console.log("97 ", response);
        res.status(201).json("recipe added");
    } else {
        res.status(500).json('Error in posting recipe')
    }
})

//Update recipe
app.put('recipes', (req, res) => {
    console.log(req.body);

    //find recipe name and update it

})

//local base port
app.listen(port, () => {
    console.log(`server is running on port: http://localhost:${port}`,)
});
