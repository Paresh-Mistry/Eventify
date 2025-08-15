export interface Team {
  "id": number,
  "name": string,
  "join_code": string,
  "members": TeamMember[]
}

export interface TeamMember {
  "id": number,
  "user": {
    "id": number,
    "name": string,
    "email": string,
    "phone": string,
    "role": string,
  }
}