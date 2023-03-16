import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { setCredentials, logOut } from "../../Feature/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: `http://localhost:4000`,
  credentials: `include`,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      Headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.originalStatus == 401) {
    console.log("send refersh token");
    const refershResult = await baseQuery("/ref", api, extraOptions);
    if (refershResult?.data) {
      const user = api.getState().auth.user;
      //   store new token
      api.dispatch(setCredentials({ ...refershResult.data, user }));

      //   retry the original query access token

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
