import express from 'express';

const methods = ['get', 'post'];

function RouterWrapper(router, routePrefix = '') {
  const routerObject = { router };
  methods.forEach((method) => {
    Object.assign(routerObject, {
      [method]: function (route, ...params) {
        router[method](routePrefix + route, ...params);
        AppRouter.routeCount++;
        console.log(
          `#${AppRouter.routeCount.toString().padStart(2, '0')} ${(params[0]
            .name
            ? params[0].name
            : 'unprotected'
          ).padEnd(14, ' ')} ( ${routePrefix + route} ) :: ${method}`
        );
      },
    });
  });

  return routerObject;
}

export class AppRouter {
  static instance;
  static routeCount = 0;

  static getInstance(routePrefix) {
    if (!AppRouter.instance) {
      AppRouter.instance = express.Router();
    }

    return RouterWrapper(AppRouter.instance, routePrefix);
  }
}
