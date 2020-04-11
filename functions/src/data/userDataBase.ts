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
  GetEndpointsOrder,
  UserAdress,
  AdressFromApi,
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
    try {
      await this.connection.raw(`
    INSERT INTO ${
      UserDataBase.TABLE_USERS
    } (id, email, password, endpoints_order)
    VALUES ("${user.getId()}", "${user.getEmail()}", "${user.getPassword()}", '${user.getEndpointsOrder()}')
    `);
    } catch (err) {
      throw new Error(`Erro no banco ao criar um usuario`);
    }
  }

  async getUserByEmail(email: string): Promise<User> {
    const query = await this.connection.raw(`
                SELECT * FROM ${UserDataBase.TABLE_USERS} u
                LEFT JOIN ${UserDataBase.TABLE_CPF} c
                  ON u.id=c.user_id
                LEFT JOIN ${UserDataBase.TABLE_NAME} n
                  ON u.id=n.user_id
                LEFT JOIN ${UserDataBase.TABLE_BIRTHDAY} b
                  ON u.id=b.user_id
                LEFT JOIN ${UserDataBase.TABLE_PHONE} p
                  ON u.id=p.user_id
                LEFT JOIN ${UserDataBase.TABLE_ADRESS} a
                  ON u.id=a.user_id
                LEFT JOIN ${UserDataBase.TABLE_LOANS} l 
                  ON u.id=l.user_id
                WHERE u.email="${email}"
            `);

    const user = query[0][0];
    if (!user) {
      throw new Error("Usuario nao encontrado");
    }
    const adress =
      user.street +
      " " +
      user.number +
      ", " +
      user.complement +
      ", " +
      user.city +
      ", " +
      user.state;
    return new User(
      user.id,
      user.email,
      user.password,
      user.cpf,
      user.phone_number,
      adress,
      user.first_name,
      user.last_name,
      user.birthday,
      user.total_amount
    );
  }

  async sendCpfUser(cpf: string, userId: string, date: string): Promise<void> {
    try {
      await this.connection.raw(`
            INSERT INTO ${UserDataBase.TABLE_CPF} (cpf, user_id, updated_at)
            VALUES ("${cpf}", "${userId}", "${date}");
            `);
    } catch (err) {
      throw new Error(`Erro ao inserir o cpf do usuario`);
    }
  }

  async previousConsult(table: string, userId: string) {
    const query = await this.connection.raw(`
      SELECT * FROM ${table}
      WHERE user_id="${userId}"`);

    const data = query[0][0];
    if (!data) {
      throw new Error("Endpoint anterior não preenchido");
    }
  }

  async sendFullNameUser(
    fullName: string,
    userId: string,
    date: string,
    prevTable: string
  ): Promise<void> {
    const splitName = fullName.split(" ");
    const first = splitName.slice(0, 1);
    const last = splitName.slice(1).join(" ");

    await this.previousConsult(prevTable, userId);

    try {
      await this.connection.raw(`
            INSERT INTO ${UserDataBase.TABLE_NAME} (first_name, last_name, user_id, updated_at, created_at)
            VALUES ("${first}", "${last}", "${userId}","${date}","${date}" ) 
            ON DUPLICATE KEY UPDATE updated_at="${date}";
            `);
    } catch (err) {
      throw new Error(`Erro ao inserir o nome completo do usuario`);
    }
  }

  async sendPhoneNumber(
    phoneNumber: string,
    userId: string,
    date: string,
    prevTable: string
  ): Promise<void> {
    await this.previousConsult(prevTable, userId);
    try {
      await this.connection.raw(`
            INSERT INTO ${UserDataBase.TABLE_PHONE} (phone_number, user_id, updated_at, created_at)
            VALUES ("${phoneNumber}", "${userId}","${date}" ,"${date}" ) 
            ON DUPLICATE KEY UPDATE updated_at="${date}";
            `);
    } catch (err) {
      throw new Error(`Erro ao inserir o telefone do usuario`);
    }
  }

  async sendBirthday(
    brithday: string,
    userId: string,
    date: string,
    prevTable: string
  ): Promise<void> {
    await this.previousConsult(prevTable, userId);
    try {
      await this.connection.raw(`
            INSERT INTO ${UserDataBase.TABLE_BIRTHDAY} (birthday, user_id, updated_at, created_at)
            VALUES ("${brithday}", "${userId}","${date}","${date}"  ) 
            ON DUPLICATE KEY UPDATE updated_at="${date}";
            `);
    } catch (err) {
      throw new Error(`Erro ao inserir o aniversario do usuario`);
    }
  }

  async sendAdress(
    userAdress: UserAdress,
    userId: string,
    date: string,
    prevTable: string,
    adressFromApi: AdressFromApi
  ): Promise<void> {
    await this.previousConsult(prevTable, userId);
    try {
      const divergenceStorageBoolean = adressFromApi.divergenceFromApi ? 1 : 0;
      await this.connection.raw(`
    INSERT INTO ${UserDataBase.TABLE_ADRESS} 
    (cep, street, number, complement, city, state, user_id, updated_at, created_at, street_api, city_api, state_api, divergence_api)
    VALUES ("${userAdress.cep}", "${userAdress.street}","${userAdress.number}","${userAdress.complement}","${userAdress.city}",
    "${userAdress.state}","${userId}","${date}" ,"${date}","${adressFromApi.streetApi}","${adressFromApi.cityApi}",
    "${adressFromApi.stateApi}" ,"${divergenceStorageBoolean}"  ) 
    ON DUPLICATE KEY UPDATE updated_at="${date}";
    `);
    } catch (err) {
      throw new Error(`Erro ao inserir o endereco do usuario`);
    }
  }

  async sendAmountRequested(
    amountRequested: number,
    userId: string,
    date: string,
    prevTable: string
  ): Promise<void> {
    await this.previousConsult(prevTable, userId);
    try {
      await this.connection.raw(`
    INSERT INTO ${UserDataBase.TABLE_LOANS} (total_amount, user_id, updated_at, created_at)
    VALUES ("${amountRequested}", "${userId}", "${date}","${date}" )
    ON DUPLICATE KEY UPDATE updated_at="${date}";
    `);
    } catch (err) {
      throw new Error(`Erro ao inserir o valor do credito do usuario`);
    }
  }

  async getOrder(userId: string): Promise<any> {
    try {
      const result = await this.connection.raw(`
    SELECT endpoints_order As 'order' FROM ${UserDataBase.TABLE_USERS} 
    WHERE id="${userId}"
    `);

      return result[0][0];
    } catch (err) {
      throw new Error(`Erro ao consultar a ordem de endpoints do usuario`);
    }
  }
}
