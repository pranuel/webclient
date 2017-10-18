// we need this in order to require images with the url-loader plugin for webpack (see webpack.config.js):
declare function require(source: string): string;

interface IdToken {
    name: string,
    email: string,
    picture: string,
    exp: number
}