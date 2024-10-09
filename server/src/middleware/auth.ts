import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// Extend the Request interface to include custom fields like email
interface CustomRequest extends Request {
    email?: string;
}

const verifyToken = (token: string, secret: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
};

export const verifyUser = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
        const refreshed = await renewToken(req, res);
        if (refreshed) {
            next();
        } else {
            res.status(401).json({ valid: false, message: "Unauthorized" });
        }
    } else {
        try {
            const decoded = await verifyToken(accessToken, process.env.JWT_ACCESS_TOKEN!);
            req.email = decoded.email; // Store email in the request
            next();
        } catch (err) {
            res.status(401).json({ valid: false, message: "Invalid token" });
        }
    }
};

const renewToken = async (req: CustomRequest, res: Response): Promise<boolean> => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        res.status(401).json({ valid: false, message: "No refresh token" });
        return false;
    }

    try {
        const decoded: any = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN!);
        const accessToken = jwt.sign({ email: decoded.email }, process.env.JWT_ACCESS_TOKEN!, { expiresIn: '1m' });
        res.cookie('accessToken', accessToken, { maxAge: 60000 });
        return true;
    } catch (error) {
        res.status(401).json({ valid: false, message: "Invalid refresh token" });
        return false;
    }
};
