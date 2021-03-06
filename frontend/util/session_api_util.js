export const checkEmail = (user) => {
    return $.ajax({
        url: 'api/sessions',
        data: {
            user: {
                email: user.email,
            }
        }
    });
};

export const signup = (user) => {
    return $.ajax({
        method: 'POST',
        url: 'api/users',
        data: {
            user: {
                email: user.email,
                password: user.password,
            }
        }
    });
};

export const login = (user) => {
    return $.ajax({
        method: 'POST',
        url: 'api/sessions',
        data: {
            user: {
                email: user.email,
                password: user.password
            }
        }
    });
};

export const logout = () => {
    return $.ajax({
        method: 'DELETE',
        url: 'api/sessions'
    });
};
