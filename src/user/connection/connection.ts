import { Injectable } from '@nestjs/common';

export class Connection {
    getName(): string {
        return "DB"
    }
}

@Injectable()
export class MySqlConnection extends Connection {
    getName(): string {
        return "My SQL"
    }
}

@Injectable()
export class MongoDBConnection extends Connection {
    getName(): string {
        return "Mongo DB"
    }
}