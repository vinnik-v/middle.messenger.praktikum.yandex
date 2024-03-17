declare module "*?raw"
{
    const content: string;
    export default content;
}

declare module "*.png"
{
    const content: File;
    export default content;
}
