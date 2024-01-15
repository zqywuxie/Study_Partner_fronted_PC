// @ts-ignore
/* eslint-disable */
import {service} from "@/config/axios";


/** getLocation GET /api/location/get */
export async function getLocationUsingGet(options?: { [key: string]: any }) {
  return service('/api/location/get', {
    method: 'GET',
    ...(options || {}),
  });
}

/** loadData POST /api/location/load */
export async function loadDataUsingPost(options?: { [key: string]: any }) {
  return service('/api/location/load', {
    method: 'POST',
    ...(options || {}),
  });
}

/** saveLocation POST /api/location/save */
export async function saveLocationUsingPost(
  body: API.UserLocationRequest,
  options?: { [key: string]: any },
) {
  return service('/api/location/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
