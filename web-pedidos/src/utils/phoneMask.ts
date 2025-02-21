export function maskTelefone(value: string): string {
    let digits = value.replace(/\D/g, '');
    
    if (digits.length > 11) {
      digits = digits.slice(0, 11);
    }
    
    if (digits.length > 10) {
      return digits.replace(/(\d{2})(\d{5})(\d{0,4})/, (_, p1, p2, p3) => {
        return p3 ? `(${p1}) ${p2}-${p3}` : `(${p1}) ${p2}`;
      });
    } else {
      return digits.replace(/(\d{2})(\d{4})(\d{0,4})/, (_, p1, p2, p3) => {
        return p3 ? `(${p1}) ${p2}-${p3}` : `(${p1}) ${p2}`;
      });
    }
  }
  