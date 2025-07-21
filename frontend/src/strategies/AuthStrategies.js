import axios from 'axios';

export class AuthStrategy {
    async login(email, password) {
        throw new Error("login() not implemented");
    }
}

export class EmailPasswordStrategy extends AuthStrategy {
    async login(email, password) {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, {
            email,
            password,
        });
        return response.data.userId;
    }
}

export class PhonePasswordStrategy extends AuthStrategy {
    async login(phone, password) {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/login-phone`, {
            phone,
            password,
        });
        return response.data.userId;
    }
}

export class AuthContext {
    constructor(strategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy) {
        this.strategy = strategy;
    }

    async executeLogin(email, password) {
        return await this.strategy.login(email, password);
    }
}