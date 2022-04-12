var db = require( '../mongoUtil.js' ).getDb();
const usersCol = db.collection('users')
var ObjectID = require('mongodb').ObjectID;

const Manager = {
    add:  user => {
        usersCol.insertOne(user, function(err, res) {
            if (err) throw err;
            return true});
    },
    login: (email,password) =>{
        return new Promise(function(resolve, reject) {   
            usersCol.findOne({email:email,password:password}, function(err, result) {
                if (err) {
                    reject(err);
                    throw err;
                };
                resolve(result);
              });
          });

    },
    update:  (_id, user) => {
        return new Promise(function(resolve, reject) {   
            usersCol.updateOne({_id: _id}, {$set:user},
            function(err, res) {
                if (err) {
                    reject(err);
                    throw err;
                };
                resolve(true);
            });
        });
    },
    club_add:  (_id,club) => {
        return new Promise(function(resolve, reject) {   
            usersCol.updateOne({_id:_id},
            {$push:{clubs:club}}, 
            function(err, res) {
                if (err) {
                    reject(err);
                    throw err;
                };
                resolve(true);
            });
        });
    },
    club_check:  (_id,club) => {
        return new Promise(function(resolve, reject) {   
            usersCol.findOne({_id:_id, clubs:club},
            function(err, res) {
                if (err) {
                    reject(err);
                    throw err;
                };
                resolve(res);
            });
        });
    },
    get_data:  _id => {
        console.log({_id:_id})
        return new Promise(function(resolve, reject) {   
            usersCol.findOne({_id:_id},
            function(err, res) {
                if (err) {
                    reject(err);
                    throw err;
                };
                console.log(res)
                resolve(res);
            });
        });
    },
    get_all: ()=>{
        return new Promise(function(resolve, reject) {   
            usersCol.aggregate([
                {$match:{role:{$exists:false}}},
                {$project:{password:0,clubs:0}}
            ]).toArray(function(err, results) {
                if (err) {
                    reject(err);
                    throw err;
                };
                resolve(results);
            });
          });
    },
    deleteUser:  (_id) => {
        return new Promise(function(resolve, reject) {   
            usersCol.deleteOne( { _id:new ObjectID(_id) }, 
            function(err, res) {
                if (err) {
                    console.log(err)
                    reject(err);
                    throw err;
                };
                resolve(true);
            });
        });
    },
    get_data_by_ID:  _id => {
        return new Promise(function(resolve, reject) {   
            usersCol.findOne({_id:new ObjectID(_id)},
            function(err, res) {
                if (err) {
                    reject(err);
                    throw err;
                };
                resolve(res);
            });
        });
    },
    update_by_ID:  (_id, user) => {
        return new Promise(function(resolve, reject) {   
            usersCol.updateOne({_id:new ObjectID(_id)}, {$set:user},
            function(err, res) {
                if (err) {
                    reject(err);
                    throw err;
                };
                resolve(true);
            });
        });
    }
}

module.exports = Manager;