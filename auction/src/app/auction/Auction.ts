
export interface Auction {
    title: string;
    property_type: string;
    address: string;
    description: string;
    min_starting_bid: number;
    max_current_bid: number;
    bid_value_multiple: number;
    expiry_date: string;
    image_name: string;
}
