import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            secret: process.env.SECRET_KEY,
            signOptions: {
                expiresIn: 3600
            }
        }),
        PassportModule.register({ defaultStrategy: "jwt" })
    ],
    exports: [PassportModule]
})
export class AuthModule {}
