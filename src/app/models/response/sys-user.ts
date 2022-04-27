import { SysRole } from "./sys-role";

export class SysUser {
    id?: number;
    username?: String;
    avatar?: String;
    password?: String;
    email?: String;
    mobile?: String;
    frozen?: String;
    createBy?: String;
    createTime?: String;
    lastUpdateBy?: String;
    lastUpdateTime?: String;
    roles?: String[];
}
