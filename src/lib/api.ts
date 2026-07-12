export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export class ApiError extends Error {
  status: number;
  body: unknown;

  constructor(message: string, status: number, body?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

export async function apiRequest<T>(
  url: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  let body: unknown;
  const contentType = response.headers.get("content-type");
  if (contentType?.includes("application/json")) {
    body = await response.json();
  } else {
    body = await response.text();
  }

  if (!response.ok) {
    const errorBody = body as ApiResponse | string;
    const message =
      typeof errorBody === "string"
        ? errorBody
        : errorBody?.error ?? "An unexpected error occurred";
    throw new ApiError(message, response.status, body);
  }

  return body as ApiResponse<T>;
}

export function fetcher<T>(url: string): Promise<T> {
  return apiRequest<T>(url).then((res) => {
    if (!res.success) {
      throw new Error(res.error ?? "Request failed");
    }
    return res.data as T;
  });
}

export function getApiUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "";
  return `${base}/api${path}`;
}
