export interface ValidationsDictionary {
  required?: string; // Mensaje para campo obligatorio
  pattern?: string;  // Mensaje para patrón de validación
  minlength?: string; // Mensaje para longitud mínima
  maxlength?: string; // Mensaje para longitud máxima
  [key: string]: string | undefined; // Para soportar otros mensajes personalizados
}
