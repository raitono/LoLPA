export default class Env {
    public static DB_HOST?: string = process.env.DB_HOST;
    public static DB_USER?: string = process.env.DB_USER;
    public static DB_PASS?: string = process.env.DB_PASS;
    public static DB_NAME?: string = process.env.DB_NAME;
    public static DB_URL?: string = process.env.DB_URL;
    public static PORT?: string = process.env.PORT;
    public static JWT_KEY: string = process.env.JWT_KEY!;
}
