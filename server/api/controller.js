const bcrypt = require('bcrypt');
const users = require('../Models/users');
const auctions = require('../Models/auctions');
const buyers = require('../Models/buyers');
const isExistingUser = require('../helperFunctions/auth').isExistingUser;
const verifyCredentials = require('../helperFunctions/verify').verifyCredentials;
const bidValidator = require('../helperFunctions/bidValidator').bidValidator;
const uploadPic = require('../upload/imagefile');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

exports.register = async (request) => {
    const password = await bcrypt.hash(request.payload.password, +10);
    const existingUser = await isExistingUser(request.payload.email, request.payload.username);
    if (!existingUser) {
        const user = new users({
            firstname: request.payload.firstname,
            lastname: request.payload.lastname,
            username: request.payload.username,
            password: password,
            email: request.payload.email,
            businesstype: request.payload.businesstype,
        });
        await user.save();
        return {
            message: 'Registered!!',
            code: 200
        };
    }
    return {
        message: existingUser.message,
        code: existingUser.code
    }
}

exports.login = async (request) => {
    const verifiedUser = await verifyCredentials(request.payload.email, request.payload.password);
    if (typeof verifiedUser.code === 'undefined') {
        return {
            message: 'Login Successful!!',
            code: 200,
            user_id: verifiedUser.id
        }
    }
    return {
        message: verifiedUser.message,
        code: verifiedUser.code
    }
}

exports.createAuction = async (request) => {
    try {
        const date = new Date().toISOString();
        const itemPic = request.payload.property_image;
        const type = request.payload.property_image_type;
        const fileType = type.split("/");
        const imageName = date + '.' + fileType[1];
        await uploadPic.handleFileUpload(itemPic, imageName);
        const auction = new auctions({
            seller_id: request.payload.user_id,
            title: request.payload.title,
            property_type: request.payload.property_type,
            address: request.payload.address,
            description: request.payload.description,
            min_starting_bid: request.payload.min_starting_bid,
            bid_value_multiple: request.payload.bid_value_multiple,
            expiry_date: request.payload.expiry_date,
            image_name: imageName,
        });
        await auction.save();
        return {
            message: 'Success',
            code: 200
        }
    } catch (e) {
        return {
            message: 'Error! check all fields',
            code: 400
        }
    }
}


exports.getAuctions = async (request, h) => {
    try {
        var auction = await auctions.find({});
        return h.response(auction).code(200);
    } catch (error) {
        return h.response(error).code(500);
    }
}

exports.bid = async (request) => {
    try {
        const currentMax = await bidValidator(request.payload.bid_value, request.payload.auction_id, request.payload.buyer_id );
        if (!currentMax) {
            return {
                message: 'Bid Successful!!',
                code: 200
            }
        }
        else if (request.payload.bid_value === "") {
            return {
                message: 'Please place a Bid value',
                code: 400
            }
        }
        else {
            return {
                currentMax: currentMax,
                message: 'Please Bid higher',
                code: 400,
            }
        }
    } catch (e) {
        console.log(e);
        return e;
    }
}

exports.getMyAuctions = async (request, h) => {
    try {
        var auction = await auctions.find({ seller_id: request.query.user_id });
        return h.response(auction).code(200);
    } catch (error) {
        return h.response(error).code(500);
    }
}

exports.getViewBids = async (request, h) => {
    try{
        var buyer = await buyers.find({ auction_id: request.query.auction_id}, {bid_value: 1, buyer_id: 1, _id: 0}).lean();
        let a =[];
        for(let i = 0; i<buyer.length; i++)
        {
            var username = await users.find({ _id : buyer[i].buyer_id} , { username:1, _id: 0});
            a[i] = {
                bidValue: buyer[i].bid_value,
                username: username[0].username
            }
        }
        console.log(a.length);
        return h.response(a).code(200);
    } catch(e) {
        return h.response(e).code(500);
    }
}

exports.getProfile = async (request, h) => {
    try {
        console.log(request.query.user_id);
        var user = await users.find({ _id: request.query.user_id }).lean();
        console.log(user[0]);
        return h.response(user[0]).code(200);
    } catch (error) {
        return h.response(error).code(500);
    }
}

exports.getMyBids = async (request, h) => {
    try {
        var buyer = await buyers.find({ buyer_id: request.query.user_id }, 
            {auction_id:1, _id:0}).lean();
            let a =[];
            for(let i = 0; i<buyer.length; i++){
                a[i] = buyer[i].auction_id
                
            }
            var auction = await auctions.find({ _id : { $in: a } }).lean();
        return h.response(auction).code(200);
    } catch (error) {
        return h.response(error).code(500);
    }
}
