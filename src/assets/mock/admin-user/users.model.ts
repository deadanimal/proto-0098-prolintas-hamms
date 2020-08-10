export class User {
    public user_id: string
    public name: string
    public email: string
    public joined_at: string
    public user_type: string
    public is_active: string

    constructor(
        user_id: string,
        name: string,
        email: string,
        joined_at: string,
        user_type: string,
        is_active: string
    ) {
        this.user_id = user_id
        this.name = name
        this.email = email
        this.joined_at = joined_at
        this.user_type = user_type
        this.is_active = is_active
    }
}