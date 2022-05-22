var fs = require('fs');

var data = fs.readFileSync('data.json');

var obj = JSON.parse(data);

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
    // Get all names of recipes
    const recipeNames = obj.recipes.map(recipe => recipe.name);
    // send recipeNames as JSON
    res.json({ recipeNames: recipeNames })

    console.log(recipeNames);
    return res.send(recipeNames);

});


//GET specific recipe
app.get('/recipes/details/:name', (req, res) => {
    //need to filter through json, not javascript
    // console.log("line 44");
    //const writRecipe = obj.recipes.filter(recipe => recipe.name);
    //res.json({ writeRecipe: writRecipe });
    // console.log("47", recipeName);

    if (obj.recipes.filter(recipe => recipe.name)) {
        const recipeName = obj.recipes.filter(recipe => recipe.name);
        res.json({ recipeName: recipeName });
        console.log("52", recipeName);
        for (let i = 0; i < recipeName.length; i++) {
            const currentRecipe = obj[i];
            //res.json({ currentRecipe: currentRecipe });
            console.log("Current Recipe", currentRecipe);
            if (currentRecipe === recipeName) {
                //res.json(currentRecipe);
                console.log(currentRecipe);
                return;
            }
            res.status(404).json({ error: "recipe not found" });
        }
    } else {
        res.status(400).send("Recipe name not given")
    }


    //const recipeName = req.params.name;
    // console.log(recipeName)
    // readFromFile('data.json')
    // .then((data) => JSON.parse(data))
    // .then((json) => {
    //     const result = json.filter((recipes) => recipes.name === recipe);
    //     return result.length > 0
    //     ? res.json(result)
    //     : res.status(404).json({error: "Recipe does not exist"});

    // })

    // res.json({ name: obj[req.params.recipe.name] })
    // console.log(recipe);

    // //check if recipe exists
    // if (!recipe) {
    //     console.log("No recipe by that name");
    //     return res.status(404).json({ error: "Recipe does not exists" });
    // }

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
