import { FileAlreadyExistException } from '@angular-devkit/schematics';

export interface Config {
    issuer: string;
    front_url: string;
    bind_to: string;
    allow_origin: string;
    app_env: string;
    openid: boolean;
    default_audience: string;
    accept_audience: string;
    user_backend_default: string;
    access_token: {
        expiration: number;
        algorithm: string;
    };
    id_token: {
        expiration: number;
        algorithm: string;
    };
    plugins: any;
}
