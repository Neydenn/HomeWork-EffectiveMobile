export type Permission = { id: string; name: string };
export type RoleName = 'admin' | 'user';
export type Role = { id: string; name: RoleName; permissions?: Permission[] };

export type User = {
    id: string;
    fullName: string;
    dateOfBirth: string;
    email: string;
    isActive: boolean;
    role: Role;
    createdAt: string;
    updatedAt: string;
};
