/**
 * Object : Interface for UI
 * ObjectModel : Full Properties of Object within Mongodb
 */

export interface User {
    email: string;
    firstName: string;
    lastName: string;
}

export interface UserModel {
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    password: string;
}

export const userPaths = ["email", "firstName", "lastName", "phoneNumber"];

export interface recentClaims {
    claim: string;
    date: string;
    value: number;
    type: string;
}

export interface Business {
    name: string;
    industry: string;
    registrationNumber: string;
    estimatedAnnualTurnover: string;
    description: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    province: string;
    postalCode: number;
    existingInsurance: boolean;
    generateQuoteFromExisting: boolean;
    recentClaims: recentClaims[];
}

export interface Files {
    filename: string;
    handle: string;
    mimetype: string;
    originalPath: string;
    size: number;
    source: string;
    url: string;
    uploadId: string;
    status: string;
}

export interface Schedule {
    files: Files[];
}

export interface Cover {
    [key: string]: string;
}

export interface Quotation {
    business: Business;
    schedule?: Schedule;
    cover?: Cover;
    referenceNumber: string;
    userId: string;
}
