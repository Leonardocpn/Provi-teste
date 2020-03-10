import { BaseDataBase } from "./baseDataBase";
import {
  CreateUserGateway,
  GetUserByEmailGateway,
  SendCpfUserGateway,
  SendFullNameUserGateway,
  SendPhoneNumberUserGateway,
  SendBirthdayUserGateway,
  SendAdressUserGateway,
  SendAmountRequestedGateway,
  GetEndpointsOrder
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
  SendAdressUserGateway,
  SendAmountRequestedGateway,
  GetEndpointsOrder {
  
  private static TABLE_USERS: string = "Users";
  private static TABLE_CPF: string = "Cpfs";
  private static TABLE_NAME: string = "Full_Names";
  private static TABLE_PHONE: string = "Phone_Numbers";
  private static TABLE_BIRTHDAY: string = "Birthdays";
  private static TABLE_ADRESS: string = "Adresses";
  private static TABLE_LOANS: string = "Loans";

  async createUser(user: User): Promise<void> {
    await this.connection.raw(`
            INSERT INTO ${UserDataBase.TABLE_USERS} (id, email, password, endpoints_order)
            VALUES ("${user.getId()}", "${user.getEmail()}", "${user.getPassword()}", "${user.getEndpointsOrder()}")
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
    try{
      await this.connection.raw(`
            INSERT INTO ${UserDataBase.TABLE_CPF} (cpf, user_id, updated_at, created_at)
            VALUES ("${cpf}", "${userId}", "${date}", "${date}") ON DUPLICATE KEY UPDATE updated_at="${date}";
            `);
    } catch (err){
        throw new Error(err.message);
        
    }
  }

  async previousConsult(table: string, userId: string) {
    const prev = await this.connection.raw(`
      SELECT * FROM ${table}
      WHERE user_id="${userId}"`);

    const data = prev[0][0];

    if (!data) {
      throw new Error("Consulta anterior não executada");
    }
  }

  async sendFullNameUser(
    fullName: string,
    userId: string,
    date: string,
    prevTable: string
  ): Promise<void> {
    const split = fullName.split(" ");
    const first = split.slice(0, 1);
    const last = split.slice(1).join(" ");

    await this.previousConsult(prevTable, userId);

    await this.connection.raw(`
            INSERT INTO ${UserDataBase.TABLE_NAME} (first_name, last_name, user_id, updated_at, created_at)
            VALUES ("${first}", "${last}", "${userId}","${date}","${date}" ) 
            ON DUPLICATE KEY UPDATE updated_at="${date}";
            `);
  }

  async sendPhoneNumber(
    phoneNumber: number,
    userId: string,
    date: string,
    prevTable: string
  ): Promise<void> {
    await this.previousConsult(prevTable, userId);
    await this.connection.raw(`
            INSERT INTO ${UserDataBase.TABLE_PHONE} (phone_number, user_id, updated_at, created_at)
            VALUES ("${phoneNumber}", "${userId}","${date}" ,"${date}" ) 
            ON DUPLICATE KEY UPDATE updated_at="${date}";
            `);
  }

  async sendBirthday(
    brithday: string,
    userId: string,
    date: string,
    prevTable: string
  ): Promise<void> {
    await this.previousConsult(prevTable, userId);
    await this.connection.raw(`
            INSERT INTO ${UserDataBase.TABLE_BIRTHDAY} (birthday, user_id, updated_at, created_at)
            VALUES ("${brithday}", "${userId}","${date}","${date}"  ) 
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
    date: string,
    prevTable: string
  ): Promise<void> {
    await this.previousConsult(prevTable, userId);
    await this.connection.raw(`
            INSERT INTO ${UserDataBase.TABLE_ADRESS} 
            (cep, street, number, complement, city, state, user_id, updated_at, created_at)
            VALUES ("${cep}", "${street}","${number}","${complement}","${city}","${state}","${userId}","${date}" ,"${date}" ) 
            ON DUPLICATE KEY UPDATE updated_at="${date}";
            `);
  }

  async sendAmountRequested(
    amountRequested: number,
    userId: string,
    date: string,
    prevTable: string
  ): Promise<void> {
    await this.previousConsult(prevTable, userId);
    await this.connection.raw(`
            INSERT INTO ${UserDataBase.TABLE_LOANS} (total_amount, user_id, updated_at, created_at)
            VALUES ("${amountRequested}", "${userId}", "${date}","${date}" )
            ON DUPLICATE KEY UPDATE updated_at="${date}";
    `);
  }

  async getOrder(userId: string): Promise<string[]> {
    const result = await this.connection.raw(`
    SELECT endpoints_order FROM ${UserDataBase.TABLE_USERS} 
    WHERE id="${userId}"
    `)
    return result[0][0]
  }
}


