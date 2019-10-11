const bcrypt = require('bcrypt');
const users = require('../Models/users');
const auctions = require('../Models/auctions');
const buyers = require('../Models/buyers');
const isExistingUser = require('../helperFunctions/auth').isExistingUser;
const verifyCredentials = require('../helperFunctions/verify').verifyCredentials;
const bidValidator = require('../helperFunctions/bidValidator').bidValidator;
const uploadPic = require('../upload/imagefile');

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
    console.log(verifiedUser.id);
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
        const currentMax = await bidValidator(request.payload.bid_value, request.payload.auction_id);
        if (!currentMax) {
            const buyer = new buyers({
                auction_id: request.payload.auction_id,
                buyer_id: request.payload.buyer_id,
                bid_value: request.payload.bid_value
            });
            await buyer.save();
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
