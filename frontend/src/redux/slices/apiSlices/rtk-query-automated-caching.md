source : [https://redux-toolkit.js.org/rtk-query/usage/automated-refetching](https://redux-toolkit.js.org/rtk-query/usage/automated-refetching)

## Providing tags

### A query can have its cached data provide tags. Doing so determines which 'tag' is attached to the cached data returned by the query.

The providesTags argument can either be an array of string (such as ['Post']), {type: string, id?: string|number} (such as [{type: 'Post', id: 1}]), or a callback that returns such an array. That function will be passed the result as the first argument, the response error as the second argument, and the argument originally passed into the query method as the third argument. Note that either the result or error arguments may be undefined based on whether the query was successful or not.

## Invalidating tags

### A mutation can invalidate specific cached data based on the tags. Doing so determines which cached data will be either refetched or removed from the cache.

The invalidatesTags argument can either be an array of string (such as ['Post']), {type: string, id?: string|number} (such as [{type: 'Post', id: 1}]), or a callback that returns such an array. That function will be passed the result as the first argument, the response error as the second argument, and the argument originally passed into the query method as the third argument. Note that either the result or error arguments may be undefined based on whether the mutation was successful or not.
