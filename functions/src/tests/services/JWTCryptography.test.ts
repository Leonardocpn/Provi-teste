import { JWTCryptography } from "../../services/JWTCryptography";

describe("JWTCpryptography", () => {
  it("Should throw an error for an invalid JWT token", () => {
    const JwtTest = new JWTCryptography();
    expect(() => JwtTest.getUserIdFromToken("token")).toThrowError(
      "Chave JWT mal informada ou token espirado"
    );
  });
});
