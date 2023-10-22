import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
    async hashPassword(password: string): Promise<string> {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            console.log('Password hashed successfully');
            return hashedPassword;
    }
}
