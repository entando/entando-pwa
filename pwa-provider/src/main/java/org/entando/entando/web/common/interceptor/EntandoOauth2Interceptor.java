package org.entando.entando.web.common.interceptor;

import org.entando.entando.aps.system.services.keycloak.KeycloakConfiguration;
import org.entando.entando.web.common.annotation.RestAccessControl;
import org.entando.entando.web.common.exceptions.EntandoAuthorizationException;
import org.entando.entando.web.common.exceptions.EntandoTokenException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class EntandoOauth2Interceptor extends HandlerInterceptorAdapter {

    private static final Logger log = LoggerFactory.getLogger(EntandoOauth2Interceptor.class);

    @Autowired
    private KeycloakConfiguration configuration;

    @Override
    public boolean preHandle(final HttpServletRequest request, final HttpServletResponse response, final Object handler) {
        log.info("EntandoOauth2Interceptor.preHandle init");
        if (handler instanceof HandlerMethod) {
            final HandlerMethod method = (HandlerMethod) handler;
            final RestAccessControl accessControl = method.getMethodAnnotation(RestAccessControl.class);
            if (accessControl != null) {
                final String permission = accessControl.permission();
                validateToken(request, permission);
            }
        }
        log.info("EntandoOauth2Interceptor.preHandle finish");
        return true;
    }

    private void validateToken(final HttpServletRequest request, final String permission) {
        final String authorization = request.getHeader("Authorization");

        if (authorization == null || !authorization.startsWith("Bearer ")) {
            log.warn("No bearer token provided");
            throw new EntandoTokenException("no token found", request, "guest");
        }

        final String bearerToken = authorization.substring("Bearer ".length());
        final ResponseEntity<AccessToken> resp = request(bearerToken);
        final AccessToken accessToken = resp.getBody();

        if (HttpStatus.NOT_FOUND.equals(resp.getStatusCode()) || HttpStatus.UNAUTHORIZED.equals(resp.getStatusCode())) {
            log.error("Invalid OAuth2 configuration: {}", configuration);
            throw new EntandoTokenException("Invalid OAuth configuration", request, "guest");
        }

        if (accessToken == null || !accessToken.isActive()) {
            throw new EntandoTokenException("invalid or expired token", request, "guest");
        }

        if (!accessToken.hasResourceAccess(configuration.getClientId(), permission)) {
            log.warn("User {} is missing the required permission {}", accessToken.getUsername(), permission);
            throw new EntandoAuthorizationException(null, request, accessToken.getUsername());
        }

        log.info("User authenticated");
    }

    private ResponseEntity<AccessToken> request(final String bearerToken) {
        final RestTemplate restTemplate = new RestTemplate();
        final HttpEntity<MultiValueMap<String, String>> req = createRequest(bearerToken);
        final String url = String.format("%s/realms/%s/protocol/openid-connect/token/introspect", configuration.getAuthUrl(), configuration.getRealm());
        return restTemplate.postForEntity(url, req, AccessToken.class);
    }

    private HttpEntity<MultiValueMap<String, String>> createRequest(final String bearerToken) {
        final MultiValueMap<String, String> body = createBody(bearerToken);
        final HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        return new HttpEntity<>(body, headers);
    }

    private MultiValueMap<String, String> createBody(final String bearerToken) {
        final MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("token", bearerToken);
        map.add("client_id", configuration.getClientId());
        map.add("client_secret", configuration.getClientSecret());
        return map;
    }

}
