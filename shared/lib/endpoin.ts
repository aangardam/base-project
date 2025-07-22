const lastUrl = 'api/v1/settler';
const endpoint = {
    auth : `user-web-auth-service/${lastUrl}`,
    access:`user-web-access-management-service/${lastUrl}`,
    log:`log-service/${lastUrl}`,
}

export default endpoint