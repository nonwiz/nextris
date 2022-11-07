import {User, UserModel} from "@/interfaces";
import {Collections, useDb} from "@/db";
import {errorWrapper, successWrapper } from "./pattern.ts";

const bcrypt = require('bcrypt');

export const loginUser = async (email: string, password: string) => {
    const { error, data} = await getUserByEmail(email);
    if (data != null && !error) {
        // @ts-ignore
        const isValidPassword = await bcrypt.compare(password, data.password ? data.password : "");
        if (isValidPassword) {
            return successWrapper("User logged in successfully", data);
        }
    }
    return errorWrapper("", "Account doesn't exist or invalid password");
}

export const registerUser = async (user: UserModel) => {
    const { error, data} = await getUserByEmail(user.email);
    if (data == null) {
        const salt = await bcrypt.genSalt(10);
        // hashing password
        user.password = await bcrypt.hash(user.password, salt);
        return await createUser(user);
    }
    return errorWrapper("", "User already exists");
}

const createUser = async (user: UserModel) => {
    const users = await useDb(Collections.users);
    try {
        const data = await users.insertOne(user);
        return successWrapper("User created successfully", data);
    } catch (error) {
        return errorWrapper(error, "Error creating user");
    }
}

export const getUsers = async () => {
    const users = await useDb(Collections.users);
    try {
        const data = await users.find({}).toArray();
        return successWrapper("Users fetched successfully", data);
    } catch (error: any) {
        return errorWrapper(error, "Error fetching users");
    }
}

/*
 * Start of Internal Functions
 */

export const getUserByEmail = async (email: string) => {
    const users = await useDb(Collections.users);
    try {
        const data = await users.findOne({email})
        if (data) {
            return successWrapper("User found", data);
        }
        return successWrapper("User not found", data);
    } catch (error: any) {
        return errorWrapper(error, "Error fetching user");
    }
}
