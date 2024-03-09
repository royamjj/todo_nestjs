import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { User } from "src/user/entities/user.entity";
import { UserService } from "src/user/user.service";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    constructor(
        private userService: UserService,
    ) {
        super({
            usernameField: 'email',
            passwordField: 'password'
        });
    }

    async validate(email: String, password: String): Promise<User> {
        const user = await this.userService.findUserByEmail(email);
        if (user && user.password == password) {
            return user;
        }
        if (!user) throw new UnauthorizedException("User Not found with email id: " + email);
        if (user.password != password) throw new UnauthorizedException("Invalid creds");
    }
}