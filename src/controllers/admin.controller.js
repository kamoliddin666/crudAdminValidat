import Admin from "../models/admin.model.js";
import { handleError } from "../helpers/error-handle.js";
import { successRes } from "../helpers/success.response.js";
import { Crypto } from "../utils/encrypt_decrypt.js";
import { createAdminValidator, updateAdminValidator } from "../validation/admin.validation.js";
import { isValidObjectId } from "mongoose";
import { config } from "dotenv";
config();

const crypto = new Crypto();

export class AdminController {
    async createAdmin(req, res) {
        try {
            const { value, error } = createAdminValidator(req.body);
            if (error) return handleError(res, error, 422);

            const existsUsername = await Admin.findOne({ username: value.username });
            if (existsUsername) return handleError(res, 'Username already exists', 409);

            const hashedPassword = await crypto.encrypt(value.password);
            const admin = await Admin.create({
                username: value.username,
                hashedPassword,
                role: value.role || 'admin'
            });
            return successRes(res, admin, 201);
        } catch (error) {
            return handleError(res, error);
        }
    }

    async getAllAdmins(_, res) {
        try {
            const admins = await Admin.find();
            return successRes(res, admins);
        } catch (error) {
            return handleError(res, error);
        }
    }

    async getAdminById(req, res) {
        try {
            const admin = await AdminController.findAdminById(req.params.id);
            return successRes(res, admin);
        } catch (error) {
            return handleError(res, error.message, 404);
        }
    }

    async updateAdmin(req, res) {
        try {
            const id = req.params.id;
            await AdminController.findAdminById(id); // faqat mavjudligini tekshirish

            const { value, error } = updateAdminValidator(req.body);
            if (error) return handleError(res, error, 422);

            let hashedPassword;
            if (value.password) {
                hashedPassword = await crypto.encrypt(value.password);
            }

            const updatedAdmin = await Admin.findByIdAndUpdate(id, {
                ...value,
                ...(hashedPassword && { hashedPassword })
            }, { new: true });

            return successRes(res, updatedAdmin);
        } catch (error) {
            return handleError(res, error.message, 400);
        }
    }

    async deleteAdmin(req, res) {
        try {
            const id = req.params.id;
            await AdminController.findAdminById(id);
            await Admin.findByIdAndDelete(id);
            return successRes(res, { message: 'Admin deleted successfully' });
        } catch (error) {
            return handleError(res, error.message, 404);
        }
    }

    static async findAdminById(id) {
        if (!isValidObjectId(id)) {
            throw new Error('Invalid object ID');
        }
        const admin = await Admin.findById(id);
        if (!admin) {
            throw new Error('Admin not found');
        }
        return admin;
    }
}
