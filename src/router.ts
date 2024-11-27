import { Router } from "express";
import { HTTPVerb, UserController } from "./controllers/user.controller";

export const router = Router()

const userController = new UserController()

const convertVerb = (verb: HTTPVerb) => {
  switch (verb) {
    case HTTPVerb.DELETE:
      return router.delete;
    case HTTPVerb.OPTIONS:
      return router.options;
    case HTTPVerb.GET:
      return router.get;
    case HTTPVerb.PATCH:
      return router.patch;
    case HTTPVerb.POST:
      return router.post;
    case HTTPVerb.PUT:
      return router.put;
  }
  // throw new Error(`Unable to convert HTTP verb ${verb}`)
}

for (const [path, { verb, handlers }] of Object.entries(userController.config)) {
  const routeMatcher = convertVerb(verb)
  routeMatcher(path, handlers)
}