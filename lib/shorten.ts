import {NextApiResponse} from "next";

export const Resp = (res: NextApiResponse, status: number, message: string, entities: object) => {
    const success = status >= 200 && status < 300;
    return res.status(status).json({success, error: !success, message, data: entities});
}

export const picks = (entities: object[], paths: string[]) => {
    // @ts-ignore
    return entities.map((entity) => pick(entity, paths));
}

export const pick = <T, K extends keyof T>(obj: T, paths: K[]): Pick<T, K> => ({
    ...paths.reduce((mem, key) => ({
        ...mem,
        [key]: obj[key]
    }), {})
} as Pick<T, K>);
