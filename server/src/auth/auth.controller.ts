import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { LoginDTO, RegisterDTO } from "src/dtos/user.dto";
import { AuthService } from "./auth.service";

@Controller("users")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    register(@Body(ValidationPipe) registerRequest: RegisterDTO) {
        this.authService.register(registerRequest);
    }

    @Post("/login")
    login(@Body(ValidationPipe) loginRequest: LoginDTO) {
        this.authService.login(loginRequest);
    }
}
