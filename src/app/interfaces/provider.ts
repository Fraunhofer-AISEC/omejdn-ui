export interface Provider {
    name: string;
    redirect_uri: string;
    client_id: string;
    client_secret: string;
    scopes: string [];
    claim_mapper: string;
    authorization_endpoint: string;
    token_endpoint: string;
    userinfo_endpoint: string;
    response_type: string;
    logo: string;
    external_userid: string;
    mapping_key: string;
    mapping_pairs: any [];
}
