import { KeycloakService } from 'keycloak-angular';

export function keycloakFactory(keycloakService: KeycloakService) {
  return async () =>
    keycloakService.init({
      config: {
        url: 'http://localhost:8081',
        realm: 'mirriga',
        clientId: 'mirriga_hmi',
      },
      initOptions: {
        onLoad: 'login-required',
        flow: 'implicit',
      },
    });
}

// export function keycloakFactory(keycloakService: KeycloakService) {
//   return async () => {
//     const token = localStorage.getItem('kc_token');
//     return keycloakService
//       .init({
//         config: {
//           url: 'http://localhost:8081',
//           realm: 'imrsac',
//           clientId: 'imrsac_hmi',
//         },
//         initOptions: {
//           onLoad: 'login-required',
//           flow: 'implicit',
//           token: token,
//         },
//       })
//       .then((success) => {
//         if (success) {
//           keycloakService.getToken().then(token => localStorage.setItem('kc_token', token));
//         }
//       });
//   };
// }
