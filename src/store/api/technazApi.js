import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const technazApi = createApi({
  reducerPath: "technazApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    credentials: "include",
  }),
  tagTypes: [
    "Auth",
    "Home",
    "About",
    "Services",
    "Products",
    "Navbar",
    "Seo",
    "Blog",
    "Contact",
    "ContactQueries",
  ],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: [
        "Auth",
        "Home",
        "About",
        "Services",
        "Products",
        "Navbar",
        "Seo",
        "Blog",
        "Contact",
      ],
    }),
    getMe: builder.query({
      query: () => "/auth/me",
      providesTags: ["Auth"],
    }),
    getHomeContent: builder.query({
      query: () => "/content/home",
      providesTags: ["Home"],
    }),
    updateHomeContent: builder.mutation({
      query: (body) => ({
        url: "/content/home",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Home"],
    }),
    getAboutContent: builder.query({
      query: () => "/content/about",
      providesTags: ["About"],
    }),
    updateAboutContent: builder.mutation({
      query: (body) => ({
        url: "/content/about",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["About"],
    }),
    getServicesContent: builder.query({
      query: () => "/content/services",
      providesTags: ["Services"],
    }),
    updateServicesContent: builder.mutation({
      query: (body) => ({
        url: "/content/services",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Services"],
    }),
    getProductsContent: builder.query({
      query: () => "/content/products",
      providesTags: ["Products"],
    }),
    updateProductsContent: builder.mutation({
      query: (body) => ({
        url: "/content/products",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Products"],
    }),
    getNavbarContent: builder.query({
      query: () => "/navbar",
      providesTags: ["Navbar"],
    }),
    updateNavbarContent: builder.mutation({
      query: (body) => ({
        url: "/navbar",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Navbar"],
    }),
    uploadFile: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append("file", file);
        return {
          url: "/upload",
          method: "POST",
          body: formData,
        };
      },
    }),
    submitContact: builder.mutation({
      query: (body) => ({
        url: "/contact",
        method: "POST",
        body,
      }),
      invalidatesTags: ["ContactQueries"],
    }),
    getContactQueries: builder.query({
      query: () => "/contact/queries",
      providesTags: ["ContactQueries"],
    }),
    updateContactQuery: builder.mutation({
      query: ({ id, read }) => ({
        url: `/contact/queries/${id}`,
        method: "PATCH",
        body: { read },
      }),
      invalidatesTags: ["ContactQueries"],
    }),
    deleteContactQuery: builder.mutation({
      query: (id) => ({
        url: `/contact/queries/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ContactQueries"],
    }),
    getSeoSettings: builder.query({
      query: () => "/content/seo",
      providesTags: ["Seo"],
    }),
    updateSeoSettings: builder.mutation({
      query: (body) => ({
        url: "/content/seo",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Seo"],
    }),
    getBlogPosts: builder.query({
      query: () => "/blog",
      providesTags: ["Blog"],
    }),
    getBlogPost: builder.query({
      query: (slug) => `/blog/${slug}`,
      providesTags: (_result, _err, slug) => [{ type: "Blog", id: slug }],
    }),
    createBlogPost: builder.mutation({
      query: (body) => ({
        url: "/blog",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Blog"],
    }),
    updateBlogPost: builder.mutation({
      query: ({ slug, body }) => ({
        url: `/blog/${slug}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Blog"],
    }),
    deleteBlogPost: builder.mutation({
      query: (slug) => ({
        url: `/blog/${slug}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blog"],
    }),
    getContactContent: builder.query({
      query: () => "/content/contact",
      providesTags: ["Contact"],
    }),
    updateContactContent: builder.mutation({
      query: (body) => ({
        url: "/content/contact",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Contact"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useGetMeQuery,
  useGetHomeContentQuery,
  useUpdateHomeContentMutation,
  useGetAboutContentQuery,
  useUpdateAboutContentMutation,
  useGetServicesContentQuery,
  useUpdateServicesContentMutation,
  useGetProductsContentQuery,
  useUpdateProductsContentMutation,
  useGetNavbarContentQuery,
  useUpdateNavbarContentMutation,
  useUploadFileMutation,
  useSubmitContactMutation,
  useGetSeoSettingsQuery,
  useUpdateSeoSettingsMutation,
  useGetBlogPostsQuery,
  useGetBlogPostQuery,
  useCreateBlogPostMutation,
  useUpdateBlogPostMutation,
  useDeleteBlogPostMutation,
  useGetContactContentQuery,
  useUpdateContactContentMutation,
  useGetContactQueriesQuery,
  useUpdateContactQueryMutation,
  useDeleteContactQueryMutation,
} = technazApi;
