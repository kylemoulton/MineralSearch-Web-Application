const   express =       require('express'),
        mongoose =      require('mongoose'),
        bodyParser =    require('body-parser'),
        Mineral =       require('./models/Mineral');
        app =           express();

mongoose.connect(`mongodb://localhost:27017/mineraldat`);

app.use(bodyParser.json());

let mineralPropertyMap = {
    "Name": "name",
    "Class": "class",
    "HM - Symbol": "HMSymbol", 
    "Category": "category", 
    "Color": "color", 
    "Habit": "habit", 
    "Twinning": "twinning", 
    "Cleavage": "cleavage", 
    "Fracture": "fracture", 
    "Tenacity": "tenacity", 
    "Mohs Hardness": "mohs", 
    "Luster": "luster", 
    "Streak": "streak", 
    "Diaphaneity": "diaphaneity", 
    "Specific Gravity": "gravity", 
    "Refractive": "refractive", 
    "Birefringence": "birefringence", 
    "Pleochroism": "pleochroism", 
    "Dispersion": "dispersion", 
    "Solubility": "solubility", 
    "Fluorescence": "fluourescence", 
    "2v": "twoV",
    "Formula": "formula", 
    "Molar Mass": "molweight", 
    "Strunz": "strunz", 
    "Dana": "dana", 
    "Crystal System": "crystalSystem", 
    "Unit Cell": "unitCell", 
    "Symmetry": "symmetry", 
    "Optical Properties": "opticalprop"
};

let commonValues = {};
Mineral.find({"mohsLow": {"$lte": 1.0}}, (err, found) => {
    console.log(found);
    found.forEach(mineral => {
        Object.keys(mineral).forEach(category => {
            if (commonValues[category]) {
                if (commonValues[category].indexOf(mineral[category]) === -1)
                commonValues[category].push(mineral[category]);
            } else {
                commonValues[category] = [];
                commonValues[category].push(mineral[category]);
            }
        });
    });
});

console.log(commonValues);




app.post('/api/search/', async (req, res) => {
    let query = {};
    let searchParams = req.body;

    let searchCategories = Object.keys(searchParams);
    if (searchCategories.length > 1) {
        query = {
            "$and": []
        };
    }

    searchCategories.forEach(category => {
        let searchObject = {};
        let searchValue = searchParams[category];
        category = mineralPropertyMap[category];
        

        if (query["$and"]) {
            queryToAssign = query["$and"];
        }

        if (category === 'mohs') {
            searchObject = {
                "$and": [
                    {"mohsLow": {"$lte": parseFloat(searchValue)}},
                    {"mohsHigh": {"$gte": parseFloat(searchValue)}}
                ]
            };
        } else if (category === 'gravity') {
            searchObject = {
                "$and": [
                    {"gravityLow": {"$lte": parseFloat(searchValue)}},
                    {"gravityHigh": {"$gte": parseFloat(searchValue)}}
                ]
            };
        } else {
            searchObject[category] = {
                "$regex": searchValue,
                "$options": 'i' 
            }
        }
        if (searchCategories.length > 1) {
            query["$and"].push(searchObject);
        } else {
            query = searchObject;
        }
    });

    Mineral.find(query, (err, found) => {
        if (err) {
            console.log(err);
        } else {
            if (found && found.length > 0) {
                res.send(found);
            } else {
                res.send(`No records found using ${query}`);
            }
        }
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server Started');
});