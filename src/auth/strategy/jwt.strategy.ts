import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/user/entities/user.entity";
import { UserService } from "src/user/user.service";
import { jwt_key } from "src/utils/constants";

// for extracting info from JWT token

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwt_key,        //check was it generated by same server
        });
    }

    async validate(payload: any) { // extract info from token
        return {
            userId: payload.id,
            firstName: payload.firstName,
            lastName: payload.lastName,
            email: payload.email,
        };
    }
}