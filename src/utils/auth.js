export const USERS = [
    { username: 'admin1', password: 'admin1' },
    { username: 'admin2', password: 'admin2' },
    { username: 'admin3', password: 'admin3' },
];

const AUTH_KEY = 'lic_exam_current_user';

export const loginUser = (username, password) => {
    const user = USERS.find(u => u.username === username && u.password === password);
    if (user) {
        localStorage.setItem(AUTH_KEY, username);
        return true;
    }
    return false;
};

export const logoutUser = () => {
    localStorage.removeItem(AUTH_KEY);
};

export const getCurrentUser = () => {
    return localStorage.getItem(AUTH_KEY);
};
