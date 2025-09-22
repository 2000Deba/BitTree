import mongoose from "mongoose";

function sanitizeHandle(handle) {
  if (!handle) return handle;
  return handle
    .trim()
    .replace(/\s+/g, "-")      // space -> dash
    .replace(/[^a-zA-Z0-9-_]/g, "") // only a-z, A-Z, 0-9, underscore, dash
}

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,  // query consistency
      trim: true
    },
    password: String,
    image: String,
    handle: {
      type: String,
      unique: true,
      sparse: true, // allow multiple null handles
      trim: true
    },
  },
  { timestamps: true }
);

// sanitize handle before save
UserSchema.pre("save", function (next) {
  if (this.handle) {
    this.handle = sanitizeHandle(this.handle);
  }
  next();
});

// sanitize handle before update
UserSchema.pre("findOneAndUpdate", function (next) {
  if (this._update.handle) {
    this._update.handle = sanitizeHandle(this._update.handle);
  }
  next();
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
