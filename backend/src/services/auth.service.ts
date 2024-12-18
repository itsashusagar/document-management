import { User, UserRole } from '../models/User';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';

export class AuthService {
  static async register(email: string, password: string, name: string, role: UserRole) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists');
    }

    const user = new User({
      email,
      password,
      name,
      role,
    });

    await user.save();
    return this.generateToken(user._id);
  }

  static async login(email: string, password: string) {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      throw new Error('Invalid credentials');
    }

    return {
      token: this.generateToken(user._id),
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  private static generateToken(userId: string) {
    return jwt.sign({ userId }, config.jwtSecret, {
      expiresIn: config.jwtExpiration,
    });
  }
}