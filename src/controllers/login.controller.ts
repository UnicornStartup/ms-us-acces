import { Request, Response } from "express";

export const register = async (req: Request, res: Response): Promise<Response> => {
  console.log(req.body);
  return res.status(200).json({ msg: "Hey" });
};
