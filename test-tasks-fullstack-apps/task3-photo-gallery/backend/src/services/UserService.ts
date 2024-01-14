import { User } from "../models/User";
import { UserDTOType, UserType } from "../types/userTypes";
import bcrypt from "bcrypt";

class UserService {
  async getAllUsers(): Promise<UserDTOType[]> {
    return (await User.findAll()).map((u) => ({
      id: u.id,
      login: u.login,
      email: u.email,
    }));
  }

  async getOneUser(id: number): Promise<UserDTOType | null> {
    const user = await User.findByPk(id);
    return user && { id: user.id, login: user.login, email: user.email };
  }

  async createUser(user: UserType): Promise<UserDTOType> {
    const userFounded = await User.findOne({ where: { email: user.email } });
    if (userFounded !== null) throw new Error("Email is exsist");
    const keyPassword = await this.hash(user.password);
    user.password = keyPassword;

    const createdUser = await User.create(user);
    
    return {
      id: createdUser.id,
      login: createdUser.login,
      email: createdUser.email,
    };
  }

  async updateUser(
    id: number,
    user: UserType
  ): Promise<UserDTOType | undefined> {
    const userFinded = await User.findByPk(id);
    const keyPassword = await this.hash(user.password);
    user.password = keyPassword;

    const updatedUser = await userFinded?.update({
      login: user.login,
      password: user.password,
      email: user.email,
    });
    return (
      updatedUser && {
        id: updatedUser.id,
        login: updatedUser.login,
        email: updatedUser.email,
      }
    );
  }

  async deleteUser(id: number): Promise<UserDTOType | null> {
    const user = await User.findByPk(id);
    await user?.destroy();
    return user && { id: user.id, login: user.login, email: user.email };
  }

  async isExsist(login: string, password: string): Promise<boolean> {
    let result = false;
    const userFounded: User | null = await User.findOne({
      where: { login: login },
    });
    if (userFounded !== null) {
      await bcrypt
        .compare(password, userFounded.password)
        .then((res) => {
          result = res;
          return res;
        })
        .catch((err) => console.error(err.message));
    }
    return result;
  }

  private async hash(password: string) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }
}

export default new UserService();
