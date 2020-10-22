import { Schema, model, Document } from "mongoose";
import { EMAIL_REGEX } from "../utils/regex";
import bcrypt from "bcrypt";

const UserSchema = new Schema({
    realname: {
      type: String,
      required: [true, 'O campo nome completo é obrigatório'],
      validate: {
        validator: function(v: string) {
          return ( v.length > 6 && v.length < 100 )
        },
        message: 'O campo nome completo deve conter de 6 a 100 caracteres'
      }
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'O campo email é obrigatório'],
        validate: {
          validator: function(v: string) {
            return EMAIL_REGEX.test(v);
          },
          message: ({ value }) => `${value} não é um email válido`
        }
    },
    password: {
        type: String,
        required: [true, 'o campo senha é obrigatório'],
        validate: {
          validator: function(v: string) {
            return ( v.length > 6 && v.length < 20 ) 
          },
          message: () => `A senha deve conter de 6 a 20 caracteres`
        }
    },
    role: {
        type: Number,
        required: [true, 'O campo permissão é obrigatório'],
        validate: {
          validator: function(v: number) {
            return [1,2,3,4,5].indexOf(v) !== -1
          },
          message: () => 'O campo permissão esta incorreto.'
        }
    },
    activated: {
      type: Boolean
    },
    confirmCode: {
        type: String,
    },
    recoverKey: {
        type: String
    },
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date
    }
  },
  {
    collection: 'users'
  }   
);

/**
 * This execute before save model
 */
UserSchema.pre('save', function(this: IUser, next){

  if (!this.isModified('password')) return next();

  bcrypt.genSalt(10, (err: any, salt: string) => {
      if (err) return next(err);

      bcrypt.hash(this.password, salt, (err: any, hash: string) => {
          if (err) return next(err);
          this.password = hash;

          next();
      });
  });
});

/**
 * Returns user payload for JWT
 */
UserSchema.methods.getPayload = function(){
    return {
        id: this._id,
        realname: this.realname,
        email: this.email,
        activated: this.activated
    }
}

export interface IUser extends Document {
    realname: string,
    email: string,
    role: number,
    password: string,
    confirmPassword: string,
    confirmCode: string,
    activated: boolean,
    recoverKey: string,
    createdAt: Date,
    updatedAt: Date,
    getPayload(): any,
}

export default model<IUser>('User', UserSchema);