"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppRouter = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const methods = ['get', 'post'];

function RouterWrapper(router, routePrefix = '') {
  const routerObject = {
    router
  };
  methods.forEach(method => {
    Object.assign(routerObject, {
      [method]: function (route, ...params) {
        router[method](routePrefix + route, ...params);
        AppRouter.routeCount++;
        console.log(`#${AppRouter.routeCount.toString().padStart(2, '0')} ${(params[0].name ? params[0].name : 'unprotected').padEnd(14, ' ')} ( ${routePrefix + route} ) :: ${method}`);
      }
    });
  });
  return routerObject;
}

class AppRouter {
  static instance;
  static routeCount = 0;

  static getInstance(routePrefix) {
    if (!AppRouter.instance) {
      AppRouter.instance = _express.default.Router();
    }

    return RouterWrapper(AppRouter.instance, routePrefix);
  }

}

exports.AppRouter = AppRouter;