import { Controller, Get, HttpCode, Inject, Param, Post, Query, Redirect, Req, Res } from '@nestjs/common';
import type { HttpRedirectResponse } from "@nestjs/common";
import type { Request, Response } from 'express';
import { UserService } from './user.service';

type dataType = { id: String, name: String }

@Controller('/api/users')
export class UserController {

    @Get("/view/hello")
    viewHello(@Query('name') name: string, @Res() res: Response) {
        res.render("index.html", {
            title: "Template Engine",
            name
        })
    }

    @Get("/set-cookie")
    setCookie(@Query() name: string, @Res() res: Response) {
        res.cookie("name", name);
        res.status(200).json("Hello Cookies");
    }

    @Get("/get-cookie")
    getCookie(@Req() req: Request): string {
        return req.cookies['name']
    }

    @Get("/redirect")
    @Redirect()
    redirectUser(): HttpRedirectResponse {
        return {
            url: "/api/users",
            statusCode: 301
        }
    }

    @Post()
    postUser(): string {
        return 'POST User'
    }

    @Get()
    getUser(): string {
        return 'GET User'
    }

    @Inject()
    private service: UserService

    @Get("/sayHello")
    @HttpCode(200)
    async sayHello(
        @Query("name") name: string
    ): Promise<string> {
        return this.service.sayHello(name);
    }

    @Get("/:id")
    @HttpCode(200)
    getUserById(
        @Param("id") id: string,
        @Query("name") name: string
    ): dataType {
        const data = { id, name };
        return data
    }
}
