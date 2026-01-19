import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'

export const apiClient: AxiosInstance = axios.create({
	baseURL: '/',
	timeout: 15000,
	headers: {
		Accept: 'application/json'
	}
})

export async function getAxios<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
	const res = await apiClient.get<T>(url, config)
	return res.data
}

export async function postAxios<T, B extends object>(url: string, body?: B, config?: AxiosRequestConfig): Promise<T> {
	const res = await apiClient.post<T>(url, body, config)
	return res.data
}

export async function patchAxios<T, B extends object>(url: string, body?: B, config?: AxiosRequestConfig): Promise<T> {
	const res = await apiClient.patch<T>(url, body, config)
	return res.data
}

export async function deleteAxios<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
	const res = await apiClient.delete<T>(url, config)
	return res.data
}
