export class Audit {
    public staff_id: string
    public username: string
    public email: string
    public created_at: string
    public action: string
    public description: string
    
    constructor(
        staff_id: string,
        username: string,
        email: string,
        created_at: string,
        action: string,
        description: string
    ) {
        this.staff_id = staff_id
        this.username = username
        this.email = email
        this.created_at = created_at
        this.action = action
        this.description = description
    }
}