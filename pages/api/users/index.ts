import type { NextApiRequest, NextApiResponse } from 'next'
import type { User } from '@/interfaces';
import {getUserByEmail, getUsers, loginUser, registerUser} from '@/services/users';
import {userPaths} from "@/interfaces";
import {Resp, picks, pick} from "@/lib/shorten";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let email: string, password: string, success: boolean, error: boolean, message: string, user: Pick<any, string>,
        data: any;

    ({ email } = req.query as { email: string });
    if (email) {
        ({ data, success, message } = await getUserByEmail(email as string));
        user = pick(data, userPaths);
        return Resp(res, success ? 200 : 500, message, user);
    }

    switch (req.method) {

        case "GET":
           ({ error, data, success, message } = await getUsers());
           if (data.hasOwnProperty('length') && data.length) {
               let users = picks(data, userPaths);
               return Resp(res, 200, message, users);
           }
           return Resp(res, 500, message, data);

        case "POST":
            const { firstName, lastName, phoneNumber } = req.body;
            ({ email, password } = req.body);
            const result = await registerUser({ email, firstName, lastName, phoneNumber, password });
            ({ error, data, success, message } = result);
            return Resp(res, success ? 201 : 500, message, data);

        case "PATCH":
            ({email, password} = req.body);
            ({ success, error, message, data } = await loginUser(email, password));
            user = pick(data, userPaths);
            return Resp(res, 200,  message, user);

    }
}