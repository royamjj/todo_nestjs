import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private jwtService: JwtService) { }

  @Post('login')
  @UseGuards(AuthGuard("local")) // middleware for auth
  async login(@Req() req: any) { // after LocalStrategy 
    const user = req.user;
    const payload = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      id: user.id,
    };
    return {
      status: 200,
      message: "Login Success",
      result: {
        token: this.jwtService.sign(payload), // generate new token
        user: user,
      },
    };
  }
}