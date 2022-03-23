import { Request, Response } from "express";

export const login = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
      
      return res.status(200).json("hola");
  } catch (e) {
        return res.status(404).json("internal server error");
  }
};
