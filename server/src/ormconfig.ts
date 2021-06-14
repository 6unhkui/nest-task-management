import { __prod__ } from "./constants";
import { ConnectionOptions } from "typeorm";

const config: ConnectionOptions = {
    type: "postgres",
    url: process.env.DATABASE_URL,
    entities: [__dirname + "/**/*.entity{.ts,.js}"],
    synchronize: !__prod__,
    migrationsRun: false,
    logging: !__prod__,
    logger: "file",
    migrations: [__dirname + "/migrations/**/*{.ts,.js}"],
    cli: {
        migrationsDir: "src/migrations"
    }
};

export = config;
