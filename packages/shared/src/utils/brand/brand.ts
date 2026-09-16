// eslint-disable-next-line import/no-relative-packages
import config_data from '../../../../../brand.config.json';
import { appendLangParam } from '../url/helpers';

export const getBrandDomain = (): string => {
    return (config_data as Record<string, unknown> & typeof config_data).brand_domain as string;
};

export const getBrandName = () => {
    return config_data.brand_name;
};

export const getBrandLogo = () => {
    return config_data.brand_logo;
};

/**
 * Runtime production check based on window.location.hostname.
 * Matches against the configured brand_hostname.production value.
 */
export const isProduction = (): boolean => {
    if (typeof window === 'undefined') return false;
    const hostname = window.location.hostname;
    const production_hostname = config_data.brand_hostname.production;
    return hostname === production_hostname;
};

export const getBrandHostname = () => {
    const hostname = isProduction() ? config_data.brand_hostname.production : config_data.brand_hostname.staging;
    return substituteDerivDomain(hostname);
};

export const getBrandUrl = () => {
    const hostname = isProduction() ? config_data.brand_hostname.production : config_data.brand_hostname.staging;
    return `https://${substituteDerivDomain(hostname)}`;
};

export const getBrandHomeUrl = (language?: string) => {
    const baseUrl = `${getBrandUrl()}/home`;
    return appendLangParam(baseUrl, language);
};

export const getBrandLoginUrl = (language?: string) => {
    const baseUrl = `${getBrandUrl()}/login`;
    return appendLangParam(baseUrl, language);
};

export const getBrandSignupUrl = (language?: string) => {
    const baseUrl = `${getBrandUrl()}/signup`;
    return appendLangParam(baseUrl, language);
};

export const getPlatformName = () => {
    return config_data.platform.name;
};

export const getPlatformLogo = () => {
    return config_data.platform.logo;
};

// [AI]
export const getBrandLogoDark = (): string => {
    return (
        ((config_data as Record<string, unknown> & typeof config_data).brand_logo_dark as string) ??
        config_data.brand_logo
    );
};

export const getPlatformDescription = (): string => {
    return ((config_data.platform as Record<string, unknown>).description as string) ?? '';
};

export const getAppId = (): string => {
    const app_id = (config_data as Record<string, unknown> & typeof config_data).app_id as
        | { staging: string; production: string }
        | undefined;
    if (!app_id) return '16929';
    return isProduction() ? app_id.production : app_id.staging;
};
// [/AI]

export const getDomainName = () => {
    if (typeof window === 'undefined') return '';
    const hostname = window.location.hostname;
    if (!hostname) return '';
    // Split the hostname into parts
    const domainParts = hostname.split('.');

    // Ensure we have at least two parts
