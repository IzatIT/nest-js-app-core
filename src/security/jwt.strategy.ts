import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_SECRET_KEY } from 'src/helpers/const';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: JWT_SECRET_KEY,
        });
    }

    async validate(payload: any) {
        if (payload.type !== 'access') {
            throw new UnauthorizedException('Invalid token type');
        }
        return { userId: payload.sub, username: payload.username };
    }

}
