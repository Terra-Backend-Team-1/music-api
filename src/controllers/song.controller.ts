//import { StatusCodes } from "http-status-codes";
//import { Request, Response, NextFunction } from "express";
//import { SOUNDCLOUD_BASE_URL, SOUNDCLOUD_CLIENT_ID } from "@/config";
//import { RequestWithUser } from "@/interfaces/auth.interface";
//import HTTPException from "@/exceptions/http.exception";
//import axios from "axios";
//
//
//class SongController {
//  public client_id = SOUNDCLOUD_CLIENT_ID;
//  public base_url = SOUNDCLOUD_BASE_URL;
//
//  public getSong = async (
//    req: Request,
//    res: Response,
//    next: NextFunction
//  ) => {
//    try {
//      const query = req.query.q;
//      if (!query) {
//        throw new HTTPException(StatusCodes.BAD_REQUEST, "Provide a query value")
//      }
//      const response = await axios.get(`${this.base_url}/tracks`, {
//        params: {
//          query: query,
//          client_id: this.client_id,
//          limit: 10
//        }
//      })
//      res.status(StatusCodes.OK).json(response.data);
//    } catch (error) {
//      console.log(error)
//      next(error)
//    }
//  }
//
//}
//
//export default SongController
