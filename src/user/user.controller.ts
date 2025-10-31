import { Body, Controller, Get, Header, HttpCode, HttpException, Inject, Param, ParseIntPipe, Post, Query, Res, UseFilters, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { Connection } from './connection/connection';
import type { Response } from 'express';
import { MailService } from './mail/mail.service';
import { UserRepository } from './user-repository/user-repository';
import { MemberService } from './member/member.service';
import { User } from '@prisma/client';
import { ValidationFilter } from 'src/validation/validation.filter';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { LoginUserRequest, loginUserRequestValidation } from 'src/model/login.model';
import { ValidationPipe } from 'src/validation/validation.pipe';

type resType = { message: string }

@Controller('user')
export class UserController {
    constructor(
        private service: UserService,
        private connection: Connection,
        private mailService: MailService,
        private userRepository: UserRepository,
        @Inject("EmailService") private emailService: MailService,
        @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,

        // * Ini moduleRef
        private memberService: MemberService
    ) { }

    @Get("/sayNameService")
    // @UseFilters(ValidationFilter)
    async sayNameByService(@Query("name") name: string) {
        return this.service.sayHello(name);
    }


    @Post("/login")
    // * Global Pipe
    @UsePipes(new ValidationPipe(loginUserRequestValidation))
    // * Filter Pipe
    @UseFilters(ValidationFilter)
    login(
        @Query("id") id: number,
        @Body() req: LoginUserRequest
    ) {
        return `Hello ${req.username}`;
    }

    @Post("/")
    async create(
        @Body("firstName") firstName: string,
        @Body("lastName") lastName: string
    ): Promise<User> {
        if (!firstName) {
            throw new HttpException(
                {
                    code: 400,
                    errors: "First name is required"
                },
                400
            );
        }
        return this.userRepository.save(firstName, lastName)
    }

    @Get("/connection")
    async getConnection(): Promise<String> {
        this.emailService.send();
        this.mailService.send();

        console.info("\n", this.memberService.getConnectionName());
        this.memberService.sendEmail();

        return this.connection.getName();
    }

    @Get("/sayName/:name")
    sayNameByParam(@Param("name") name: string): string {
        return `Hello ${name}`
    }

    @Get("/sayName")
    sayNameByQuery(@Query("name") name: string): string {
        return `Hello ${name}`
    }

    @Post("/sayName")
    sayNameByBody(
        @Body("name") name: string,
        @Body("kelas") kelas: number
    ): string {
        return `Hello ${name} kelas ${kelas}`
    }

    // * Contoh kalau mau response dari bawaan nest
    @Get("/testResponse")
    @Header("Content-type", "application/json")
    @HttpCode(200)
    testResponse(): resType {
        return { message: "Success" }
    }

    // * Contoh response dengan menyertakan cookie
    @Get("/set-cookie")
    setCookie(
        @Query('name') name: string,
        @Res() res: Response
    ) {
        res.cookie("name", name);
        res.status(200).json("Cookie has been sent");
    }

    @Get("/render")
    renderView(@Query("name") name: string, @Res() res: Response) {
        res.render("index.html", { title: "Template Engine", name })
    }

    @Get("/:id")
    getById(@Param("id", ParseIntPipe) id: number): string {
        return `GET ${id}, type ${typeof id}`
    }
}
