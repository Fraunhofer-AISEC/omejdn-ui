export interface UserBackendConfig {
    admin: {
        location: string;
    };
    yaml: {
        location: string;
    };
    sqlite: {
        location: string;
    };
    ldap: {
        host: string;
        port: number;
        treebase: string;
    };
}
