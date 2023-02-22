export type RegisterUserData = {
    full_name: string;
    email: string;
    phone: string;
    user_status: string;
    password: string;
    password_rep: string;
};

export type RegisterHeadData = {
    company_name: string,
    // logo: string,
    website: string,
    tagline: string,
    client_industry: string,
    software_stack: string,
    // industry_choice: string,
    short_description: string,
    full_description: string,
    average_hourly_rate: number,
    currency_rate: string,
    minimum_project_budget: number,
    currency_budget: string,
    // team_size: number,
    // location: string,
    // foundation_date: string,
    // clients_focus: string,
    // contact_marketing: string,
    // contact_expert: string,
    // links_case: string,
    // client_describe: string,
};

export type SendResetEmailPayload = {
    email: string;
    callback: () => void;
};

export type SignInUserData = {
    email: string;
    password: string;
};

export type ActivateUserData = {
    uid: string;
    token: string;
};
export type ResetPasswordData = {
    uid: string;
    token: string;
    new_password: string;
    re_password: string;
};

export type BasePayload<T> = {
    data: T;
    callback: () => void;
};

export type RegisterUserPayload = BasePayload<RegisterUserData>;
export type ActivateUserPayload = BasePayload<ActivateUserData>;
export type SignInUserPayload = BasePayload<SignInUserData>;
export type ResetPasswordConfirmPayload = BasePayload<ResetPasswordData>;
export type RegisterHeadPayload = BasePayload<RegisterHeadData>;
