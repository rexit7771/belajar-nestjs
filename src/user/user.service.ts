import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    sayHello(name: string) {
        return `Hello ${name} from service`;
    }
}
