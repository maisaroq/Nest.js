import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
  timestamps: true
})
export class User {

  @Prop()
  name: string

  @Prop({ unique: [true, 'Duplicated email'] })
  email: string

  @Prop()
  passwrod: string
}

export const UserSchema = SchemaFactory.createForClass(User)