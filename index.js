var fs = require('fs');

var data = fs.readFileSync('data.json');

var obj = JSON.parse(data);
//var name = obj.recipes.name;

const express = require('express');

const port = process.env.PORT || 3000;

//Setting up app and middlewares
const app = express();
const bodyParser = require('body-parser');
const { json } = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//const router = express.Router();


//GET all recipe data in base file
app.get('/', (req, res) => {
    res.send(obj);
    console.log("this is the recipe list on the homepage");
});

//GET recipe name list

app.get('/recipes', (req, res) => {
    // res.json({ok: true, });
    // console.log("recipe list");
    // Get all names of recipes
    const recipeNames = obj.recipes.name[i];
    for (var i = 0; i < recipeNames.length; i++) {

    }

    console.log(recipeNames);
    return res.send(recipeNames);

});


//GET specific recipe
app.get('/recipes/:name', (req, res) => {
    res.json({ name: obj[req.params.recipe.name] })
    console.log(recipe);

    //check if recipe exists
    if (!recipe) {
        console.log("No recipe by that name");
        return res.status(404).json({ error: "Recipe does not exists" });
    }

    //return res.json(recipe);
});

// function searchRecipe(req, res) {
//    var recipe = req.params.recipeList;
//    recipe = recipe.charAt(0).toUpperCase() 
//    + recipe.slice(1).toLowerCase();

//    if (recipeList[recipe]) {
//        var reply = recipeList[recipe];
//    }
//    else {
//        var reply = {
//            status: "Not Found"
//        }
//    }
//    res.send(reply);
// }

//POST new recipe
app.post('/addRecipe', (req, res) => {

    //check to see if recipe already exists
    if (data[req.body.name]) {
        return res.status(400).json({ error: "recipe already exists" })
    }

    //create recipe
    const recipe = {
        name: req.body.name,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions
    };
    data[req.body.name] = recipe;

    //return status of new recipe
    return res.status(201).json(recipe);
})

//local base port
app.listen(port, () => {
    console.log(`server is running on port: http://localhost:${port}`,)
});
