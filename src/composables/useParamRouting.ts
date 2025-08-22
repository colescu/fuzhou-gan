import {
  type NavigationGuardNext,
  type RouteLocationNormalized,
} from "vue-router";
import { LANGUAGES } from "@/library/constants/language";

function createOptionalParamRouting<V extends readonly string[]>(
  paramName: string,
  values: V,
  defaultValue: V[number] | undefined
) {
  return (
    to: RouteLocationNormalized,
    _: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    const param = to.params[paramName];

    function redirect() {
      next({
        name: to.name!,
        params: { ...to.params, [paramName]: defaultValue },
        query: to.query,
      });
    }

    // simple auth check
    const isAuth = localStorage.user === "colescu";
    if (!isAuth && param) {
      redirect();
    }

    // validate param
    if (param && typeof param === "string" && !values.includes(param)) {
      redirect();
    } else {
      next();
    }
  };
}

export const languageRouting = createOptionalParamRouting(
  "language",
  LANGUAGES,
  undefined
);
