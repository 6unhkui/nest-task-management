import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LoginDTO, RegisterDTO } from "src/dtos/user.dto";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    public async register(registerRequest: RegisterDTO) {
        try {
            const user = await this.userRepository.create(registerRequest).save();
            return user;
        } catch (error) {
            if (error.code === "23505") {
                throw new ConflictException("email already token");
            }

            throw new Error("not authenticated");
        }
    }

    public async login({ email, password }: LoginDTO) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new Error("that email dosen't exist");
        }

        const valid = await user.comparePassword(password);
        if (!valid) {
            throw new UnauthorizedException("incorrect password");
        }

        return user;
    }
}
