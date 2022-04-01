# Omejdn Admin UI

Welcome to Omejdn!

This is the official Web-GUI for the [Omejdn OAuth 2.0 Authorization Server](https://github.com/Fraunhofer-AISEC/omejdn-server).

## How to run

For debug setups, simply run `ng serve` and navigate to `http://localhost:4200`.
The default setup assumes that Omejdn is running on `http://localhost:4567`
and that it has a public client `adminUI` configured with a redirect URI pointing back to the UI
and the following allowed scopes (with each one being defined in a scope mapping):

* openid
* omejdn:read
* omejdn:write
* omejdn:admin

Example config:

```yaml
- client_id: adminUI
  client_name: Omejdn Admin UI
  client_uri: http://localhost:4200
  logo_uri: http://localhost:4200/assets/img/fhg.jpg
  grant_types:
  - authorization_code
  software_id: Omejdn Admin UI
  software_version: 0.0.0
  token_endpoint_auth_method: none
  redirect_uris: http://localhost:4200
  post_logout_redirect_uris: http://localhost:4200
  scope:
  - openid
  - omejdn:admin
  - omejdn:write
  - omejdn:read
  attributes: []
```

For production setups, you probably want to use the provided Dockerfile or download the image from somewhere.
The following environment variables may be set to overwrite the default values:

* **OIDC_ISSUER** The OpenID Provider Issuer Identifier, should provide OIDC Discovery Metadata.
* **API_URL** The URL where the API is hosted. In terms of plain Omejdn, this includes everything up to and including `/api/v1`.
* **CLIENT_ID** A client ID to use for authorization with Omejdn

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.3.

