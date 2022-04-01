import {Attribute} from './attribute';

export interface User {
    password: string;
    attributes: Attribute [];
    username: string;
    userBackend: string;
    extern: string;
}
