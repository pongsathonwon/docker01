export type BaseContact = {
    name: string
    tel: string
}

export type AddpendedContact = {
    id: number
    createAt: number
    updateAt?: number
    DeleteAt?: number
}

export type FullContact = AddpendedContact & BaseContact