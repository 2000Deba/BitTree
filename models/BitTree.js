import mongoose from "mongoose";

function sanitizeHandle(handle) {
  if (!handle) return handle;
  return handle
    .trim()
    .replace(/\s+/g, "-")          // space → dash
    .replace(/[^a-zA-Z0-9-_]/g, ""); // only a-z, A-Z, 0-9, underscore, dash
}

const BitTreeSchema = new mongoose.Schema(
  {
    handle: {
      type: String,
      unique: true,
      sparse: true, // allow null for users without handle yet
      trim: true,
    },
    links: [
      {
        linktext: { type: String },
        link: { type: String },
      },
    ],
    pic: { type: String, default: "" },
    desc: { type: String, default: "" },
    ownerEmail: { type: String, required: true }, // root identifier
    ownerId: { type: String, required: true },    // support social ids (Google/GitHub etc.)
  },
  { timestamps: true }
);

// sanitize handle before save
BitTreeSchema.pre("save", function (next) {
  if (this.handle) {
    this.handle = sanitizeHandle(this.handle);
  }
  next();
});

// sanitize handle before update
BitTreeSchema.pre("findOneAndUpdate", function (next) {
  if (this._update.handle) {
    this._update.handle = sanitizeHandle(this._update.handle);
  }
  next();
});

// Force mongoose to use the "links" collection (not "bittrees")
export default mongoose.models.BitTree ||
  mongoose.model("BitTree", BitTreeSchema, "links");
