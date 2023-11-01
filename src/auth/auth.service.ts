import { Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "./user.schema";
import { Model} from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from "bcryptjs"
import { JwtService } from "@nestjs/jwt";
import { SignUpDto } from "./dto/signup.dto";
import { LogInDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { name, email, password } = signUpDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }

  async login(loginDto: LogInDto): Promise<{ token: string }> {
    const { email, password } = loginDto

    const user = await this.userModel.findOne({email})

    if(!user) {
      throw new UnauthorizedException('nvalid email or password')
    }

    const isPasswordMatched = await bcrypt.compare(password, user.passwrod)

    if(!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password')
    }

    const token = this.jwtService.sign({ id: user._id })

    return { token }
    }

}
