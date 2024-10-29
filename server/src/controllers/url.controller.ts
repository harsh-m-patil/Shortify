import asyncHandler from "../utils/asyncHandler";
import URLSchema from "../models/url.model";

export const createURL = asyncHandler(async (req, res, next) => {
  const { orignalURL } = req.body;

  // TODO: Implement URL shortening Logic
  const shortenedURL = orignalURL;

  const url = await URLSchema.create({ orignalURL, shortenedURL });

  res.status(201).json({
    status: "success",
    data: {
      url,
    },
  });
});

// NOTE: route for admin
export const getAllURLs = asyncHandler(async (req, res, next) => {
  const urls = await URLSchema.find();

  res.status(200).json({
    status: "success",
    results: urls.length,
    data: {
      urls,
    },
  });
});
