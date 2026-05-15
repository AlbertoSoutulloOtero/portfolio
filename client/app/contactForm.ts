export interface ContactFormData {
    name: string;
    email: string;
    description: string;
}

export interface ApiResponse{
    success: boolean;
    error?: string;
    data?: unknown;
}

/**
 * 
 * @param formData 
 * @returns 
 */
export async function sendContactForm(formData: ContactFormData): Promise<ApiResponse> {
  try {
    const response = await fetch('/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'Ocurrió un error al enviar el mensaje',
      };
    }

    return {
      success: true,
      data: data.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error de red o conexión',
    };
  }
}