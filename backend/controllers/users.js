const manager = require('../managers/users');


const Controller = {
    register: async (req, res) => {
        var name = req.body.name;
        var email = req.body.email;
        var password = req.body.password;
        var dob = req.body.dob;
        var user = {
            "name":name,
            "email":email,
            "DOB": dob,
            "password": password
        }
        try{
            await manager.add(user);
            return res.status(200).send({status:200, response:"Users added"});
        } catch (ex){
            return res.status(500).send(ex.message);
        }
    },
    login:async (req, res) => {
        var email = req.query.email;
        var password = req.query.password;
        try{
            let data = await manager.login(email, password);
            if (data === null){
                return res.status(200).send({status:401, response:"Wrong email or password"});
            }
            req.session.loggedin = true;
            req.session._id = data._id;
            req.session.save();
            return res.status(200).send({status:200, response:"Login Successful", role:data.role});
        }
        catch (ex) {
            console.log(ex);
            return res.status(500).send(ex.message);
        }
    },
    update: async (req, res) => {
        if( req.session.loggedin){
            var _id = req.session._id
        }else{
            return res.status(200).send({status:401, response:"Unautherized"});
        }
        var name = req.body.name;
        var email = req.body.email;
        var password = req.body.password;
        var dob = req.body.dob;
        var number = req.body.number;
        var address = req.body.address;
        var user = {
            "name":name,
            "email":email,
            "DOB": dob,
            "password": password,
            "number": number,
            "address": address
        }
        try{
            await manager.update(_id, user);
            return res.status(200).send({status:200, response:"User Updated"});
        } catch (ex){
            return res.status(500).send(ex.message);
        }
    },
    logout:async(req,res)=>{
        try{
            req.session.destroy();
            req.session = null;
            return res.status(200).send("Sucessfully logged out");
        }
        catch (ex) {
            return res.status(500).send(ex.message);
        }
       
    },
    add_club:async (req, res) => {
        if( req.session.loggedin){
            var _id = req.session._id
            var club = req.body.club;
            try{
                data = await manager.club_add(_id, club);
                return res.status(200).send({status:200,response:"Enrolled for the club"});
            }
            catch (ex) {
                return res.status(500).send(ex.message);
            }
        }
        else
            return res.status(401).send({status:401,response:"Unautherized"});
    },
    check_club:async (req, res) => {
        if( req.session.loggedin){
            var _id = req.session._id
            var club = req.query.club;
            try{
                data = await manager.club_check(_id, club);
                if(data)
                    return res.status(200).send({status:200,response:"Already enrolled"});
                else
                    return res.status(200).send({status:404,response:"Not enrolled"});
            }
            catch (ex) {
                return res.status(500).send(ex.message);
            }
        }
        else
            return res.status(401).send({status:401,response:"Unautherized"});
    },
    get_data:async (req, res) => {
        if( req.session.loggedin){
            var _id = req.session._id
            try{
                data = await manager.get_data(_id);
                return res.status(200).send({status:200,response:data});
            }
            catch (ex) {
                console.log(ex.message)
                return res.status(500).send(ex.message);
            }
        }
        else
            return res.status(401).send({status:401,response:"Unautherized"});
    },
    get_all_data:async (req, res) => {
        if( req.session.loggedin){
            try{
                data = await manager.get_all();
                return res.status(200).send({status:200,response:data});
            }
            catch (ex) {
                console.log(ex.message)
                return res.status(500).send(ex.message);
            }
        }
        else
            return res.status(401).send({status:401,response:"Unautherized"});
    },
    delete:async (req, res) => {
        if( req.session.loggedin){
            var user_id = req.body.user_id;
            try{
                await manager.deleteUser(user_id);
                return res.status(200).send({status:200, response:"User deleted"});
            }
            catch (ex) {
                return res.status(200).send({status:500, response:ex.message});
            }
        }
        else
            return res.status(401).send({status:401,response:"Unautherized"});
    },
    updateByID: async (req, res) => {
        if( req.session.loggedin){
            var _id = req.body._id
        }else{
            return res.status(200).send({status:401, response:"Unautherized"});
        }
        var name = req.body.name;
        var email = req.body.email;
        var password = req.body.password;
        var dob = req.body.dob;
        var number = req.body.number;
        var address = req.body.address;
        var user = {
            "name":name,
            "email":email,
            "DOB": dob,
            "password": password,
            "number": number,
            "address": address
        }
        try{
            await manager.update_by_ID(_id, user);
            return res.status(200).send({status:200, response:"User Updated"});
        } catch (ex){
            return res.status(500).send(ex.message);
        }
    },
    get_data_by_ID:async (req, res) => {
        if( req.session.loggedin){
            var _id = req.query._id
            try{
                data = await manager.get_data_by_ID(_id);
                return res.status(200).send({status:200,response:data});
            }
            catch (ex) {
                console.log(ex.message)
                return res.status(500).send(ex.message);
            }
        }
        else
            return res.status(401).send({status:401,response:"Unautherized"});
    }
}

module.exports = Controller;