import { rateLimit } from "express-rate-limit";
import { Request, Response } from "express";

export const ipLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // reset the count after 1 minute
  limit: 10, // limits the number of requests from a single IP address to 10 requests per minute
  standardHeaders: true, // New version of express-rate-limit uses standard headers
  legacyHeaders: false, // Disable the old X-RateLimit-* headers. These are used by some older clients and can be ignored if you don't need to support them.
  // Custom handler for when the rate limit is exceeded. Handler is a function that is imported from express-rate-limit and is called when the rate limit is exceeded. It takes the request and response objects as parameters and can be used to send a custom response to the client.
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      status: "Could not change the status",
      message:
        "This user has tried to change the status too many times. Try again in 1 minute.",
    });
  },
});
