require('dotenv').config();
const mongoose = require('mongoose')
const { Schema } = mongoose

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
})

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  const eduardo = new Person({
    name: 'Eduardo',
    age: 31,
    favoriteFoods: ['Arroz', 'Feijão', 'Salada']
  })
  eduardo.save((err, data) => {
    if (err){
      return console.error(err)
    }
    done(null, data);
  })
}

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return console.error(err)
    done(null, data);
  })
  
};

const findPeopleByName = (personName, done) => {
  Person.find({name:personName}, (err, data) => {
    if (err) return console.error(err)
    done(null, data);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods:food}, (err, data) => {
    if (err) return console.error(err)
    done(null, data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById({_id:personId}, (err, data) => {
    if (err) return console.error(err)
    done(null, data);
  })
};

const findEditThenSave = (personId, done) => {
  Person.findById({_id:personId}, (err, data) => {
    if (err) return console.error(err)
    const foodToAdd = "hamburger";
    data.favoriteFoods.push(foodToAdd)
    data.save((err, data) => {
      done(null, data);
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name:personName}, {age:ageToSet}, {new:true}, (err, data) => {
    if (err) return console.error(err)
    done(null, data);
  })

};

const removeById = (personId, done) => {
  Person.findOneAndRemove({_id:personId}, (err, data) => {
    done(null, data);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({name:nameToRemove}, (err, data) => {
    done(null, data);
  })

};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods:foodToSearch}).sort({name:'asc'}).limit(2).select('name favoriteFoods').exec((err, data) => {
    done(null, data);
  })

};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
