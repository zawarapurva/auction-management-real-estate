
export interface User {
    _id;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    jwt: string;
    businesstype: string;
    address: string;
    my_auctions;
    my_bids;
}
