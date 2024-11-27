import { Request, RequestHandler, Response } from "express";

export enum HTTPVerb {
  GET,
  POST,
  PUT,
  PATCH,
  DELETE,
  OPTIONS,
}

export type EndpointDefinition = { verb: HTTPVerb, handlers: RequestHandler[] }

export class UserController {
  config: Record<string, EndpointDefinition> = {
    "/all": { verb: HTTPVerb.GET, handlers: [this.getAll] }
  }

  async getAll(req: Request, res: Response) {
    res.send("Retrieve all users");
  }
}

