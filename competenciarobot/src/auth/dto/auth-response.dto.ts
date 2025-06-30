export class AuthResponseDto {
  accessToken: string;
  usuario: {
    id: number;
    email: string;
    rol: string;
  };
}
