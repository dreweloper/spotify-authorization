# spotify-authorization

Authorization code flow steps:

1. A Spotify user visits our application and taps on the Log in button.
2. The application makes a request to the authorization server.
3. The authorization server displays a dialog asking the user to grant permissions to the application.
4. Once the user accepts the permissions, the authorization server redirects the user back to the application using a URL which contains an authorization code.
5. The application requests an access token using the code provided in the previous step.
6. Once received, the application uses the access token to make API calls.

## IMPORTANTE

En el frontend se tiene que recuperar ambos token de las queries, es decir, habría que recuperarlos, almacenarlos en el local o cookies y después limpiar la URL.

El `refresh_token` no cambia, siempre se utiliza el mismo para obtener un nuevo `access_token` una vez este ha caducado.

- El token ya está preparado para reconocer el usuario que dio acceso: `https://api.spotify.com/v1/me/player`, ejemplo.