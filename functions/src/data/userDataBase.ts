import { BaseDataBase } from "./baseDataBase";
import {
  CreateUserGateway,
  GetUserByEmailGateway,
  SendCpfUserGateway,
  SendFullNameUserGateway,
  SendPhoneNumberUserGateway,
  SendBirthdayUserGateway,
  SendAdressUserGateway
} from "../business/gateways/user/userGateway";
import { User } from "../business/entities/user/user";

export class UserDataBase extends BaseDataBase
  implements
    CreateUserGateway,
    GetUserByEmailGateway,
    SendCpfUserGateway,
    SendFullNameUserGateway,
    SendPhoneNumberUserGateway,
    SendBirthdayUserGateway,
    SendAdressUserGateway {
  private static TABLE_USERS: string = "Users";
  private static TABLE_CPF: string = "Cpf";
  private static TABLE_NAME: string = "Full_Name";
  private static TABLE_PHONE: string = "Phone_Number";
  private static TABLE_BIRTHDAY: string = "Birthday";
  private static TABLE_ADRESS: string = "Adress";

  async createUser(user: User): Promise<void> {
    await this.connection.raw(`
            INSERT INTO ${UserDataBase.TABLE_USERS} (id, email, password)
            VALUES ("${user.getId()}", "${user.getEmail()}", "${user.getPassword()}")
            `);
  }

  async getUserByEmail(email: string): Promise<User> {
    const query = await this.connection.raw(`
                SELECT * FROM ${UserDataBase.TABLE_USERS}
                WHERE ${UserDataBase.TABLE_USERS}.email="${email}"
            `);

    const user = query[0][0];

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return new User(user.id, user.email, user.password);
  }

  async sendCpfUser(cpf: string, userId: string, date: string): Promise<void> {
    await this.connection.raw(`
            INSERT INTO ${UserDataBase.TABLE_CPF} (cpf, user_id, updated_at)
            VALUES ("${cpf}", "${userId}", "${date}") ON DUPLICATE KEY UPDATE updated_at="${date}";
            `);
  }

  async sendFullNameUser(
    fullName: string,
    userId: string,
    date: string
  ): Promise<void> {
    const split = fullName.split(" ");
    const first = split.slice(0, 1);
    const last = split.slice(1).join(" ");

    await this.connection.raw(`
            INSERT INTO ${UserDataBase.TABLE_NAME} (first_name, last_name, user_id, updated_at)
            VALUES ("${first}", "${last}", "${userId}","${date}" ) 
            ON DUPLICATE KEY UPDATE updated_at="${date}";
            `);
  }

  async sendPhoneNumber(
    phoneNumber: number,
    userId: string,
    date: string
  ): Promise<void> {
    await this.connection.raw(`
            INSERT INTO ${UserDataBase.TABLE_PHONE} (phone_number, user_id, updated_at)
            VALUES ("${phoneNumber}", "${userId}","${date}" ) 
            ON DUPLICATE KEY UPDATE updated_at="${date}";
            `);
  }

  async sendBirthday(
    brithday: string,
    userId: string,
    date: string
  ): Promise<void> {
    await this.connection.raw(`
            INSERT INTO ${UserDataBase.TABLE_BIRTHDAY} (birthday, user_id, updated_at)
            VALUES ("${brithday}", "${userId}","${date}" ) 
            ON DUPLICATE KEY UPDATE updated_at="${date}";
            `);
  }

  async sendAdress(
    cep: number,
    street: string,
    number: number,
    complement: string,
    city: string,
    state: string,
    userId: string,
    date: string
  ): Promise<void> {
    await this.connection.raw(`
            INSERT INTO ${UserDataBase.TABLE_ADRESS} (cep, street, number, complement, city, state, user_id, updated_at)
            VALUES ("${cep}", "${street}","${number}","${complement}","${city}","${state}","${userId}","${date}" ) 
            ON DUPLICATE KEY UPDATE updated_at="${date}";
            `);
  }
}
