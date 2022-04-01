import { Attribute } from './attribute';

export interface Client {
    client_id: string;

    client_name: string;
    client_uri: string;
    logo_uri: string;
    tos_uri: string;
    policy_uri: string;
    software_id: string;
    software_version: string;
    contacts: string [];

    token_endpoint_auth_method: string;
    client_secret: string;
    jwks_uri: string;
    jwks: object;

    grant_types: string [];
    redirect_uris: string [];
    post_logout_redirect_uris: string [];
    response_types: string [];

    scope: string [];
    resource: string [];

    attributes: Attribute [];
}
