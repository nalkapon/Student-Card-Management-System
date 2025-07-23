import axios from 'axios';
import { 
  AuthContext, 
  EmailPasswordStrategy, 
  PhonePasswordStrategy 
} from '../AuthStrategies';

process.env.REACT_APP_API_URL = 'http://localhost:3000';

jest.mock('axios'); // axios'u mock'ladık

describe('AuthStrategies', () => {
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('EmailPasswordStrategy should call /users/login with email/password', async () => {
    // Arrange
    const mockResponse = { data: { userId: 'user123' } };
    axios.post.mockResolvedValue(mockResponse);

    const strategy = new EmailPasswordStrategy();
    
    // Act
    const userId = await strategy.login('test@example.com', 'password123');

    // Assert
    expect(axios.post).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_URL}/users/login`,
      { email: 'test@example.com', password: 'password123' }
    );
    expect(userId).toBe('user123');
  });

  test('PhonePasswordStrategy should call /users/login-phone with phone/password', async () => {
    // Arrange
    const mockResponse = { data: { userId: 'user456' } };
    axios.post.mockResolvedValue(mockResponse);

    const strategy = new PhonePasswordStrategy();

    // Act
    const userId = await strategy.login('05551112233', 'pass321');

    // Assert
    expect(axios.post).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_URL}/users/login-phone`,
      { phone: '05551112233', password: 'pass321' }
    );
    expect(userId).toBe('user456');
  });

  test('AuthContext should call strategy login', async () => {
    // Arrange
    const mockResponse = { data: { userId: 'contextUser' } };
    axios.post.mockResolvedValue(mockResponse);

    const context = new AuthContext(new EmailPasswordStrategy());

    // Act
    const userId = await context.executeLogin('context@example.com', 'contextPass');

    // Assert
    expect(axios.post).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_URL}/users/login`,
      { email: 'context@example.com', password: 'contextPass' }
    );
    expect(userId).toBe('contextUser');
  });

});
