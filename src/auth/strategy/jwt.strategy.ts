import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "../constants/constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Indicamos que vamos extrair o token por meio do cabeçalho da requisição
            ignoreExpiration: false,            // Indica que iremos sim trabalhar com expiração de token
            secretOrKey: jwtConstants.secret,   // Indicamos qual a chave padrão para fazer a des/criptografia
        });
    }

    // Criamos esse método puramente para seguir o padrão pré-definido pela PassportStrategy. 
    // Ele sempre será chamado quando a validação do Token dentro do construtor passar. Se fosse necessário poderiamos personalizar
    async validate(payload: any) {
        return payload;
    }
}