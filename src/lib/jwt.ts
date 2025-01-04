import JsonWebToken, { JwtPayload, SignOptions } from "jsonwebtoken";
import { AuthError } from "../errors/auth-error";

const DEFAULT_OPTIONS: SignOptions = {
  expiresIn: "1h",
};
// JWT class
export class Jwt {
  static token(payload: JwtPayload, options: SignOptions = DEFAULT_OPTIONS) {
    return JsonWebToken.sign(payload, process.env.SECRET_KEY!, options);
  }

  static verify(token: string) {
    return JsonWebToken.verify(
      token,
      process.env.SECRET_KEY!,
      (err, decoded) => {
        if (err) {
          throw new AuthError(err.message);
        }
        return decoded;
      }
    );
  }
}
