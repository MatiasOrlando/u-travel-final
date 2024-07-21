import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../database/realtimeDatabase";

export const shopApi = createApi({
  reducerPath: "shopApi",
  tagTypes: ["profileImageGet", "locationGet", "bookingsGet"],
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCountries: builder.query({
      query: () => `countries.json`,
    }),
    getCountryById: builder.query({
      query: (id) => `countries.json?orderBy="id"&equalTo=${id}`,
      transformResponse: (res) => {
        const [transformedResponse] = Object.values(res);
        return transformedResponse;
      },
    }),
    getCitiesByCountryId: builder.query({
      query: (countryId) =>
        `cities.json?orderBy="countryId"&equalTo=${countryId}`,
      transformResponse: (res) => {
        const transformedResponse = Object.values(res);
        return transformedResponse;
      },
    }),
    getCityById: builder.query({
      query: (city) => `cities.json?orderBy="city"&equalTo="${city}"`,
      transformResponse: (res) => {
        const [transformedResponse] = Object.values(res);
        return transformedResponse;
      },
    }),
    getProfileImage: builder.query({
      query: (localId) => `profileImages/${localId}.json`,
      providesTags: ["profileImageGet"],
    }),
    postProfileImage: builder.mutation({
      query: ({ image, localId }) => ({
        url: `profileImages/${localId}.json`,
        method: "PUT",
        body: {
          image: image,
        },
      }),
      invalidatesTags: ["profileImageGet"],
    }),
    getLocation: builder.query({
      query: (localId) => `locations/${localId}.json`,
      providesTags: ["locationGet"],
    }),
    postLocation: builder.mutation({
      query: ({ location, localId }) => ({
        url: `locations/${localId}.json`,
        method: "PUT",
        body: {
          latitude: location.latitude,
          longitude: location.longitude,
          address: location.address,
          updatedAt: location.updatedAt,
        },
      }),
      invalidatesTags: ["locationGet"],
    }),
    postBookingOrder: builder.mutation({
      query: ({ ...order }) => ({
        url: `orders.json`,
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["bookingsGet"],
    }),
    getBookingsByUser: builder.query({
      query: (user) => `orders.json?orderBy="user"&equalTo="${user}"`,
      transformResponse: (res) => {
        const transformedResponse = Object.values(res);
        return transformedResponse;
      },
      providesTags: ["bookingsGet"],
    }),
  }),
});

export const {
  useGetCountriesQuery,
  useGetCitiesByCountryIdQuery,
  useGetCityByIdQuery,
  useGetCountryByIdQuery,
  useGetProfileImageQuery,
  usePostProfileImageMutation,
  useGetLocationQuery,
  usePostLocationMutation,
  usePostBookingOrderMutation,
  useGetBookingsByUserQuery,
} = shopApi;
