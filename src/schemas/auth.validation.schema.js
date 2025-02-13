"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginValidationSchema = exports.userSignupValidationSchema = void 0;
const zod_1 = require("zod");
// schema for signup validation
exports.userSignupValidationSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
    password: zod_1.z
        .string()
        .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/, "Password must contain atleat: 1 lower case, 1 upper case, 1 special character ")
        .min(8)
        .max(16),
    passwordRepeat: zod_1.z
        .string()
        .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/, "Password must contain atleat: 1 lower case, 1 upper case, 1 special character ")
        .min(8)
        .max(16),
    role: zod_1.z.enum(["user", "admin"]),
});
// schema for login validation
exports.userLoginValidationSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8).max(16),
});
