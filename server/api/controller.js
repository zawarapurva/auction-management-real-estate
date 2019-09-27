const bcrypt = require('bcrypt');
const users = require('../Models/users');
const auctions = require('../Models/auctions');
const isExistingUser = require('../auth').isExistingUser;
const verifyCredentials = require('../verify').verifyCredentials;
const uploadPic = require('../upload/imagefile');

exports.register =  async (request, h) => {
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
        return h.response({
            message: 'Registered!!'
        }).code(200);
    }
    return h.response({
        message: existingUser.message
    }).code(existingUser.code);
}

exports.login = async (request, h) => {
    const verifiedUser = await verifyCredentials(request.payload.email, request.payload.password);
    console.log(verifiedUser);
    if (typeof verifiedUser.code === 'undefined') {
        return h.response({
            message: 'Login Successful!'
        }).code(200);
    }
    return h.response({
        message: verifiedUser.message
    }).code(verifiedUser.code);
}

exports.createAuction =  async (request, h) => {
    try{
    const itemPic = request.payload.property_image;
    console.log(request.payload.property_image_type);

    const date = new Date().toISOString();
    const type =  request.payload.property_image_type;
    console.log(type);
    const fileType = type.split("/");

    const imageName = date+'.'+fileType[1];
    await uploadPic.handleFileUpload(itemPic,imageName);
    const auction = new auctions({
        title: request.payload.title,
        property_type: request.payload.property_type,
        address: request.payload.address,
        description: request.payload.description,
        min_starting_bid: request.payload.min_starting_bid,
        bid_value_multiple: request.payload.bid_value_multiple[0],
        expiry_date: request.payload.expiry_date,
        image_name: imageName
    });
    await auction.save();
    return h.response({
        message: 'Success'
    }).code(200);
    }catch(e){
        return h.response({
            message: 'Error! check all fields'
        }).code(400);
    }
}

exports.home = async (request, h) => {
    try {
        var auction = await auctions.find({});
        console.log(auction);
        return h.response(auction).code(200);
    } catch (error) {
        return h.response(error).code(500);
    }
}
