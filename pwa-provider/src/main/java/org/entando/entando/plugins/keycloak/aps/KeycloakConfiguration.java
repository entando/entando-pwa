package org.entando.entando.plugins.keycloak.aps;

public class KeycloakConfiguration {

    private String authUrl;
    private String realm;
    private String clientId;
    private String clientSecret;

    public String toString() {
        return String.format("{authUrl=%s, realm=%s, clientId=%s, clientSecret=%s}", authUrl, realm, clientId, clientSecret);
    }

    public String getAuthUrl() {
        return authUrl;
    }

    public void setAuthUrl(final String authUrl) {
        this.authUrl = authUrl;
    }

    public String getRealm() {
        return realm;
    }

    public void setRealm(final String realm) {
        this.realm = realm;
    }

    public String getClientId() {
        return clientId;
    }

    public void setClientId(final String clientId) {
        this.clientId = clientId;
    }

    public String getClientSecret() {
        return clientSecret;
    }

    public void setClientSecret(final String clientSecret) {
        this.clientSecret = clientSecret;
    }
}
