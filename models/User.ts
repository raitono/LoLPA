import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';
import { DataTypes, Model, ModelAttributes, Sequelize } from "sequelize";
import Env from '../env';

export enum LoginCodes {
  NOT_FOUND = 'not-found',
  PASSWORD_INVALID = 'password-invalid',
  MISSING_CREDENTIALS = 'missing-credentials'
}

export interface IUser {
  id: number;
  email: string;
  password?: string;
}

export class User extends Model implements IUser {
  public id!: number;
  public email!: string;
  public password!: string;

  public static async register(user: IUser): Promise<IUser> {
    if (user.email && user.password) {
      const hash = await argon2.hash(user.password);
      const newUser = await User.create({ ...user, password: hash });
      return User.toIUser(newUser);
    }
    throw new Error('Bad Request');
  }

  public static async login(loginEmail?: string, password?: string): Promise<IUser> {
    if (loginEmail && password) {
      const user = await User.findOne({ where: { email: loginEmail } });
      if (!user) throw new Error(LoginCodes.NOT_FOUND);

      const hashCheck = await argon2.verify(user.password!, password);
      if (!hashCheck) throw new Error(LoginCodes.PASSWORD_INVALID);

      return User.toIUser(user);
    }
    throw new Error(LoginCodes.MISSING_CREDENTIALS);
  }

  public static async resetPassword(email: string, password: string): Promise<void> {
    const hash = await argon2.hash(password);
    await User.update({ password: hash }, { where: { email } });
  }

  public static generateJWT(user: IUser): string {
    const data = {
      id: user.id,
      email: user.email,
    };

    return jwt.sign({ data, }, Env.JWT_KEY, { expiresIn: '7d' });
  }

  public static toIUser(model: User): IUser {
    return {
      id: model.id,
      email: model.email
    }
  }
}
const attr: ModelAttributes<User, any> = {
  preferredName: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
}
export default (sequelize: Sequelize) => {
  User.init(attr, {
    sequelize,
    modelName: 'User'
  });

  return User;
}
