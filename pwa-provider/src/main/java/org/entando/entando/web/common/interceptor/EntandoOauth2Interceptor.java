package org.entando.entando.web.common.interceptor;

import org.entando.entando.plugins.keycloak.aps.KeycloakConfiguration;
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
    public boolean preHandle(final HttpServletRequest request,
                             final HttpServletResponse response,
                             final Object handler) {
        log.info("EntandoOauth2Interceptor.preHandle init {}", configuration.toString());
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
        log.info("final String authorization = request.getHeader");

        if (authorization == null || !authorization.startsWith("Bearer ")) {
            log.info("authorization == null || !authorization.startsWith(");
            throw new EntandoTokenException("no token found", request, "guest");
        }

        final String bearerToken = authorization.substring("Bearer ".length());
        final RestTemplate restTemplate = new RestTemplate();
        final HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        final MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("token", bearerToken);
        map.add("client_id", configuration.getClientId());
        map.add("client_secret", configuration.getClientSecret());
        final HttpEntity<MultiValueMap<String, String>> req = new HttpEntity<>(map, headers);
        final String url = String.format("%s/realms/%s/protocol/openid-connect/token/introspect", configuration.getAuthUrl(), configuration.getRealm());
        final ResponseEntity<AccessToken> resp = restTemplate.postForEntity(url, req, AccessToken.class);
        final AccessToken accessToken = resp.getBody();

        if (HttpStatus.NOT_FOUND.equals(resp.getStatusCode()) || HttpStatus.UNAUTHORIZED.equals(resp.getStatusCode())) {
            log.error("Invalid OAuth configuration");
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

}
