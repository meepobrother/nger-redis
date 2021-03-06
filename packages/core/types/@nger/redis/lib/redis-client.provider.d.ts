import Redis from 'ioredis';
import { RedisModuleAsyncOptions, RedisModuleOptions } from './redis.interface';
export declare class RedisClientError extends Error {
}
export interface RedisClient {
    defaultKey: string;
    clients: Map<string, Redis.Redis>;
    size: number;
}
export declare const createClient: () => {
    provide: symbol;
    useFactory: (options: RedisModuleOptions | RedisModuleOptions[]) => {
        defaultKey: string;
        clients: Map<string, Redis.Redis>;
        size: number;
    };
    inject: symbol[];
};
export declare const createAsyncClientOptions: (options: RedisModuleAsyncOptions) => any;
