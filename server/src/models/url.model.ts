import { Schema, SchemaTypes, model } from "mongoose";
import type { IUrl } from "../interfaces/url.interface";

const urlSchema = new Schema<IUrl>({
  orignalURL: {
    type: String,
    required: true,
  },
  shortenedURL: {
    type: String,
    unique: true,
  },
  visits: {
    type: [{ timestamp: { type: Number } }],
  },
  user: {
    type: SchemaTypes.ObjectId,
    ref: "User",
  },
});

const URL = model("URL", urlSchema);

export default URL;
