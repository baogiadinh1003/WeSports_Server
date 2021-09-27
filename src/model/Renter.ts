import mongoose from "mongoose";
import bcrypt from "bcrypt";

export type renterDocument = mongoose.Document & {
    renterName: string;
    renterPhone: string;
    renterEmail: string;
    renterFbUrl: string;
    renterPassword: string;
    accountStatus: number;
    renterDateRegister: string;
    // passwordResetToken: string;
    // passwordResetExpires: Date;
    // tokens: AuthToken[];

    comparePassword: comparePasswordFunction;
};

type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: any) => void) => void;

const renterSchema = new mongoose.Schema<renterDocument>(
    {
        renterName: {type: String, unique: true},
        renterPhone: {type: String, unique: true},
        renterEmail: {type: String, unique: true},
        renterFbUrl: {type: String, unique: true},
        renterPassword: {type: String, unique: true},
        accountStatus: {type: Number, unique: true, default: 1},
        renterDateRegister: {type: String, unique: true}
    }
);

/**
 * Password hash middleware.
 */
renterSchema.pre("save", function save(next) {
    const renter = this as renterDocument;
    if (!renter.isModified("renterPassword")) {
        return next();
    } 
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt.hash(renter.renterPassword, salt, undefined, (err: mongoose.Error, hash) => {
            if (err) { return next(err); }
            renter.renterPassword = hash;
            next();
        });
    })
})

const comparePassword: comparePasswordFunction = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
        cb(err, isMatch);
    });
};

renterSchema.methods.comparePassword = comparePassword;

export const Renter = mongoose.model<renterDocument>("Renter", renterSchema);