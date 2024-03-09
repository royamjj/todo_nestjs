import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './strategy/local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Constants, jwt_key } from 'src/utils/constants';
import { JwtStrategy } from './strategy/jwt.strategy';
@Module({
    imports: [UserModule,
        JwtModule.registerAsync({      //registering jwt
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: jwt_key,
                signOptions: {
                    expiresIn: '3600s',
                }
            }),
        })],
    providers: [LocalStrategy, JwtStrategy],
    controllers: [AuthController]
})
export class AuthModule { }
