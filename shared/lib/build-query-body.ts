/* eslint-disable @typescript-eslint/no-explicit-any */

import { camelToSnake } from "../utils/utils";



export const buildQueryBody = ({ sorting, search, skip, limit }:any) => ({
  order: [
    {
      column: camelToSnake(sorting[0]?.id || ''),
      dir: sorting[0]?.desc ? 'DESC' : 'ASC',
    },
  ],
  search: {
    regex: Boolean(search),
    value: search,
  },
  length:  limit,
  start: skip,
});
