const   mongoose =      require('mongoose'),
        Mineral =       require('./models/Mineral');
        CommonValues =   require('./models/CommonValues');

mongoose.connect(`mongodb://localhost:27017/mineraldat`);

async function catalogMinerals() {
    let commonValues = {};
    
    const minerals = await Mineral.find({});
    for (let mineral of minerals) {
        for (let key of Object.keys(mineral._doc)) {
            if (key !== '_id' && key !== '__v') {
                if (!commonValues[key]) {
                    commonValues[key] = [];
                    commonValues[key].push(mineral[key]);
                } else if (commonValues[key].indexOf(mineral[key]) === -1) {
                    commonValues[key].push(mineral[key]);
                }                
            }
        }
    }

    for (let category of Object.keys(commonValues)) {
        await CommonValues.create({
            category: category,
            values: commonValues[category]
        });
    }

    mongoose.disconnect()
}

catalogMinerals();